import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HighlightDirective } from './common/highlight.directive';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieFiltersComponent } from './movie-filters/movie-filters.component';

let route = [
  { path: '', component: MoviesComponent },
  { path: 'movies/:title', component: MovieDetailsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HighlightDirective,
    MovieDetailsComponent,
    MovieCardComponent,
    MovieFiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
