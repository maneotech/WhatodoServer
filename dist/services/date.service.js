"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_constant_1 = require("../constants/date.constant");
const utilities_service_1 = require("./utilities.service");
class DateService {
    constructor() {
    }
    static getMillisecondsFromBeginningOfDay(date) {
        var ms = 0;
        if (date) {
            ms = ((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
        }
        return ms;
    }
    static getMillisecondsOfBeginningOfDay(date) {
        var ms = 0;
        if (date) {
            ms = date.getTime() - DateService.getMillisecondsFromBeginningOfDay(date);
        }
        return ms;
    }
    static getDateOfBeginningOfDay(date) {
        return new Date(DateService.getMillisecondsOfBeginningOfDay(date));
    }
    static addMsToADate(ms, date = new Date()) {
        return new Date(date.getTime() + ms);
    }
    static addDayToADate(day, date = new Date()) {
        return new Date(date.getTime() + day * date_constant_1.DateConstants.day);
    }
    static substractMSToADate(ms, date = new Date()) {
        return DateService.addMsToADate(-ms, date);
    }
    static getTimezoneOffset() {
        var x = new Date();
        return -x.getTimezoneOffset() / 60;
    }
    static toISOLocalTimeString(date, withMs = true, withTimezoneOffset = true) {
        let timezoneoffset = DateService.getTimezoneOffset();
        var string = '' + date.getFullYear() + '-'
            + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(date.getMonth() + 1, 2) + '-'
            + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(date.getDate(), 2)
            + 'T'
            + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(date.getHours(), 2) + ':'
            + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(date.getMinutes(), 2) + ':'
            + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(date.getSeconds(), 2);
        if (withMs) {
            string = string + '.'
                + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(date.getMilliseconds(), 3);
        }
        if (withTimezoneOffset) {
            string = string + (timezoneoffset < 0 ? '-' : '+')
                + utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(Math.abs(timezoneoffset), 2)
                + ':00';
        }
        return string;
    }
    static getDateOfPreviousDayNumber(date, dayNumber) {
        var day = date.getDay();
        var prev;
        let msOfTheDay = DateService.getMillisecondsOfBeginningOfDay(date);
        if (day == dayNumber) {
            prev = new Date(msOfTheDay - 7 * date_constant_1.DateConstants.day);
        }
        else {
            var offset = dayNumber < day ? day - dayNumber : 7 - (dayNumber - day);
            prev = new Date(msOfTheDay - (7 + offset) * date_constant_1.DateConstants.day);
        }
        return prev;
    }
    static toStringSpecificFormat(date, ms = false) {
        var result = "";
        var years = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        month = utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(month, 2);
        day = utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(day, 2);
        hours = utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(hours, 2);
        minutes = utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(minutes, 2);
        seconds = utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(seconds, 2);
        milliseconds = utilities_service_1.UtilitiesService.numberToStringWithDigitsMin(milliseconds, 3);
        var strDate = day + "/" + month + "/" + years;
        var strTime = hours + ':' + minutes + ':' + seconds + (ms ? ('.' + milliseconds) : "");
        result += strDate + " - " + strTime;
        return result;
    }
}
exports.default = DateService;
//# sourceMappingURL=date.service.js.map