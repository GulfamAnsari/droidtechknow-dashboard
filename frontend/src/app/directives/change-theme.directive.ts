import { OnInit, Directive, Renderer2, ElementRef, HostBinding, Input, DoCheck } from '@angular/core';
import { DataService } from '../services/data.service';

@Directive({
  selector: '[appChangeTheme]'
})
export class ChangeThemeDirective implements OnInit, DoCheck {
  constructor(private eleRef: ElementRef,
    private renderer: Renderer2,
    private dataService: DataService
  ) { }

  @HostBinding('style.backgroundColor') background: string;
  @Input('appChangeTheme') set themeChange(value) {
    this.background = value;
  }

  ngOnInit() {
    // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', this.change);
  }

  ngDoCheck(): void { }

}
