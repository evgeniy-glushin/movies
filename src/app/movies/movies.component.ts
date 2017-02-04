import { Router, ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from './movie'
import * as _ from "lodash";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  // styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {

  constructor(private service: MoviesService, private router: Router) { }

  private movies: Movie[];
  ngOnInit() {
    this.service.getAll()
      .then(data => this.movies = data)
  }

  private movieSelectedHandler({title}) {
    this.router.navigate(['movies/', title])
    console.log('movieSelectedHandler ', title)
  }
}

