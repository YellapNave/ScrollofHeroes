import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Campaign } from '../models/campaign.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
 

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private messageService: MessageService
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`/users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  ngOnInit() { }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`/users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      playerIn: user.playerIn.valueChanges() ? user.playerIn.valueChanges() : [],
    }
    
    userRef.set(data, {merge: true})
      .then(prom => {this.log(`signed in as: ${user.displayName}`); return prom;})
      .catch(this.handleError<any>(`signing in as ${user.displayName}`));
    this.router.navigate(["/account"]);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead for now

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }
}
