import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SettingsService } from '../services/settings.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public user: User;
  public campaign: Campaign;

  constructor(public authService: AuthService,
              public settings: SettingsService) { 
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  changeCampaign(campaign: Campaign): void {
    this.settings.campaign$.next(this.campaign);
  }

}
