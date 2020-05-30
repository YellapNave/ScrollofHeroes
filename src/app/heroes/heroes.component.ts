import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';
import { AuthService } from '../services/auth.service';
import { tap, take, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
    private router: Router,
    private settings: SettingsService,
    public authService: AuthService,
    ) { 
      this.settings.campaign$.subscribe(campaign => this.getHeroes());
    }            

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.authService.user$.subscribe(user => {
      this.heroService.getHeroes().subscribe(
        heroes => {
          this.heroes = heroes;
        });
      })
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).pipe(take(1))
    .subscribe(newHero => this.router.navigate([`/detail/${newHero.key}`]));
  }

  delete(key: string): void {
    this.heroes = this.heroes.filter(h => h.key !== key);
    this.heroService.deleteHero(key);
  }

  

}
