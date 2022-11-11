import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeData(users: User[]): void {
    sessionStorage.setItem('users', JSON.stringify(users));
  }
}
