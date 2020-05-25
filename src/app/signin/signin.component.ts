import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { Observable } from 'rxjs';
import { Campaign } from '../services/campaign';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  db: AngularFirestore;
  public user: User;
  public campaignList: Observable<Campaign[]>;
  private campaigns: AngularFirestoreCollection<Campaign>;

  constructor(public authService: AuthService,
              private firestore: AngularFirestore) { 
  }

  ngOnInit(): void {
    this.db = this.firestore;
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.campaigns = this.db.collection<Campaign>(`/campaigns`, 
      ref => ref.where('dungeonMaster', '==', user.uid));
      this.campaignList = this.campaigns.valueChanges();
    })
  }

}
