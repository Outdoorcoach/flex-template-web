import React from 'react';
import Decimal from 'decimal.js';
import { fakeIntl, createBooking } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  TRANSITION_CANCEL_BY_CUSTOMER,
  TRANSITION_REQUEST_PAYMENT,
  TX_TRANSITION_ACTOR_CUSTOMER,
} from '../../util/transaction';
import { LINE_ITEM_HOURS, LINE_ITEM_UNITS, LINE_ITEM_HOURS_DISCOUNT, LINE_ITEM_PEOPLE_DISCOUNT, DATE_TYPE_DATETIME } from '../../util/types';
import { BookingBreakdownComponent } from './BookingBreakdown';

const { UUID, Money } = sdkTypes;

const exampleTransaction = params => {
  const created = new Date(Date.UTC(2017, 1, 1));
  return {
    id: new UUID('example-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: created,
      lastTransitionedAt: created,
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      transitions: [
        {
          createdAt: created,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST_PAYMENT,
        },
      ],

      // payinTotal, payoutTotal, and lineItems required in params
      ...params,
    },
  };
};
 
describe('BookingBreakdown', () => {
  it('pretransaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="customer"
        unitType={LINE_ITEM_UNITS}
        dateType={DATE_TYPE_DATETIME}
        transaction={exampleTransaction({
          payinTotal: new Money(2600, 'USD'),
          payoutTotal: new Money(2600, 'USD'),
          lineItems: [
            {
              code: LINE_ITEM_HOURS,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(4),
              lineTotal: new Money(4000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_PEOPLE_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-2),
              lineTotal: new Money(-1000, 'USD'),
              unitPrice: new Money(500, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_HOURS_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-1),
              lineTotal: new Money(-400, 'USD'),
              unitPrice: new Money(400, 'USD'),
              reversal: false,
            },
          ],
        })}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          displayStart: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          end: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
          displayEnd: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
        })}
        participants={1}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('customer transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="customer"
        unitType={LINE_ITEM_UNITS}
        dateType={DATE_TYPE_DATETIME}
        transaction={exampleTransaction({
          payinTotal: new Money(2000, 'USD'),
          payoutTotal: new Money(2000, 'USD'),
          lineItems: [
            {
              code: LINE_ITEM_HOURS,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(4),
              lineTotal: new Money(4000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_PEOPLE_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-2),
              lineTotal: new Money(-1000, 'USD'),
              unitPrice: new Money(500, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_HOURS_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-1),
              lineTotal: new Money(-400, 'USD'),
              unitPrice: new Money(400, 'USD'),
              reversal: false,
            },
          ],
        })}
        participants={1}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          displayStart: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          end: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
          displayEnd: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('provider transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="provider"
        unitType={LINE_ITEM_UNITS}
        dateType={DATE_TYPE_DATETIME}
        transaction={exampleTransaction({
          payinTotal: new Money(2600, 'USD'),
          payoutTotal: new Money(2400, 'USD'),
          lineItems: [
            {
              code: LINE_ITEM_HOURS,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(4),
              lineTotal: new Money(4000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_PEOPLE_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-2),
              lineTotal: new Money(-1000, 'USD'),
              unitPrice: new Money(500, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_HOURS_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-1),
              lineTotal: new Money(-400, 'USD'),
              unitPrice: new Money(400, 'USD'),
              reversal: false,
            },
            {
              code: 'line-item/provider-commission',
              includeFor: ['provider'],
              lineTotal: new Money(-200, 'USD'),
              unitPrice: new Money(0, 'USD'),
              reversal: false,
            },
          ],
        })}
        participants={1}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          displayStart: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          end: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
          displayEnd: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('provider canceled transaction data matches snapshot', () => {
    const tree = renderDeep(
      <BookingBreakdownComponent
        userRole="provider"
        unitType={LINE_ITEM_UNITS}
        dateType={DATE_TYPE_DATETIME}
        transaction={exampleTransaction({
          lastTransition: TRANSITION_CANCEL_BY_CUSTOMER,
          payinTotal: new Money(0, 'USD'),
          payoutTotal: new Money(0, 'USD'),
          lineItems: [
            {
              code: LINE_ITEM_HOURS,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(4),
              lineTotal: new Money(4000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_HOURS,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(4),
              lineTotal: new Money(4000, 'USD'),
              unitPrice: new Money(1000, 'USD'),
              reversal: true,
            },
            {
              code: LINE_ITEM_PEOPLE_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-2),
              lineTotal: new Money(-1000, 'USD'),
              unitPrice: new Money(500, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_PEOPLE_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-2),
              lineTotal: new Money(-1000, 'USD'),
              unitPrice: new Money(500, 'USD'),
              reversal: true,
            },
            {
              code: LINE_ITEM_HOURS_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-1),
              lineTotal: new Money(-400, 'USD'),
              unitPrice: new Money(400, 'USD'),
              reversal: false,
            },
            {
              code: LINE_ITEM_HOURS_DISCOUNT,
              includeFor: ['customer', 'provider'],
              quantity: new Decimal(-1),
              lineTotal: new Money(-400, 'USD'),
              unitPrice: new Money(400, 'USD'),
              reversal: true,
            },
            {
              code: 'line-item/provider-commission',
              includeFor: ['provider'],
              lineTotal: new Money(-200, 'USD'),
              unitPrice: new Money(0, 'USD'),
              reversal: false,
            },
            {
              code: 'line-item/provider-commission',
              includeFor: ['provider'],
              lineTotal: new Money(-200, 'USD'),
              unitPrice: new Money(0, 'USD'),
              reversal: true,
            },
          ],
        })}
        participants={1}
        booking={createBooking('example-booking', {
          start: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          displayStart: new Date(Date.UTC(2017, 3, 14, 8, 0, 0)),
          end: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
          displayEnd: new Date(Date.UTC(2017, 3, 16, 10, 0, 0)),
        })}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
