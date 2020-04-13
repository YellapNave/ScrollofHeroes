import { Injectable, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { catchError, map, tap } from 'rxjs/operators';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private dbService: DbService
    ) { }

  ngOnInit() {
    this.dbService.initDb();
  }
  // GET: pull down heroes from database
  getHeroes(): Observable<Hero[]> {
    return from(this.dbService.heroesChapter.find().toArray())
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // GET: Pull down hero from database
  getHero(id: number): Observable<Hero> {
    return from(this.dbService.heroesChapter.findOne({"id": id}))
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  // PUT: Update the hero on the server
  updateHero (hero: Hero): Observable<Hero> {
    return from(this.dbService.heroesChapter
      .updateOne(
        {"id": hero.id}, {
          $set: {
                  player: hero.player,
                  class: hero.class,
                  level: hero.level,
                  ancestry: hero.ancestry
                },
         $currentDate: { lastModified: true }
        }))
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
  }

  // POST: Add a new hero to the server
  addHero (hero: Hero) {
    return from(this.dbService.heroesChapter.insertOne(hero))
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  // DELETE: Delete the hero from the server
  deleteHero (hero: Hero | number) {
    const id = typeof hero === 'number' ? hero : hero.id;
    from(this.dbService.heroesChapter.deleteOne({"id": id}))
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  // GET: Get hero whose name contains search term
  searchHeroes (term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if search term is falsy, return empty hero array
      return of([]);
    }
    return from(this.dbService.heroesChapter
            .find({name: {$regex: `^${term}`, $options: "i"}})
            .toArray())
              .pipe(
                tap(x => x.length ?
                  this.log(`found heroes matching "${term}"`) :
                  this.log(`no heroes matching "${term}"`)),
                catchError(this.handleError<Hero[]>('searchHeroes', []))
              );
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
