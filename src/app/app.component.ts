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
    console.log('onFilterChangeHandler title: ', title)

    let navigationExtras: NavigationExtras = {
      queryParams: { 'title': title },
      fragment: 'anchor'
    };

    this.router.navigateByUrl('/?title=' + title)

    // this.router.navigate(['/movies', navigationExtras])
    //   .then(x => console.log('navigation complited - ', x))
    console.log('this.router.navigate was called')
  }
}
