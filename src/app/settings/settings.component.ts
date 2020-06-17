import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { User } from '../models/user.model';
import { Campaign } from '../models/campaign.model';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user: User;
  public adminSettings: boolean = false;
  public campaign: Campaign;
  public showMessages: boolean = false;

  constructor(
    public settings: SettingsService,
    public authService: AuthService,
    public messageService: MessageService) { 
      this.settings.campaign$.subscribe(campaign => this.campaign = campaign);
      this.authService.user$.subscribe(user => {
        this.user = user;
        this.adminSettings = user.isAdmin ? true : false;
      });
  }

  ngOnInit(): void { }

  changeCampaign(campaign: Campaign): void {
    this.settings.campaign$.next(campaign);
  }

  updateSettings(setting: string): void {
    eval(`this.settings.${setting} = this.${setting}`);
    this.messageService.add(
      `SettingsService: setting ${setting} changed to ${eval(`this.${setting}`)}`
    );
  }
}
