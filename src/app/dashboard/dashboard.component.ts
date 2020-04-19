import { Component, OnInit } from '@angular/core';
import { Hero } from '../services/hero';
import { HeroService } from '../services/hero.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    console.log("Calling getHeroes from Dashboard Component");
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
