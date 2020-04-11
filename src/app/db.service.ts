import { Injectable, OnInit } from '@angular/core';
import {
  Stitch,
  RemoteMongoClient,
  RemoteMongoDatabase,
  StitchAppClient,
  AnonymousCredential,
  RemoteMongoCollection
} from 'mongodb-stitch-browser-sdk';
import { Hero } from './hero'


@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: RemoteMongoDatabase;
  client: StitchAppClient;
  heroesChapter: RemoteMongoCollection<Hero>;

  initDb() {
    this.client = Stitch.initializeDefaultAppClient('scrollofheroes-egril');

    this.db = this.client
                    .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
                    .db('scroll');
    
    this.heroesChapter = this.db.collection<Hero>('heroes');
  }

  ngOninit() {
    this.client.auth.loginWithCredential(new AnonymousCredential());
  }
}
