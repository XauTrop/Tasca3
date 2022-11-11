import { Component, Input, OnInit } from '@angular/core';
import { LangModel } from 'src/app/models/lang.model';
import { User } from 'src/app/models/user.model';
import { LangService } from 'src/app/services/lang.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public langObject: any;
  public users: User[];


  constructor( private _userService: UserService,
                private _languageService: LangService) {}

  ngOnInit(): void {
    this.users = this._userService.getUsers;
    this.langObject = this._languageService.langObject();
  }
  
  deleteUser(id: number): void {
    this._userService.deleteUser(id);
  }

}
