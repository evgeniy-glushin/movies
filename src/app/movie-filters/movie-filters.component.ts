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

  ngOnInit() {
  }

  private onChanged(title: string, rating: string) {
    // if(title.length > 2)
    console.log('filters. rating: ', rating)
    console.log('filters. rating type: ', typeof(rating)) //it's always string even if declare rating input as number
    
    let ratingNum = parseFloat(rating)
    console.log('filters. retingNum: ', ratingNum) //it's always string even if declare rating input as number


    this.onFilterChanged.emit({ 
      title: title.trim(), 
      rating: ratingNum ? ratingNum : undefined })
  }
}
