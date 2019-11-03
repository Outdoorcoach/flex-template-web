import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { LINE_ITEM_PEOPLE_DISCOUNT, propTypes } from '../../util/types';
import config from '../../config';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { calculateQuantityFromHours } from '../../util/dates';

import css from './BookingBreakdown.css';

const { Money } = sdkTypes;

const LineItemPeopleDiscountMaybe = props => {
  const { transaction, intl } = props;

  const peopleDiscountItem = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_PEOPLE_DISCOUNT && !item.reversal
  );

  if (!peopleDiscountItem) {
    return null;
  }
  const attributes = transaction.booking.attributes;
  const quantity = peopleDiscountItem.quantity.toNumber() * -1;
  const bookinglength = calculateQuantityFromHours(attributes.start, attributes.end);
  const extraparticipants = (quantity / bookinglength); 
  
  const amount = new Money((peopleDiscountItem.unitPrice.amount * quantity * -1), config.currency);
  const formattedAmount = formatMoney(intl, amount);
  

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.peopleDiscountText" values={{ extraparticipants }}/>
      </span>
      <span className={css.itemValue}>{formattedAmount}</span>
    </div>
  );
};

LineItemPeopleDiscountMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
};

export default LineItemPeopleDiscountMaybe;
