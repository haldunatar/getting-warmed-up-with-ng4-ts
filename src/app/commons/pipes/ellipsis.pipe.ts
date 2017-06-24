import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis'})

export class Ellipsis implements PipeTransform {
    transform(val: string, args: number, tail: string) {

        if(!args) {
            return val;
        } else if(val.length > args && args > 0 && args <= 20) {
            const ending: string = tail ? tail : '...';
            return val.substring(0, args) + ending;
        } else {
            return val;
        }
    }
}