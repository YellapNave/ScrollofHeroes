import { Injectable, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { Hero } from '../hero';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  AngularFirestoreCollection, 
  AngularFirestore 
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroesChapter: AngularFirestoreCollection<Hero> = null;
  db: AngularFirestore;

  constructor(
    private messageService: MessageService,
    private firestore: AngularFirestore,
    private authService: AuthService
    ) { }

  ngOnInit() { 
    this.db = this.firestore;
    this.heroesChapter = this.db.collection<Hero>('/heroes', 
        ref => ref.orderBy("id"));
    this.log('fetched heroes')
   }

  getHeroesList(): AngularFirestoreCollection<Hero> {
    return this.heroesChapter;
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroesChapter.valueChanges()
    .pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError<Hero[]>(`fetching heroes`))
    );
  }

  // READ: Pull down hero from database
  getHero(key: string): Observable<Hero> {
    const heroDoc = this.heroesChapter.doc<Hero>(key);
    const hero = heroDoc.valueChanges();
    return hero
      .pipe(
        tap(hero => this.log(`fetched hero ${hero.name} (key=${key})`)),
        catchError(this.handleError<Hero>(`getting hero w/ key=${key}`))
      );
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
  async addHero(hero: Hero): Promise<any> {
    try {
      const ref = await this.heroesChapter.add({ ...hero });
      this.log(`added hero ${hero.name} (key: ${ref.id})`);
      return ref;
    }
    catch (ref_1) {
      return this.handleError<void>(`adding hero ${hero.name} (key: ${ref_1.id})`);
    }
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
              ref => ref.where(term, "in", "name")).valueChanges();
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
