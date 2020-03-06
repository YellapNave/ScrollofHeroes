import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Doran'},
      { id: 2, name: 'Tinker' },
      { id: 3, name: 'Sul' },
      { id: 4, name: 'Iba' },
      { id: 5, name: 'Gomer' },
      { id: 6, name: 'Jester' },
      { id: 7, name: 'Caduceus' },
      { id: 8, name: 'Caleb' },
      { id: 9, name: 'Nott' },
      { id: 10, name: 'Fjord' },
      { id: 11, name: 'Yasha' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}