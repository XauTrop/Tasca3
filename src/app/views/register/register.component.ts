import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LangService } from 'src/app/services/lang.service';
import { UserService } from 'src/app/services/user.service';
import { CustomMessages } from 'src/assets/lang/lang';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;
  public user: User;
  public stateObject = {
    submitted: false
  }
  public langObject: any;
  public errorName: string;
  public errorFamilyName: string;
  public errorEmail: string;
  public errorMsgs: any;
  public transactionOk: boolean = false;
 
  constructor(private formBuilder: FormBuilder,
              private _UserService: UserService,
              private router: Router,
              private _languageService: LangService
              ) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
    this.langObject = this._languageService.langObject();
  }

  addUser(): any {
    this.stateObject.submitted = true;
    // Select the key of the language property according to validation error property name
    for (let msg in this.formRegister.get('name')?.errors) {
      this.errorName = this.langObject[msg];
    };
    for (let msg in this.formRegister.get('familyName')?.errors) {
      this.errorFamilyName = this.langObject[msg];
    };
    for (let msg in this.formRegister.get('email')?.errors) {
      this.errorEmail = this.langObject[msg];
    };

    if (this.formRegister.valid) {
      this.transactionOk = this._UserService.addUser(this.formRegister.value);
      this.formRegister.reset();
      if (this.transactionOk) {
        this.stateObject.submitted = false;
      }
    }
  }
}
