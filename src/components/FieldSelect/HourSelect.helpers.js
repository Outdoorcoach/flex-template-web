import moment from 'moment';
import { isSameDay, isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';

import { ensureTimeSlot } from '../../util/data';
import { START_DATE, END_DATE, dateFromAPIToLocalNoon, END_HOUR, START_HOUR } from '../../util/dates';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, TIME_SLOT_HOUR, LINE_ITEM_UNITS } from '../../util/types';
import config from '../../config';

const isSameHour = (moment1, moment2) => {
    return moment1.hours() === moment2.hours();
};
// Checks if time slot (propTypes.timeSlot) start time equals a day (moment)
const timeSlotEqualsTime = (timeSlot, day) => {
  if (ensureTimeSlot(timeSlot).attributes.type === TIME_SLOT_HOUR) {
    // Time slots describe available dates by providing a start and
    // an end date which is the following day. In the single date picker
    // the start date is used to represent available dates.
    const localStartDate = dateFromAPIToLocalNoon(timeSlot.attributes.start);

    return isSameHour(day, moment(localStartDate));
  } else {
    return false;
  }
};

// Checks if time slot (propTypes.timeSlot) start time equals a day (moment)
const hourIsWithinTimeSlot = (timeSlot, hourToCheck, startDateSelected) => {
    const timeSlotStart = moment(timeSlot.attributes.start).hours();
    const timeSlotEnd = moment(timeSlot.attributes.end).hours();
    const hour = moment(hourToCheck).hours();
    
    if(startDateSelected && hour <= moment(startDateSelected).hours() && hour < timeSlotEnd) {
      
      return false;
    } else if (hour >= timeSlotStart && hour < timeSlotEnd) {
      
      return true;
      
    }
    
    return false;
};

/**
 * Return a boolean indicating if given date can be found in an array
 * of tile slots (start dates).
 */
const timeSlotsContain = (timeSlots, date) => {
  return timeSlots.findIndex(slot => timeSlotEqualsTime(slot, date)) > -1;
};

/**
 * Find first blocked time between two hours.
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
 * Find last blocked time between two dates.
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
 * Check if a blocked date can be found between two dates.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
export const isBlockedBetween = (timeSlots, startDate, endDate) =>
  !!firstBlockedHourBetween(timeSlots, startDate, endDate);

export const isStartHourSelected = (timeSlots, startDate, endDate, focusedInput) =>
  timeSlots && startDate && (!endDate || focusedInput === END_HOUR) && focusedInput !== START_HOUR;

export const isSelectingEndDateNightly = (timeSlots, startDate, endDate, focusedInput, unitType) =>
  timeSlots && !startDate && !endDate && focusedInput === END_DATE && unitType === LINE_ITEM_NIGHT;

export const apiEndDateToPickerDate = (unitType, endDate) => {
  const isValid = endDate instanceof Date;
  const isDaily = unitType === LINE_ITEM_UNITS;

  if (!isValid) {
    return null;
  } else if (isDaily) {
    // API end dates are exlusive, so we need to shift them with daily
    // booking.
    return moment(endDate).subtract(1, 'days');
  } else {
    return moment(endDate);
  }
};

export const pickerEndDateToApiDate = (unitType, endDate) => {
  const isValid = endDate instanceof moment;
  const isDaily = unitType === LINE_ITEM_DAY;

  if (!isValid) {
    return null;
  } else if (isDaily) {
    // API end dates are exlusive, so we need to shift them with daily
    // booking.
    return endDate.add(1, 'days').toDate();
  } else {
    return endDate.toDate();
  }
};

/**
 * Returns an isDayBlocked function that is used in the 
 * bookingdatesform to check if hours are available.
 */
export const isHourBlocked = (timeSlots, startHour, endHour, focusedInput, isStartSelected) => {
  const lastBookableHour = moment(startHour).hours(23);
  // start date selected, end date missing
  const startDateSelected = isStartSelected ? isStartSelected : false;
  const isEndDate = !!isStartSelected;


  // find the next booking after a start date
  const nextBookingStarts = startDateSelected
    ? firstBlockedHourBetween(timeSlots, startHour, lastBookableHour)
    : false;
    
  if (nextBookingStarts || !timeSlots) {
    // a next booking is found or time slots are not provided
    // -> booking range handles blocking dates
    return true;
  } else {
    // otherwise return standard timeslots check
    return !timeSlots.find(timeSlot => hourIsWithinTimeSlot(timeSlot, startHour, startDateSelected));
  }
};