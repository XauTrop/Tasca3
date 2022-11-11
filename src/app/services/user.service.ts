import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private user: User = {} as unknown as User;
  private users: User[] = [];
  private operationOk: boolean;
  private userIndex: number;
  private lastUserIndex: number = 0;

  constructor(private _storage: StorageService) { 
    this.users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')!) : [];
    
  }

  get getUsers() {
    return this.users;
  }
  getUser(idUser: number): any{
    return this.users.find(obj => obj.id === idUser);

  }
  addUser(userNew: User): boolean {
    // Check users length before modify
    let previousLength = this.users.length;
    // Check last id  for database consistency
    let a: number = 0;
    this.users.forEach((el, a) => {
      if (el.id > a) {
        a = el.id;
      }
      this.lastUserIndex = a;
    });
    // Construct user object
    const user: User = {
      id: this.lastUserIndex + 1,
      name: userNew.name,
      familyName: userNew.familyName,
      email: userNew.email};
    this.users.push(user);
    // Check users length after modify
    let postLength = this.users.length;

    this._storage.storeData(this.users);

    if (previousLength != postLength){
      this.operationOk = true;

    } else {
      this.operationOk = false;
    }
    return this.operationOk;
    
  }

  updateUser(user: User): void {
    this.users[this.users.findIndex(el => el.id === user.id)] = user;

    this._storage.storeData(this.users);
  }

  deleteUser(id: number): void {
    this.userIndex = this.users.findIndex(el => el.id === id);
    this.users.splice(this.userIndex, 1);
    this._storage.storeData(this.users);
    
  }
}
