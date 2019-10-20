import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { LINE_ITEM_HOURS, propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemBookingLengthMaybe = props => {
  const { transaction, unitType, participants } = props;

  
  const hoursPurchase = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_HOURS && !item.reversal
  );

  if (!hoursPurchase) {
    return null;
    throw new Error(`LineItemBookingLengthMaybe: lineItem (${unitType}) missing`);
  }

  const quantity = participants? (hoursPurchase.quantity / parseInt(participants)) : hoursPurchase.quantity;

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.bookingLengthText" />
      </span>
      <span className={css.itemValue}>
        <FormattedMessage id="BookingBreakdown.bookingLength" values={{ quantity }} />
      </span>
    </div>
  );
};

LineItemBookingLengthMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
};

export default LineItemBookingLengthMaybe;
