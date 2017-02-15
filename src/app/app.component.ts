import { MoviesService } from './movies/movies.service';
import { Router, NavigationExtras } from '@angular/router'
import { Component } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieFilters } from './movie-filters/movie-filters'
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoviesService]
})
export class AppComponent {

  constructor(private router: Router) { }

  private onFilterChangeHandler(filters: MovieFilters) {
    let {title, rating, length, genres, countries, changedFilter} = filters;

    //TODO: refactor this
    let calcUrlChunk = () => _.last(url) == '&' || _.last(url) == '?' ? '' : '&'

    let url = '/?'
    if (title) url += `title=${title}`
    if (rating) url += `${calcUrlChunk()}rating=${rating}`
    if (length) url += `${calcUrlChunk()}length=${length}`
    if (genres && genres.length) url += `${calcUrlChunk()}genres=${JSON.stringify(genres)}`
    if (countries && countries.length) url += `${calcUrlChunk()}countries=${JSON.stringify(countries)}`
    if (changedFilter != 'none') url += `${calcUrlChunk()}filter=${changedFilter}`

    this.router.navigateByUrl(url)
    console.log('this.router.navigateByUrl was called: ', url)
  }
}
