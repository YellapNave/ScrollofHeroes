import { Component, OnInit } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scroll of Heroes';

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.dbService.initDb();
  }
}
