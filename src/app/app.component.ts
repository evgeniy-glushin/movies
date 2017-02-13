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

    console.log('onFilterChangeHandler title: ', title)

    //TODO: refactor this
    let calcUrlChank = () => _.last(url) == '&' || _.last(url) == '?' ? '' : '&'

    let url = '/?'
    if (title) url += `title=${title}`
    if (rating) url += `${calcUrlChank()}rating=${rating}`
    if (length) url += `${calcUrlChank()}length=${length}`
    if (genres && genres.length) url += `${calcUrlChank()}genres=${JSON.stringify(genres)}`
    if (countries && countries != 'None') url += `${calcUrlChank()}countries=${countries}`
    if (changedFilter != 'none') url += `${calcUrlChank()}filter=${changedFilter}`

    // if (url != '/?') {
    this.router.navigateByUrl(url)
    console.log('this.router.navigateByUrl was called: ', url)
    // }

    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'title': title },
    //   fragment: 'anchor'
    // };
    // this.router.navigate(['/movies', navigationExtras])
    //   .then(x => console.log('navigation complited - ', x))
  }
}
