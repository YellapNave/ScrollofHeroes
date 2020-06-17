import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/pf2hero.model';
import { HeroService } from '../services/hero.service';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroService: HeroService,
    private settings: SettingsService,
    public authService: AuthService) { 
      this.settings.campaign$.subscribe(campaign => this.getHeroes())
    }

  ngOnInit(): void { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
