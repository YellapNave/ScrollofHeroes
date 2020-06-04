import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Campaign } from '../models/campaign.model';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public user: User;

  constructor(public authService: AuthService,
              public settings: SettingsService) { 
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

}
