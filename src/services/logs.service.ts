import DateService from './date.service'

export class LogsService {
    public static formatLogs() {
        return '[' + DateService.toStringSpecificFormat(new Date(), true) + "] : " + '%s';
    }
    
}