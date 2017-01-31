import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMovieCard]'
})
export class MovieCardDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.
  }

  @Input('propname') propVal: string

  @HostListener('mouseenter') onMouseEnter() {
    console.log('mouseenter triggered')
  }
  @HostListener('mouseleave') onMouseLeave() {
    console.log('mouseleave triggered')
  }

}
