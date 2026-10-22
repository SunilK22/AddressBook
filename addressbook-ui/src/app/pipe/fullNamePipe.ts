import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'fullName'
})

export class FullNamePipe implements PipeTransform {

    transform(firstname: string, middlename: string, lastname: string) {

        if (middlename == null) {
            middlename = '';
        }
        return firstname + ' ' + middlename + ' ' + lastname;
    }
}