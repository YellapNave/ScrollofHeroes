import { Injectable, OnInit } from '@angular/core';
import {
  Stitch,
  RemoteMongoClient,
  RemoteMongoDatabase,
  StitchAppClient,
  AnonymousCredential,
  RemoteMongoCollection
} from 'mongodb-stitch-browser-sdk';
import { 
  AngularFirestore, 
  AngularFirestoreCollection,
  AngularFirestoreDocument } from '@angular/fire/firestore';
import { Hero } from './hero';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: RemoteMongoDatabase;
  client: StitchAppClient;
  heroesChapter: RemoteMongoCollection<Hero>;
  heroesChapter2: AngularFirestoreCollection<Hero>;
  db2: AngularFirestore;

  constructor(private firestore: AngularFirestore) {};

  initDb() {
    this.client = Stitch.initializeDefaultAppClient('scrollofheroes-egril');

    this.db = this.client
                    .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
                    .db('scroll');
    this.db2 = this.firestore;
    
    this.heroesChapter = this.db.collection<Hero>('heroes');
    this.heroesChapter2 = this.firestore.collection<Hero>('heroes');
  }

  ngOninit() {
    this.client.auth.loginWithCredential(new AnonymousCredential());

  }

  createHero(hero: Hero) {
    return this.firestore.collection('heroes').add({
      id: hero.id,
      name: hero.name
    })
  }
}
