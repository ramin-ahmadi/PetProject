import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, delay, take } from 'rxjs/operators';
import { AppConfig } from '../../app.config';
import { People } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }


  getPeople(): Observable<People[]> {
    let baseUrl: string;
    let getPeopleUrl: string;
    if(AppConfig && AppConfig.settings){
      baseUrl = AppConfig.settings.apiEndpoints.base;
      getPeopleUrl = AppConfig.settings.apiEndpoints.get.people;
    } else {
      baseUrl = 'http://agl-developer-test.azurewebsites.net/';
      getPeopleUrl = "people.json"
    }
    let getUrl: string = baseUrl+getPeopleUrl;

    return this.http.get<People[]>(getUrl)
      .pipe(
        catchError(this.handleError),
        retryWhen(errors => errors.pipe(delay(1000), take(2)))
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}



