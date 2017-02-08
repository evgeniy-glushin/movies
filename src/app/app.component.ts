import { MoviesService } from './movies/movies.service';
import { Router, NavigationExtras } from '@angular/router'
import { Component } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoviesService]
})
export class AppComponent {

  constructor(private router: Router) { }

  private onFilterChangeHandler({title}) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'title': title }
    };
    this.router.navigate(['movies', navigationExtras])
    // console.log("app.comp.title", title)
  }
}
