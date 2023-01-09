import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    url: inject(API_URL),
    prod: inject(IS_PRODUCTION),
  };
}
