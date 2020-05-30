import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  public userOwnsHero: Boolean;
  private key: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private authService: AuthService,
    private location: Location,
    private settings: SettingsService,
    ) {
      this.settings.campaign$.subscribe(campaign => this.getHero());
     }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key')
    this.authService.user$.subscribe(user => this.userOwnsHero = 
      user.characters.includes(this.key) || user.isAdmin);
    this.getHero();
  }

  getHero(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.heroService.getHero(key)
      .subscribe(hero => this.hero = {key, ...hero});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero.key, this.hero).pipe(take(1))
      .subscribe(hero => this.goBack());
  }
}
