import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { SecondaryButton } from '../../components';

import css from './TransactionPanel.css';

// Functional component as a helper to build ActionButtons for
// involved parties to cancel bookings
const CancelBookingButtonsMaybe = props => {
  const {
    className,
    rootClassName,
    showButtons,
    cancelBookingInProgress,
    cancelBookingError,
    onCancelBooking,
  } = props;

  const buttonsDisabled = cancelBookingInProgress;

  const CancelBookingErrorMessage = cancelBookingError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.cancelBookingFailed" />
    </p>
  ) : null;

  const classes = classNames(rootClassName || css.actionButtons, className);

  return showButtons ? (
    <div className={classes}>
      <div className={css.actionErrors}>
        {CancelBookingErrorMessage}
      </div>
      <div className={css.actionButtonWrapper}>
        <SecondaryButton
          inProgress={cancelBookingInProgress}
          disabled={buttonsDisabled}
          onClick={onCancelBooking}
        >
          <FormattedMessage id="TransactionPanel.cancelBookingButton" />
        </SecondaryButton>
      </div>
    </div>
  ) : null;
};

export default CancelBookingButtonsMaybe;
