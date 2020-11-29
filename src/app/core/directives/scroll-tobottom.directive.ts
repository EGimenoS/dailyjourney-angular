import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
})
export class ScrollToBottomDirective {
  constructor(private el: ElementRef) {}

  public scrollToBottom(): void {
    const el: HTMLDivElement = this.el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }
}
