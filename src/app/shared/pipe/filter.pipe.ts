import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filterByGender'})
export class FilterByGender implements PipeTransform {

    transform(cats : any, gender: string): any[] {
        if (cats && cats.length > 0) {
            return cats.filter((listing: any) => listing.gender === gender);
        }
    }
}
