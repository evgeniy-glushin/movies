import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../movies/movies.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieFilters } from './movie-filters'
import { FiltersRouteUtil } from './filters-route-util'
import { FilterType } from './filter-type'
import * as _ from 'lodash'

@Component({
  selector: 'movie-filters',
  templateUrl: './movie-filters.component.html',
  // styleUrls: ['./movie-filters.component.css']
})
export class MovieFiltersComponent implements OnInit {

  @Output() onFilterChanged = new EventEmitter<MovieFilters>()

  constructor(private service: MoviesService, private route: ActivatedRoute) { }

  private filters: MovieFilters
  private countries: string[]
  private genres: string[]
  ngOnInit() {
    let paramsSub = this.route
      .queryParams
      .subscribe(params => {
        this.filters = FiltersRouteUtil.parse(params)
        // this.selectedGenres = this.filters.genres
        // this.selectedCountries = [this.filters.countries]
        console.log('filters component: ', this.filters)
      })

    this.service.uniqueCountries()
      .then(x => this.countries = x)

    this.service.uniqueGenres()
      .then(x => this.genres = x)
  }

  // private selectedGenres: string[] = []
  private removeGenre(genre: string) {
    if (this.filters.genres)
      _.remove(this.filters.genres, x => x == genre)
    this.genres.push(genre)
    console.log('removeGenre this.filters.genres', this.filters.genres)
    this.onFilterChanged.emit(this.filters)
  }

  private selectedCountries: string[]
  private removeCountry(country: string) {
    _.remove(this.selectedCountries, x => x == country)
  }

  private onChanged(title: string, rating: string, country: string, genre: string, duration: string) {
    this.filters.changedFilter = 'none'
    console.log('movies-filters genre', genre)
    if (genre) {
      if (genre != 'None') {
        this.filters.changedFilter = 'genres'
        _.remove(this.genres, x => x == genre)
        if (this.filters.genres)
          this.filters.genres.push(genre)
        console.log('selectedGenres', this.filters.genres)
      }
    }

    let valDef = <TInput>(value: TInput, defaultValue: TInput | undefined) =>
      _.isNil(value) || _.isNaN(value) ? defaultValue : value;

    let ratingNum = valDef(parseFloat(rating), undefined) //it's always string even if declare rating input as number
    let durationNum = valDef(parseInt(duration), undefined)

    let f = this.filters;
    [f.title, f.rating, f.length, f.countries] = [title.trim(), ratingNum, durationNum, valDef(country, undefined)]

    this.onFilterChanged.emit(this.filters)
  }
}
