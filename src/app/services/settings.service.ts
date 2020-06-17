import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private db: AngularFirestore;

  // campaign stuff
  public campaign$: BehaviorSubject<Campaign>;
  public campaignList: Campaign[];
  public showMessages: boolean = false;
  private campaigns: Observable<Campaign[]>;
  private user: User;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService) {
      this.db = this.firestore;
      this.campaign$ = new BehaviorSubject<Campaign>({key: ""});;
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
      if (this.campaignList) {
       this.campaign$.next(this.campaignList[0]);
      }
    })
  }
}
