import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/services/people.service';
import { People } from '../shared/models/people.model';
import { Cat } from '../shared/models/cats.model';
import { Pets } from '../shared/enums/pet.enum';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(private readonly peopleService: PeopleService, private orderPipe: OrderPipe) { }

  public cats: Cat[] = [];
  public sortProperty: string = "name";
  public genders: string[] = [];
  public ShowProgressBar: boolean = false;

  ngOnInit(): void {
    this.ShowProgressBar = true;
    this.peopleService.getPeople().subscribe(_people => {
      this.cats = this.setCats(_people);
      this.genders = this.getUniqueGenders(this.cats);
      this.ShowProgressBar = false;
    });

  }

  public setCats(people: People[]): Cat[] {
    people.forEach(_people => {
      if (_people.pets && _people.pets.length > 0) {
        let ownerGender: string = _people.gender;
        _people.pets.forEach(pet => {
          if (pet.type === Pets.Cat) {
            let cat: Cat = new Cat();
            cat.name = pet.name;
            cat.gender = ownerGender;
            this.cats.push(cat);
          }
        });
      }
    });
    return this.sortCats(this.cats, this.sortProperty);
  }

  public sortCats(cats: Cat[], sortProperty: string): Cat[] {
    return this.orderPipe.transform(cats, sortProperty);
  }

  public getUniqueGenders(cats: Cat[]): string[] {
    return [...new Set(cats.map(item => item.gender))];
  }
}
