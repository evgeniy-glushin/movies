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

  constructor(private service: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    console.log('MoviesComponent was created.')
  }

  private movies: Movie[];
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        let title: string = params['params']
        console.log('filter params: ', title)
        this.service.getAll()
          .then(data => this.movies = data.filter(x => !title || x.title.indexOf(title) >= 0))
      })
  }

  private movieSelectedHandler({title}) {
    this.router.navigate(['movie-details/', title])
    console.log('movieSelectedHandler ', title)
  }
}

