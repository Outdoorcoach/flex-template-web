import React, { Component } from 'react';
import { string, bool, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';
import { required, bookingDateRequired, composeValidators } from '../../util/validators';
import { BOOKING_DATE, END_DATE, hoursBetween, START_HOUR } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton, FieldDateInput, FieldSelect } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.css';

import { isSameDay } from 'react-dates';
import { isHourBlocked } from '../../components/FieldSelect/HourSelect.helpers';

const identity = v => v;

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null, 
      currendDate: null, 
      startHour: null, 
      endHour: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.formatBookingDates = this.formatBookingDates.bind(this);
    this.renderHourOptions = this.renderHourOptions.bind(this);
    this.findFirstNonDisabled = this.findFirstNonDisabled.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  formatBookingDates(date, starthour, endhour) {
    const startDate = moment(date.date);
    const endDate = moment(date.date);
    startDate.hours(starthour);
    endDate.hours(endhour);

    return {
      bookingStart: startDate.toDate(),
      bookingEnd: endDate.toDate()
    }
  }

  /* Takes a timeslot object and renders objects used to 
   * render options for the hour picker
   */
  renderHourOptions(dayTimeSlots, selectedStart, bookingDate) {
    const isStart = selectedStart ? moment(bookingDate).hours(selectedStart) : false;
    let hours = [];
    let hoursPerDay = 24;
    
    for (let i = 0; i < hoursPerDay; i++) {
      let hourMoment = moment(bookingDate).hours(i).minutes(0);
      let isBlocked = isHourBlocked(dayTimeSlots, hourMoment, hourMoment, START_HOUR, isStart);
      const formattedHour = hourMoment.format('HH:mm');
      const hourObject = {
        displayHour: formattedHour,
        isDisabled: isBlocked,
      }
      hours.push(
        hourObject
      )
    }
    return hours;
  }
  findFirstNonDisabled(selectOptions, minValue) {
    let min = parseInt(minValue);
    return selectOptions.find( function(opt) {
      return !opt.props.disabled && opt.props.value > min ? opt.props.value : false
    });
  }
  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const bookingDate = e.bookingDate || {};
    const startHour = parseInt(e.startHour) || false;
    const endHour = parseInt(e.endHour) || false;
    if (!bookingDate) {
      e.preventDefault();
      this.setState({ focusedInput: BOOKING_DATE });
    } else if (!startHour) {
      e.preventDefault();
      //TODO: set focus on 
    } else if (!endHour) {
      e.preventDefault();
    } else if (startHour >= endHour) {
      e.preventDefault();
    }
    else {
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
          const startDate = values && values.bookingDate ? values.bookingDate : {};
          const startHour = values && values.startHour ? values.startHour : null;
          const endHour = values && values.endHour ? values.endHour : null;
          const participants = values && values.participants ? values.participants : 1;
          const showStartDate = (values && values.bookingDate);
          const showEndDate = (values && values.startHour);
          

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const startHourLabel = intl.formatMessage({
            id: 'BookingDatesForm.startHourTitle',
          });
          const endHourLabel = intl.formatMessage({
            id: 'BookingDatesForm.endHourTitle',
          });
          const participantsLabel = intl.formatMessage({
            id: 'BookingDatesForm.nrOfParticpantsTitle',
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


          const { bookingStart, bookingEnd } = startDate && startHour & endHour ? this.formatBookingDates(startDate, startHour, endHour) : {};
          let quantity;
          let extraHours;
          try {
            quantity = bookingStart && bookingEnd ? hoursBetween(bookingStart, bookingEnd): 1;
            extraHours = quantity - 1;
          } catch(error){
            quantity = false;
            extraHours = 0;
          }
          
          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.

          const bookingData =
            startDate && startHour && endHour && quantity
              ? {
                unitType,
                unitPrice,
                bookingStart,
                bookingEnd,
                participants,

                // NOTE: If unitType is `line-item/units`, a new picker
                // for the quantity should be added to the form.
                quantity: quantity * participants,
                extraHours
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

          
          const selectedDateTimeSlots = values && values.bookingDate ?
            timeSlots.filter(timeSlot => {
              let selectedDateMoment = moment(startDate.date);
              if (isSameDay(selectedDateMoment, moment(timeSlot.attributes.start))) {
                return timeSlot;
              }
              return {};
            })
            : null;
          
          const startHours = selectedDateTimeSlots ? 
            this.renderHourOptions(selectedDateTimeSlots,false, values.bookingDate.date).map(function (item, i) {
              return <option key={i} value={i} disabled={item.isDisabled}>{item.displayHour}</option>
            })
            : (<option key={0} value={0}>Ingen data</option>);
           
          const endHours = selectedDateTimeSlots && values.startHour ? 
            this.renderHourOptions(selectedDateTimeSlots, parseInt(values.startHour), values.bookingDate.date).map(function (item, i) {
              
              return <option key={i} value={i} disabled={item.isDisabled}>{item.displayHour}</option>
            })
            : false;
          
          const seatsOptions = seats.map(function (item, i) {
            return <option key={i + 1} value={item}>{item}</option>
          })

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();

          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);

          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const requiredmessage = required('Du måste välja ett klockslag');
          const requiredseatsmessage = required('Du måste välja antal personer!');

          return (
            <Form onSubmit={handleSubmit} >
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
              {showStartDate ? 
                <FieldSelect
                  id={`${formId}.bookingStartHour`}
                  name="startHour"
                  label={startHourLabel}
                  validate={requiredmessage}
                  useMobileMargins>
                  {startHours}
                </FieldSelect>
                : ""
              }
              {showEndDate ? 
                <React.Fragment>
                  <FieldSelect
                    id={`${formId}.bookingEndHour`}
                    name="endHour"
                    label={endHourLabel}
                    validate={requiredmessage}
                    initialValue={startHour + 1}
                    useMobileMargins>
                    {endHours}
                  </FieldSelect>
                  <FieldSelect
                    id={`${formId}.bookingParticipants`}
                    name="participants"
                    label={participantsLabel}
                    validate={requiredseatsmessage}
                    initialValue={1}
                    useMobileMargins>
                    {seatsOptions}
                  </FieldSelect>
                </React.Fragment> 
                : ""
              }
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
