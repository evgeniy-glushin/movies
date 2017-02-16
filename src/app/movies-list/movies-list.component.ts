import { Router, ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from './movie'
import * as _ from "lodash";
import { FilterType } from './../movie-filters/filter-type'


@Component({
  selector: 'app-movies',
  templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit {

  constructor(private service: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  private paramsSub
  private movies: Movie[]
  ngOnInit() {
    this.paramsSub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        let title = params['title'] as string
        let titleFilter = (x: Movie) => !title || x.title.toLowerCase().indexOf(title) >= 0

        let rating = (params['rating'] || 0) * 1
        let ratingFilter = (x: Movie) => !rating || x.rating >= rating

        let length = (params['length'] || 0) * 1
        let lengthFilter = (x: Movie) => !length || x.length <= length

        let any = (left: string[], right: string[]) =>
          _.find(left, x => _.includes(right, x))

        let changedFilter: FilterType | undefined = params['filter']

        let genres: string[] = JSON.parse(params['genres'] || '[]')
        let genresFilter = changedFilter == 'genres' ?
          (x: Movie) => any(x.genres, genres) : (x: Movie) => !genres.length || any(x.genres, genres)

        let countries: string[] = JSON.parse(params['countries'] || '[]')
        let countriesFilter = changedFilter == 'countries' ?
          (x: Movie) => any(x.countries, countries) : (x: Movie) => !countries.length || any(x.countries, countries)

        this.service.getAll()
          .then(data => this.movies = data.filter(x => titleFilter(x) &&
            ratingFilter(x) &&
            lengthFilter(x) &&
            genresFilter(x) &&
            countriesFilter(x)))
      });
  }

  ngOnDestroy() {
    if (this.paramsSub) this.paramsSub.unsubscribe();
  }

  private movieSelectedHandler({title}) {
    this.router.navigate(['movie-details/', title])
  }
}

