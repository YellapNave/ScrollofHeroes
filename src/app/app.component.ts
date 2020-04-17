import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scroll of Heroes';

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.ngOnInit();
   }
}
