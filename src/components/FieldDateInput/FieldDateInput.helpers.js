import moment from 'moment';
import { isSameDay } from 'react-dates';
import { ensureTimeSlot } from '../../util/data';
import { 
  START_DATE, END_DATE,
  dateFromAPIToLocal } from '../../util/dates';
import { 
  TIME_SLOT_DAY,
  TIME_SLOT_HOUR } from '../../util/types';

// Checks if time slot (propTypes.timeSlot) start time equals a day (moment)
const timeSlotEqualsDay = (timeSlot, day) => {
  if (ensureTimeSlot(timeSlot).attributes.type === TIME_SLOT_DAY) {
    // Time slots describe available dates by providing a start and
    // an end date which is the following day. In the single date picker
    // the start date is used to represent available dates.
    const localStartDate = dateFromAPIToLocalNoon(timeSlot.attributes.start);

    return isSameDay(day, moment(localStartDate));
  } else {
    return false;
  }
};
/**
 * Return a boolean indicating if given date can be found in an array
 * of tile slots (start dates).
 */
const timeSlotsContain = (timeSlots, date) => {
  return timeSlots.findIndex(slot => timeSlotEqualsDay(slot, date)) > -1;
};

/**
 * Find first blocked date between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const firstBlockedBetween = (timeSlots, startDate, endDate) => {
  const firstDate = moment(startDate).add(1, 'days');
  if (firstDate.isSame(endDate, 'date')) {
    return null;
  }

  return timeSlotsContain(timeSlots, firstDate)
    ? firstBlockedBetween(timeSlots, firstDate, endDate)
    : firstDate;
};

/**
 * Find first blocked date between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const firstBlockedHourBetween = (timeSlots, startDate, endDate) => {
  const firstDate = moment(startDate).add(1, 'hours');
  if (firstDate.isSame(endDate, 'date')) {
    return null;
  }

  return timeSlotsContain(timeSlots, firstDate)
    ? firstBlockedHourBetween(timeSlots, firstDate, endDate)
    : firstDate;
};

/**
 * Find last blocked hour between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const lastBlockedBetween = (timeSlots, startDate, endDate) => {
  const previousDate = moment(endDate).subtract(1, 'days');
  if (previousDate.isSame(startDate, 'date')) {
    return null;
  }

  return timeSlotsContain(timeSlots, previousDate)
    ? lastBlockedBetween(timeSlots, startDate, previousDate)
    : previousDate;
};

/**
 * Find last blocked hour between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const lastBlockedHourBetween = (timeSlots, startDate, endDate) => {
  const previousDate = moment(endDate).subtract(1, 'hours');
  if (previousDate.isSame(startDate, 'date')) {
    return null;
  }

  return timeSlotsContain(timeSlots, previousDate)
    ? lastBlockedHourBetween(timeSlots, startDate, previousDate)
    : previousDate;
};

/**
 * Check if a blocked hour can be found between two dates.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
export const isBlockedHourBetween = (timeSlots, startDate, endDate) =>
  !!firstBlockedHourBetween(timeSlots, startDate, endDate);

export const isDateSelected = (timeSlots, startDate, endDate, focusedInput) =>
  timeSlots && startDate && (!endDate || focusedInput === END_DATE) && focusedInput !== START_DATE;

/**
 * Returns an isHourBlocked function that can be passed to
 * a react-dates DatePicker component.
 */
export const isHoursAvailableFn = (timeSlots, startDate, endDate, focusedInput, unitType) => {
  
  
    // otherwise return standard timeslots check
    return !timeSlotsContain(timeSlots, startDate);
};


