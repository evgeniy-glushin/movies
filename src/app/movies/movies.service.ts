import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import * as _ from "lodash";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MoviesService {

  constructor(private http: Http) {
  }

  uniqueGenres() {
    return this.getAll()
      .then(data => _.reduce(data, (acc: string[], m) => _.union(acc, m.genres), []))
  }

  uniqueCountries() {
    return this.getAll()
      .then(data => _.reduce(data, (acc: string[], m) => _.union(acc, m.countries), []))
  }

  private _cachedMovies: Movie[]
  getAll(): Promise<Movie[]> {
    if (this._cachedMovies) {
      return Promise.resolve(this._cachedMovies)
    }
    return this.http.get('data.json')
      .toPromise()
      .then(r => {
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
