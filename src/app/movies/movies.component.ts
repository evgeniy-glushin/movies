import { Router, ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

  private paramsSub
  private movies: Movie[]
  ngOnInit() {
    this.paramsSub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        let title = params['title'] as string
        console.log('title: ', title);
        let myAdd = function (x: number, y: number): number { return x + y; };
        let rating = (params['rating'] || 0) * 1
        console.log('movies-list. rating: ', rating);
        console.log('movies-list. rating type: ', typeof (rating));

        let titleFilter = (x: Movie) => !title || x.title.toLowerCase().indexOf(title) >= 0
        let ratingFilter = (x: Movie) => !rating || x.rating >= rating

        this.service.getAll()
          .then(data => this.movies = data.filter(x => titleFilter(x) && ratingFilter(x)))
      });

    /*This line has been taken from A2 docs and it doesn't work*/
    // let title = this.activatedRoute
    //   .queryParams.map(params => params['session_id'] || 'None');

    /*This is how we can get some static data from the route*/
    // console.log('snapshot title', this.activatedRoute.snapshot.data[0]['title'])

    // interface FilterFunc { (movie: Movie, paramName: string): boolean }

    // let buildFilters = (...funcs: FilterFunc[]) => 
    //   _.map(funcs, )
  }

  //TODO: not implemented 
  private buildFiltersExp() {

  }

  ngOnDestroy() {
    if (this.paramsSub) this.paramsSub.unsubscribe();
  }

  private movieSelectedHandler({title}) {
    this.router.navigate(['movie-details/', title])
    console.log('movieSelectedHandler ', title)
  }
}

