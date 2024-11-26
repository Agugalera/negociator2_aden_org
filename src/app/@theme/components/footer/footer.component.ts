import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b>
      <a href="https://aden.org" target="_blank">ADEN</a></b> {{ currentYear }}</span>
  `,
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
