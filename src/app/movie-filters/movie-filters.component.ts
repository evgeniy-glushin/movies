import { MoviesService } from './../movies/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'movie-filters',
  templateUrl: './movie-filters.component.html',
  // styleUrls: ['./movie-filters.component.css']
})
export class MovieFiltersComponent implements OnInit {

  title: string

  constructor(private service: MoviesService) { }

  ngOnInit() {
  }

}
