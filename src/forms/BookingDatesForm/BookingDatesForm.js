import React, { Component } from 'react';
import { string, bool, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';
import { required, bookingDateRequired, composeValidators } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton, FieldDateInput, FieldSelect } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.css';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.formatBookingDates = this.formatBookingDates.bind(this);
    this.renderHourOptions = this.renderHourOptions.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  formatBookingDates(date, starthour, endhour) {
      let startDate = moment(date.date);
      let endDate = moment(date.date);
      startDate.hours(starthour);
      endDate.hours(endhour);
      console.log(startDate.toLocaleString());
      return {
        bookingStart: startDate,
        bookingEnd: endDate
      }
    
    
  }

  renderHourOptions() {
    let hours = [];
    let hoursPerDay=24
    for (let i = 0; i < hoursPerDay; i++) {
      let dayMoment = moment('2019-01-01 00:00:00')
      hours.push(
        dayMoment.add(i, 'hour').format('HH:mm')
      )
    }
    return hours;
  }
  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
  }

  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const seats = [
      1,
      2,
      3,
      4,
      5,
    ]
    

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
          } = fieldRenderProps;
          //const { startDate, endDate } = values && values.bookingDate ? values.bookingDate : {};  // old code
          const startDate = values.bookingDate ? values.bookingDate : {};
          const endDate = startDate ? startDate : {};
          const startHour = values && values.startHour ? values.startHour : {};
          const endHour = startHour && values.endHour ? values.endHour : {};
          const nrSeats = endHour ? values.numberSeats : {};
          //const quantity = 
          const showFields = (values && values.bookingDate);
          console.log(nrSeats);
          
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const startHourLabel = intl.formatMessage({
            id: 'BookingDatesForm.startHourTitle',
          });
          const endHourLabel = intl.formatMessage({
            id: 'BookingDatesForm.endHourTitle',
          });
          const seatsLabel = intl.formatMessage({
            id: 'BookingDatesForm.seatsTitle',
          });
          
          const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.timeSlotsError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;


          const {bookingStart, bookingEnd} = values.endHour ? this.formatBookingDates(startDate, startHour, endHour): {};
          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          
          const bookingData =
            startDate && startHour & endHour
              ? {
                  unitType,
                  unitPrice,
                  bookingStart,
                  bookingEnd,

                  // NOTE: If unitType is `line-item/units`, a new picker
                  // for the quantity should be added to the form.
                  quantity: 1,
                }
              : null;
          
          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} />
            </div>
          ) : null;

          const dayHours = this.renderHourOptions().map(function(item, i) {
            return <option key={i} value={i}>{item}</option>
          })


          const seatsOptions = seats.map(function(item, i) {
            return <option key={i+1} value={i+1}>{item}</option>
          })

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
            
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const requiredmessage = required('Du måste välja ett klockslag');
          const requiredseatsmessage = required('Du måste välja ett klockslag');

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}
              <FieldDateInput
                className={css.bookingDates}
                name="bookingDate"
                id={`${formId}.bookingDate`}
                label={bookingStartLabel}
                placeholderText={startDatePlaceholderText}
                format={identity}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(requiredMessage),
                  bookingDateRequired(startDateErrorMessage, endDateErrorMessage)
                )}
                />
                {showFields ? <React.Fragment>
                  <FieldSelect 
                id={`${formId}.bookingStartHour`}
                name="startHour" 
                label={startHourLabel} 
                validate={requiredmessage}
                useMobileMargins>
                {dayHours}
              </FieldSelect>
              <FieldSelect 
                id={`${formId}.bookingEndHour`}
                name="endHour" 
                label={endHourLabel} 
                validate={requiredmessage}
                useMobileMargins>
                {dayHours}
              </FieldSelect>
              <FieldSelect 
                id={`${formId}.bookingNumberSeats`}
                name="numberSeats" 
                label={seatsLabel} 
                validate={requiredseatsmessage}
                useMobileMargins>
                {seatsOptions}
              </FieldSelect>
                </React.Fragment>: ""}
              
              {bookingInfo}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired, 
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
