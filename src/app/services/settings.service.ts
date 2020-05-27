import { Injectable } from '@angular/core';
import { Campaign } from './campaign';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private db: AngularFirestore;

  // campaign stuff
  public campaign$: Subject<Campaign>;
  public campaignList: Campaign[];
  private campaigns: Observable<Campaign[]>;
  private user: User;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService) {
      this.db = this.firestore;
      this.campaign$ = new Subject<Campaign>();
      this.authService.user$.subscribe(user => {
        this.user = user;
        this.setCampaigns();
      });
    }

  setCampaigns(): void {
    this.campaigns = this.db.collection<Campaign>(`/campaigns`).valueChanges();
    this.campaigns.subscribe(campaigns => {
      let result: Campaign[] = []
      campaigns.forEach(campaign => {
        if (campaign.players.includes(this.user.uid) 
            || campaign.dungeonMaster == this.user.uid) {
          result.push(campaign);
        }
      });
      this.campaignList = result;
    })
  }
}
