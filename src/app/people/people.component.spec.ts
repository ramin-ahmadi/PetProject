import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';
import { PeopleService } from '../shared/services/people.service';
import { People} from '../shared/models/people.model'
import { Cat } from '../shared/models/cats.model';

const people:People[] = [{ "name": "Bob", "gender": "Male", "age": 23, "pets":
[{ "name": "Garfield", "type": "Cat" }, { "name": "Fido", "type": "Dog" }] },
{ "name": "Jennifer", "gender": "Female", "age": 18, "pets": [{ "name": "Garfield", "type": "Cat" }] },
{ "name": "Steve", "gender": "Male", "age": 45, "pets": null },
{ "name": "Fred", "gender": "Male", "age": 40, "pets":
[{ "name": "Tom", "type": "Cat" }, { "name": "Max", "type": "Cat" }, { "name": "Sam", "type": "Dog" }, { "name": "Jim", "type": "Cat" }] },
{ "name": "Samantha", "gender": "Female", "age": 40, "pets": [{ "name": "Tabby", "type": "Cat" }] },
{ "name": "Alice", "gender": "Female", "age": 64, "pets": [{ "name": "Simba", "type": "Cat" }, { "name": "Nemo", "type": "Fish" }] }]

const cats:Cat[]=
  [{name: 'Garfield', gender: 'Male'},
  {name: 'Garfield', gender: 'Female'},
  {name: 'Tom', gender: 'Male'},
  {name: 'Max', gender: 'Male'},
  {name: 'Jim', gender: 'Male'},
  {name: 'Tabby', gender: 'Female'},
  {name: 'Simba', gender: 'Female'}]


class MockPeopleService{
  public getPeople():People[]{
    return people
  }
}

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let pipe: OrderPipe;

  beforeEach(async(() => {

    pipe = new OrderPipe();
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, OrderModule],
      providers:[{provider: PeopleService, useClass: MockPeopleService}],
      declarations: [ PeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should produce same ength of cats as expected results', () => {
    component.setCats(people);
    expect(component.cats.length).toEqual(cats.length)
  });

});
