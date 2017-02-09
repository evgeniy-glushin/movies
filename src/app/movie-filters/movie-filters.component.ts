import { MoviesService } from './../movies/movies.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieFilters } from './movie-filters'

@Component({
  selector: 'movie-filters',
  templateUrl: './movie-filters.component.html',
  // styleUrls: ['./movie-filters.component.css']
})
export class MovieFiltersComponent implements OnInit {

  @Output() onFilterChanged = new EventEmitter<MovieFilters>()

  constructor(private service: MoviesService) { }

  countries: string[]
  genres: string[]
  ngOnInit() {
    this.service.uniqueCountries()
      .then(x => {
        console.log('this.countries ', x)
        this.countries = x
      })

    this.service.uniqueGenres()
      .then(x => this.genres = x)
  }

  private onChanged(title: string,
    rating: string,
    country: string,
    genre: string,
    duration: string) {
    console.log('filters. country: ', country)
    console.log('filters. duration: ', duration)
    console.log('filters. genre: ', genre)
    console.log('filters. rating: ', rating)
    console.log('filters. rating type: ', typeof (rating)) //it's always string even if declare rating input as number

    let ratingNum = parseFloat(rating)
    console.log('filters. retingNum: ', ratingNum) //it's always string even if declare rating input as number

    let durationNum = parseInt(duration)
    console.log('filters. durationNum: ', durationNum) //it's always string even if declare rating input as number

    this.onFilterChanged.emit({
      title: title.trim(),
      rating: ratingNum ? ratingNum : undefined,
      length: durationNum ? durationNum : undefined,
      genres: genre ? genre : undefined,
      countries: country ? country : undefined
    })
  }
}
