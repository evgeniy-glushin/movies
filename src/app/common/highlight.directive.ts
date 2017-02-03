import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective implements OnInit {


  // private templateRef: TemplateRef<any>, /*needed for structural directives*/
  // private viewContainer: ViewContainerRef /*needed for structural directives*/
  constructor(private el: ElementRef) {
    console.log('highlightColor isnt defined')
  }

  ngOnInit() {
    if (this.highlightColor)
      this.highlight(this.highlightColor)

    console.log('on init event... this.highlightColor - ', this.highlightColor)
  }

  @Input() defaultColor: string

  @Input('myHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    console.log('mouseenter triggered... highlightColor - ', this.highlightColor)
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('mouseleave triggered... highlightColor - ', this.highlightColor)
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color
  }

  //Example of custom structural directive
  // @Input() set myUnless(condition: boolean) {
  //   if (!condition) {
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   } else {
  //     this.viewContainer.clear();
  //   }
  // }
}
