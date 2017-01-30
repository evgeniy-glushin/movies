import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MoviesService {

  constructor(private http: Http) { }

  getAll(): Promise<Movie[]> {
    return this.http.get('data.json')
      .toPromise()
      .then(r => r.json() as Movie[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
