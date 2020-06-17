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
  public showMessages: boolean;

  constructor(
    public settings: SettingsService,
    public authService: AuthService,
    public messageService: MessageService) { 
      this.settings.campaign$.subscribe(campaign => this.campaign = campaign);
      this.settings.showMessages$.subscribe(show => this.showMessages = show);
      this.authService.user$.subscribe(user => {
        this.user = user;
        this.adminSettings = user.isAdmin ? true : false;
      });
  }

  ngOnInit(): void { }

  updateSettings(setting: string): void {
    // Update settings service observable equivalent to have new value of setting
    // and log the setting change
    let value = eval(`this.${setting}`);
    eval(`this.settings.${setting}$.next(${value})`);
    this.messageService.add(
      `SettingsService: setting ${setting} changed to ${value}`
    );
  }
}
