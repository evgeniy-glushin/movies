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

  private sub
  private movies: Movie[];
  ngOnInit() {
    // this.sub = this.activatedRoute
    //   .queryParams
    //   .subscribe(params => {
    //     let title = params['title']
    //     console.log('title: ', title);
    //     this.service.getAll()
    //       .then(data => this.movies = data.filter(x => !title || x.title.indexOf(title) >= 0))
    //   });

    // let title = this.activatedRoute
    //   .queryParams.map(params => params['session_id'] || 'None');

    // console.log('snapshot title', this.activatedRoute.snapshot.data[0]['title'])
    // this.activatedRoute.params
    //   .subscribe(params => {
    //     let title: string = params['params']
    //     console.log('filter params: ', title)
    //     this.service.getAll()
    //       .then(data => this.movies = data.filter(x => !title || x.title.indexOf(title) >= 0))
    //   })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private movieSelectedHandler({title}) {
    this.router.navigate(['movie-details/', title])
    console.log('movieSelectedHandler ', title)
  }
}

