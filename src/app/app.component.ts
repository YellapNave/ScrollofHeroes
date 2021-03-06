import { Component, OnInit } from '@angular/core';
import { HeroService } from './services/hero.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scroll of Heroes';

  constructor(private heroService: HeroService,
              public authService: AuthService,
              public settings: SettingsService) {}

  ngOnInit() {
    this.heroService.ngOnInit();
   }
}
