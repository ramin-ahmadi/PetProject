import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, retry, retryWhen, delay, take } from 'rxjs/operators';
import { AppConfig } from '../../app.config';
import { IPeople } from '../models/people.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
  public baseUrl = AppConfig.settings.apiEndpoints.base;

  getProducts(): Observable<IPeople[]> {
    const getPeopleUrl = AppConfig.settings.apiEndpoints.get.people;
    const getUrl = this.baseUrl+getPeopleUrl;
    return this.http.get<IPeople[]>(getUrl)
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



