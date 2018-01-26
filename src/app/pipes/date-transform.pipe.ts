import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

    transform(date: Date): any {
        return new Date(date.getTime() + 60000 * date.getTimezoneOffset());
    }
}
