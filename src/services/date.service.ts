import { DateConstants } from '../constants/date.constant';
import { UtilitiesService } from './utilities.service'

export default class DateService {

    constructor() {
    }

    public static getMillisecondsFromBeginningOfDay(date)
    {
        var ms = 0;

        if (date)
        {
            ms = ((date.getHours() * 60 +  date.getMinutes()) * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
        }

        return ms;
    }

    public static getMillisecondsOfBeginningOfDay(date)
    {
        var ms = 0;

        if (date)
        {
            ms = date.getTime() - DateService.getMillisecondsFromBeginningOfDay(date);
        }

        return ms;
    }

    public static getDateOfBeginningOfDay(date)
    {
        return new Date(DateService.getMillisecondsOfBeginningOfDay(date));
    }

    public static addMsToADate(ms, date = new Date()) {
        return new Date(date.getTime() + ms);
    }

    public static addDayToADate(day, date = new Date()) {
        return new Date(date.getTime() + day * DateConstants.day);
    }

    public static substractMSToADate(ms, date = new Date()) {
        return DateService.addMsToADate(-ms, date);
    }

    public static getTimezoneOffset() {
        var x = new Date();
        return - x.getTimezoneOffset() / 60;
    }

    public static toISOLocalTimeString(date, withMs = true, withTimezoneOffset = true) {
        let timezoneoffset = DateService.getTimezoneOffset();
        var string = '' + date.getFullYear() + '-'
        + UtilitiesService.numberToStringWithDigitsMin(date.getMonth() + 1, 2) + '-'
        + UtilitiesService.numberToStringWithDigitsMin(date.getDate(), 2) 
        + 'T'
        + UtilitiesService.numberToStringWithDigitsMin(date.getHours(), 2) + ':'
        + UtilitiesService.numberToStringWithDigitsMin(date.getMinutes(), 2) + ':'
        + UtilitiesService.numberToStringWithDigitsMin(date.getSeconds(), 2)
        if (withMs) {
            string = string +  '.'
            + UtilitiesService.numberToStringWithDigitsMin(date.getMilliseconds(), 3)
        }
        if (withTimezoneOffset) {
            string = string + (timezoneoffset < 0 ? '-' : '+')
            + UtilitiesService.numberToStringWithDigitsMin(Math.abs(timezoneoffset), 2)
            + ':00'
        }
        

        return string;
    }

    public static getDateOfPreviousDayNumber(date, dayNumber) {
        var day = date.getDay();
        var prev;
        let msOfTheDay = DateService.getMillisecondsOfBeginningOfDay(date);
        if(day == dayNumber){
            prev = new Date(msOfTheDay - 7 * DateConstants.day);
        }
        else {
            var offset = dayNumber < day ? day - dayNumber : 7 - (dayNumber - day);
            prev = new Date(msOfTheDay - (7 + offset) * DateConstants.day);
        }
        return prev;
    }

    public static toStringSpecificFormat(date, ms = false) {
        var result = "";

        var years = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();

        month = UtilitiesService.numberToStringWithDigitsMin(month, 2);
        day = UtilitiesService.numberToStringWithDigitsMin(day, 2);
        hours = UtilitiesService.numberToStringWithDigitsMin(hours, 2);
        minutes = UtilitiesService.numberToStringWithDigitsMin(minutes, 2);
        seconds = UtilitiesService.numberToStringWithDigitsMin(seconds, 2);
        milliseconds = UtilitiesService.numberToStringWithDigitsMin(milliseconds, 3);

        var strDate = day + "/" + month + "/" + years;
        var strTime = hours + ':' + minutes + ':' + seconds + (ms ? ('.' + milliseconds) : "");
        result += strDate + " - " + strTime;

        return result;
    }

}
