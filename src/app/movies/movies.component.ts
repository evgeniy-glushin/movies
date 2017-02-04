import { Router, ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from './movie'
// import { MovieCardComponent } from './../movie-card/movie-card.component' 

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  // styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {

  constructor(private service: MoviesService, private router: Router) { }

  private movies: Movie[];
  ngOnInit() {
    this.service.getAll()
      .then(data => this.movies = data)
  }

  private movieSelectedHandler({title}){
    this.router.navigate(['movies/', title])
    console.log('movieSelectedHandler ', title)
  }
}

