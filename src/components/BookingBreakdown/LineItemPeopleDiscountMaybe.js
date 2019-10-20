import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { LINE_ITEM_PEOPLE_DISCOUNT, propTypes } from '../../util/types';
import config from '../../config';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './BookingBreakdown.css';

const { Money } = sdkTypes;

const LineItemPeopleDiscountMaybe = props => {
  const { transaction, participants, intl } = props;

  const extraparticipants = parseInt(participants) - 1;
  const peopleDiscountItem = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_PEOPLE_DISCOUNT && !item.reversal
  );

  if (!peopleDiscountItem) {
    return null;
  }
  console.log([peopleDiscountItem.lineTotal.amount, peopleDiscountItem.quantity.toNumber()]);
  const amount = new Money((peopleDiscountItem.lineTotal.amount * peopleDiscountItem.quantity.toNumber()), config.currency);
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
