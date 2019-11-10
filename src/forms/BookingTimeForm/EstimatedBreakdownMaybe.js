/**
 * Booking breakdown estimation
 *
 * Transactions have payment information that can be shown with the
 * BookingBreakdown component. However, when selecting booking
 * details, there is no transaction object present and we have to
 * estimate the breakdown of the transaction without data from the
 * API.
 *
 * If the payment process of a customized marketplace is something
 * else than simply daily or nightly bookings, the estimation will
 * most likely need some changes.
 *
 * To customize the estimation, first change the BookingDatesForm to
 * collect all booking information from the user (in addition to the
 * default date pickers), and provide that data to the
 * EstimatedBreakdownMaybe components. You can then make customization
 * within this file to create a fake transaction object that
 * calculates the breakdown information correctly according to the
 * process.
 *
 * In the future, the optimal scenario would be to use the same
 * transactions.initiateSpeculative API endpoint as the CheckoutPage
 * is using to get the breakdown information from the API, but
 * currently the API doesn't support that for logged out users, and we
 * are forced to estimate the information here.
 */
import React from 'react';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { nightsBetween, daysBetween, calculateQuantityFromHours } from '../../util/dates';
import { TRANSITION_REQUEST_PAYMENT, TX_TRANSITION_ACTOR_CUSTOMER } from '../../util/transaction';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, LINE_ITEM_UNITS, DATE_TYPE_DATETIME, LINE_ITEM_HOURS_DISCOUNT, LINE_ITEM_PEOPLE_DISCOUNT, LINE_ITEM_HOURS } from '../../util/types';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import { BookingBreakdown } from '../../components';

import css from './BookingTimeForm.css';

const { Money, UUID } = sdkTypes;

/* calculate total price based on Outdoorcoach hour*/
const estimatedTotalPrice = (unitPrice, unitCount) => {
  const numericTotalPrice = new Decimal(unitPrice).times(unitCount).toNumber();
  return numericTotalPrice;
};

const estimatedPeopleDiscountMaybe = (unitPrice) => {
  const numericDiscount = new Decimal(unitPrice).toNumber();

  return numericDiscount;
};

const estimatedHoursDiscountMaybe = (unitPrice) => {
  const numericDiscount = new Decimal(unitPrice).toNumber();
  return numericDiscount;
};

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (unitType, bookingStart, bookingEnd, unitPrice, quantity, extraHours, participants) => {
  const now = new Date();

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const unitPriceInNumbers = convertMoneyToNumber(unitPrice);

  const unitCount = isNightly
    ? nightsBetween(bookingStart, bookingEnd)
    : isDaily
      ? daysBetween(bookingStart, bookingEnd)
      : quantity;

  const bookingLength = calculateQuantityFromHours(bookingStart, bookingEnd);
  const subtotalPrice = estimatedTotalPrice(unitPriceInNumbers, unitCount);

  const hoursDiscount = extraHours
    ? estimatedHoursDiscountMaybe(unitPriceInNumbers * 0.4)
    : 0;
  const peopleDiscount = participants > 1
    ? estimatedPeopleDiscountMaybe(unitPriceInNumbers * 0.5)
    : 0;

  const hoursDiscountTotal = new Money(
    convertUnitToSubUnit(hoursDiscount, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
  const peopleDiscountTotal = new Money(
    convertUnitToSubUnit(peopleDiscount, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );

  
  const totalPrice = new Money(
    convertUnitToSubUnit(subtotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );


  const extraHoursQuantity = extraHours
    ? (extraHours)
    : 0;
  const hoursDiscountLineItem = {
    code: LINE_ITEM_HOURS_DISCOUNT,
    includeFor: ['customer'],
    unitPrice: new Money(convertUnitToSubUnit(unitPriceInNumbers * 0.4, unitDivisor(unitPrice.currency)), unitPrice.currency),
    quantity: new Decimal(extraHoursQuantity*-1),
    lineTotal: hoursDiscountTotal,
    reversal: false,
  };
  const hoursDiscountLineItemMaybe = extraHours
    ? [hoursDiscountLineItem]
    : [];

  const extraPeopleQuantity = participants > 1
    ? ((participants - 1) * bookingLength)
    : 0;
  const peopleDiscountLineItem = {
    code: LINE_ITEM_PEOPLE_DISCOUNT,
    includeFor: ['customer'],
    unitPrice: new Money(convertUnitToSubUnit(unitPriceInNumbers * 0.5, unitDivisor(unitPrice.currency)), unitPrice.currency),
    quantity: new Decimal(extraPeopleQuantity*-1),
    lineTotal: peopleDiscountTotal,
    reversal: false,
  };
  const peopleDiscountLineItemMaybe = participants > 1
    ? [peopleDiscountLineItem]
    : [];

  const totalwithdiscounts = subtotalPrice - (hoursDiscount !== 0 ? (hoursDiscount * extraHoursQuantity) : 0) - (peopleDiscount !== 0 ? (peopleDiscount * extraPeopleQuantity) : 0);
  const totalwithdiscountsMoney = new Money(
    convertUnitToSubUnit(totalwithdiscounts, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );

  const lineItemsArray = [
    ...hoursDiscountLineItemMaybe,
    ...peopleDiscountLineItemMaybe,
    {
      code: LINE_ITEM_HOURS,
      includeFor: ['customer', 'provider'],
      unitPrice: unitPrice,
      quantity: new Decimal(unitCount),
      lineTotal: totalPrice,
      reversal: false,
    }
  ]

  return {
    id: new UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      payinTotal: totalwithdiscountsMoney,
      payoutTotal: totalwithdiscountsMoney,
      lineItems: lineItemsArray,
      transitions: [
        {
          createdAt: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
      ],
    },

    booking: {
      id: new UUID('estimated-booking'),
      type: 'booking',
      attributes: {
        start: bookingStart,
        end: bookingEnd,
      },
    },
  };
};

const EstimatedBreakdownMaybe = props => {

  const { unitType, unitPrice, startDate, endDate, quantity, extraHours, participants, timeZone } = props.bookingData;
  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  
  const canEstimatePrice = startDate && endDate && unitPrice && quantityIfUsingUnits;

  if (!canEstimatePrice) {
    return null;
  }
  const tx = estimatedTransaction(unitType, startDate, endDate, unitPrice, quantity, extraHours, participants);
  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
      transaction={tx}
      participants={participants}
      booking={tx.booking}
      dateType={DATE_TYPE_DATETIME}
      timeZone={timeZone}
    />
  );
};

export default EstimatedBreakdownMaybe;
