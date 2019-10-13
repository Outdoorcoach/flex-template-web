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
import moment from 'moment';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { dateFromLocalToAPI, nightsBetween, daysBetween, hoursBetween } from '../../util/dates';
import { TRANSITION_REQUEST_PAYMENT, TX_TRANSITION_ACTOR_CUSTOMER } from '../../util/transaction';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, LINE_ITEM_UNITS, DATE_TYPE_DATETIME, LINE_ITEM_HOURS_DISCOUNT, LINE_ITEM_PEOPLE_DISCOUNT } from '../../util/types';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import { BookingBreakdown } from '../../components';

import css from './BookingDatesForm.css';

const { Money, UUID } = sdkTypes;

/* calculate total price based on Outdoorcoach hour*/
const estimatedTotalPrice = (unitPrice, unitCount) => {
  const numericTotalPrice = new Decimal(unitPrice).times(unitCount).toNumber();
  return numericTotalPrice;
};

const estimatedPeopleDiscountMaybe = (unitPrice, participants) => {
  const numericDiscount = new Decimal(unitPrice).times(participants).times(0.5).toNumber();

  return numericDiscount;
};

const estimatedHoursDiscountMaybe = (unitPrice, extraHours) => {
  const numericDiscount = new Decimal(unitPrice).times(extraHours).times(0.6).toNumber();
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

  const subtotalPrice = estimatedTotalPrice(unitPriceInNumbers, unitCount);

  const hoursDiscount = extraHours
    ? estimatedHoursDiscountMaybe(unitPriceInNumbers, extraHours)
    : 0;
  const peopleDiscount = participants > 1
    ? estimatedPeopleDiscountMaybe(unitPriceInNumbers, participants)
    : 0;


  const peopleDiscountTotal = new Money(
    convertUnitToSubUnit(peopleDiscount, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );

  const withDiscounts = subtotalPrice - hoursDiscount - peopleDiscount;

  const totalPrice = new Money(
    convertUnitToSubUnit(withDiscounts, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );


  // bookingStart: "Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)"
  // Server normalizes night/day bookings to start from 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // The result is: local timestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)

  // local noon -> startOf('day') => 00:00 local => remove timezoneoffset => 00:00 API (UTC)
  const serverDayStart = dateFromLocalToAPI(
    moment(bookingStart)
  );
  const serverDayEnd = dateFromLocalToAPI(
    moment(bookingEnd)
  );

  const extraHoursQuantity = extraHours
    ? extraHours
    : 0;
  const hoursDiscountLineItem = {
    code: LINE_ITEM_HOURS_DISCOUNT,
    includeFor: ['customer', 'provider'],
    unitPrice: new Money(convertUnitToSubUnit(unitPriceInNumbers * 0.6, unitDivisor(unitPrice.currency)), unitPrice.currency),
    quantity: new Decimal(extraHoursQuantity),
    lineTotal: hoursDiscount,
    reversal: false,
  };
  const hoursDiscountLineItemMaybe = extraHours
    ? [hoursDiscountLineItem]
    : [];

  const participantsQuantity = participants > 1
    ? participants - 1
    : 0;
  const peopleDiscountLineItem = {
    code: LINE_ITEM_PEOPLE_DISCOUNT,
    includeFor: ['customer', 'provider'],
    unitPrice: new Money(convertUnitToSubUnit(unitPriceInNumbers * 0.5, unitDivisor(unitPrice.currency)), unitPrice.currency),
    quantity: new Decimal(participantsQuantity),
    lineTotal: peopleDiscountTotal,
    reversal: false,
  };
  const peopleDiscountLineItemMaybe = participants
    ? [peopleDiscountLineItem]
    : [];


  const lineItemsArray = [
    ...hoursDiscountLineItemMaybe,
    ...peopleDiscountLineItemMaybe,
    {
      code: unitType,
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
      payinTotal: totalPrice,
      payoutTotal: totalPrice,
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

  const { unitType, unitPrice, bookingStart, bookingEnd, quantity, extraHours, participants } = props.bookingData;

  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice = bookingStart && bookingEnd && unitPrice && quantityIfUsingUnits;

  if (!canEstimatePrice) {
    return null;
  }
  const tx = estimatedTransaction(unitType, bookingStart, bookingEnd, unitPrice, quantity, extraHours, participants);
  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
      transaction={tx}
      participants={participants}
      booking={tx.booking}
      dateType={DATE_TYPE_DATETIME}
    />
  );
};

export default EstimatedBreakdownMaybe;
