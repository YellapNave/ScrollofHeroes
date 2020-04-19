import { Component, OnInit } from '@angular/core';
import { Hero } from '../services/hero';
import { HeroService } from '../services/hero.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, 
              private router: Router,
              public authService: AuthService) { }            

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const id = this.heroes.length > 0 ? 
      Math.max(...this.heroes.map(hero => hero.id)) + 1 :
      1;
    const newHero = this.heroService.addHero({ id, name } as Hero)
    // make this navigate to the details page
  }

  delete(key: string): void {
    this.heroes = this.heroes.filter(h => h.key !== key);
    this.heroService.deleteHero(key);
  }

}
