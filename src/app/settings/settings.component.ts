import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { User } from '../models/user.model';
import { Campaign } from '../models/campaign.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user: User;
  public campaign: Campaign;

  constructor(
    public settings: SettingsService,
    public authService: AuthService) { 
      this.settings.campaign$.subscribe(campaign => this.campaign = campaign);
      this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnInit(): void { }


  changeCampaign(campaign: Campaign): void {
    this.settings.campaign$.next(campaign);
  }

}
