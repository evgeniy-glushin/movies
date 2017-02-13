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

  private removeGenre(genre: string) {
    if (this.filters.genres)
      _.remove(this.filters.genres, x => x == genre)
    this.genres.push(genre)
    console.log('removeGenre this.filters.genres', this.filters.genres)
    this.onFilterChanged.emit(this.filters)
  }

  private removeCountry(country: string) {
    if (this.filters.countries)
      _.remove(this.filters.countries, x => x == country)
    this.countries.push(country)
    console.log('removeGenre this.filters.countries', this.filters.countries)
    this.onFilterChanged.emit(this.filters)
  }

  private onChanged(title: string, rating: string, country: string, genre: string, duration: string) {
    this.filters.changedFilter = 'none'
    console.log('movies-filters genre', genre)
    console.log('movies-filters country', country)

    if (genre != 'None') {
      this.filters.changedFilter = 'genres'
      _.remove(this.genres, x => x == genre)
      if (this.filters.genres)
        this.filters.genres.push(genre)
      console.log('selectedGenres', this.filters.genres)
    }

    if (country != 'None') {
      this.filters.changedFilter = 'countries'
      _.remove(this.countries, x => x == country)
      if (this.filters.countries)
        this.filters.countries.push(country)
      console.log('selectedcountries', this.filters.countries)
    }

    let valOrDef = <TInput>(value: TInput, defaultValue: TInput | undefined) =>
      _.isNil(value) || _.isNaN(value) ? defaultValue : value;

    let ratingNum = valOrDef(parseFloat(rating), undefined) //it's always string even if declare rating input as number
    let durationNum = valOrDef(parseInt(duration), undefined)

    let f = this.filters;
    [f.title, f.rating, f.length] = [title.trim(), ratingNum, durationNum]

    this.onFilterChanged.emit(this.filters)
  }
}
