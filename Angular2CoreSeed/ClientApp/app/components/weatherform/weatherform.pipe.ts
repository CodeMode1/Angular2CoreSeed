import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'fmDateLocal',
    pure: false
})

export class DatePipeLocal implements PipeTransform {
    transform(date: any, args?: any): any {
        let d = new Date(date);
        // February 3, 2017 2:29 PM . Doc: https://momentjs.com/
        return moment(d).format('LL');
    }
}