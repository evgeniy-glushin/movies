import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from './movie'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {

  constructor(private service: MoviesService) { }

  private movies: Movie[];
  ngOnInit() {
    this.service.getAll()
      .then(data => this.movies = data)
  }
}

