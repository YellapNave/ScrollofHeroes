import { Injectable, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { Hero } from '../models/pf2hero.model';
import { User } from '../models/user.model';
import { 
  AngularFirestoreCollection, 
  AngularFirestore
} from '@angular/fire/firestore';
import { Campaign } from '../models/campaign.model';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroesChapter: AngularFirestoreCollection<Hero>;
  db: AngularFirestore;
  user: User;
  campaign: Campaign;

  constructor(
    private messageService: MessageService,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private settings: SettingsService
    ) { 
      this.db = this.firestore;
      this.authService.user$.subscribe(user => {
        this.user = user;
      });
      this.settings.campaign$.subscribe(campaign => {
        if (campaign.key !== "") {
          this.heroesChapter = 
            this.db.collection<Hero>(`/campaigns/${campaign.key}/heroes`);
            this.log(`fetched campaign: ${campaign.title}`);
        }
      })
    }

  ngOnInit() { }

  getHeroes(): Observable<Hero[]> {
    if (this.heroesChapter) {
      return this.heroesChapter.valueChanges()
      .pipe(
        tap(_ => this.log(`fetched heroes`)),
        catchError(this.handleError<Hero[]>(`fetching heroes`))
      );
    } else {
      return of([]);
    }
  }

  // READ: Pull down hero from database
  getHero(key: string): Observable<Hero> {
    if (this.heroesChapter) {
      const heroDoc = this.heroesChapter.doc<Hero>(key);
      return heroDoc.valueChanges().pipe(
        take(1),
        tap(hero => this.log(`fetched hero ${hero.name} (key=${key})`)),
        catchError(this.handleError<Hero>(`getting hero w/ key=${key}`)));
    } else {
      return of();
    }
  }

  // UPDATE: Update hero in the database with new value
  updateHero(key: string, value: any): Observable<void> {
    return from(this.heroesChapter.doc(key).update(value))
    .pipe(
      tap(_ => this.log(`updated hero ${value.name} (key: ${key})`)),
      catchError(this.handleError<void>(`updating hero ${value.name} (key: ${key})`))
    );
  }

  // CREATE: Add new hero to database
  addHero(hero: Hero): Observable<Hero> {
    const key = this.db.createId();
    const ref = this.heroesChapter.doc<Hero>(key);
    ref.set({key: key, ...hero});
    return ref.valueChanges().pipe(take(1));
  }

  deleteHero(key: string): Promise<any> {
    return this.heroesChapter.doc(key).delete()
      .then(_ => {
        this.log(`deleted hero w/ key: ${key}`);
      }).catch(this.handleError<void>(`deleting hero w/ key: ${key}`));
  }

  // GET: Get hero whose name contains search term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if search term is falsy, return empty hero array
      return from([]);
    }
    return this.db.collection<Hero>('/heroes', 
              ref => ref.where('name', '==', term))
                        .valueChanges();
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
    this.messageService.add(`HeroService: ${message}`);
  }
}
