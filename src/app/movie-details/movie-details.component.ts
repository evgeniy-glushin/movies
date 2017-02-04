import { MoviesService } from './../movies/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Movie } from './../movies/movie'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  // styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: MoviesService) { }

  private movie: Movie;
  ngOnInit() {
    let titleSub = this.route.params
      .subscribe(params => {
        let title = params['title'];
        console.log(title)

        this.service.getByTitle(title)
          .then(x => this.movie = x)
      })
  }

  private parseArray(arr: string[]) {
    console.log('parseArray was called: ', arr)
    return arr ? arr.join(', ') : ''
  }

}
