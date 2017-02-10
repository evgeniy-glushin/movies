import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../movies/movies.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieFilters } from './movie-filters'
import { FiltersRouteUtil } from './filters-route-util'

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
        console.log('filters component: ', this.filters)
      })

    this.service.uniqueCountries()
      .then(x => this.countries = x)

    this.service.uniqueGenres()
      .then(x => this.genres = x)
  }

  private onChanged(title: string, rating: string, country: string, genre: string, duration: string) {
    let ratingNum = parseFloat(rating) //it's always string even if declare rating input as number
    let durationNum = parseInt(duration)

    this.onFilterChanged.emit({
      title: title.trim(),
      rating: ratingNum ? ratingNum : undefined,
      length: durationNum ? durationNum : undefined,
      genres: genre ? genre : undefined,
      countries: country ? country : undefined
    })
  }
}
