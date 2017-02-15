import { Movie } from './../movies/movie';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit {

  @Input('movie') movie: Movie
  @Output() onSelected = new EventEmitter<Movie>()

  constructor() {
  }

  private onMovieClicked(e) {
    this.onSelected.emit(this.movie)
  }

  ngOnInit() {
  }
}
