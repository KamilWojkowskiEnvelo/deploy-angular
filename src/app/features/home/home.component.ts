import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { API_URL, IS_PRODUCTION } from '@core/env.token';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    application shell on develop!! | {{ envs.url }} | {{ envs.prod }}
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  envs = {
    url: this.API_URL,
    prod: inject(IS_PRODUCTION),
  };

  constructor(@Inject(API_URL) private API_URL: string) {
    fetch(this.API_URL + '/data')
      .then(res => res.json())
      .then(console.log)
      .catch(console.warn);
  }
}
