import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
  private _randomNumber = Math.floor(Math.random() * 100);
}
