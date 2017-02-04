import { Movie } from './../movies/movie';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  // styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input('movie') movie: Movie
  @Output() onSelected = new EventEmitter<Movie>()

  constructor() {
    // console.log('constructor: ', this.movie)
  }

  private onMovieClicked(e) {
    this.onSelected.emit(this.movie)

    // console.log('onMovieClicked', e)
  }

  ngOnInit() {
    // console.log('ngOnInit', this.movie)
  }
}
