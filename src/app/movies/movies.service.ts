import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MoviesService {

  constructor(private http: Http) {
    console.log('MoviesService was created.')
  }

  private _cachedMovies: Movie[]

  getAll(): Promise<Movie[]> {
    if (this._cachedMovies) {
      console.log('The data was taken from cache.')
      return Promise.resolve(this._cachedMovies)
    }
    return this.http.get('data.json')
      .toPromise()
      .then(r => {
        console.log('Request to the server.')
        this._cachedMovies = r.json() as Movie[]
        return this._cachedMovies
      }).catch(this.handleError)
  }

  getByTitle(title: string): Promise<Movie> {
    return this.getAll()
      .then(data => data.find(x => x.title == title))
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
