import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponentComponent } from './movie-details-component/movie-details-component.component';
import { MovieCardDirective } from './common/movie-card.directive';
import { HighlightDirective } from './common/highlight.directive';

let route = [
  { path: '', component: MoviesComponent },
  { path: 'movies/:title', component: MovieDetailsComponentComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponentComponent,
    MovieCardDirective,
    HighlightDirective
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
