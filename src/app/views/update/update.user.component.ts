import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { LangService } from 'src/app/services/lang.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.user.component.html',
  styleUrls: ['./update.user.component.scss'],
})
export class UpdateUserComponent implements OnInit {

  public user: User;
  public formRegister: FormGroup;
  public stateObject = {
    submitted: false,
  };
  public langObject: any;
  public errorName: string;
  public errorFamilyName: string;
  public errorEmail: string;
  public errorMsgs: any;
  public transactionOk: boolean = false;
  private userId: number = Number(this.route.snapshot.paramMap.get('id'));


  constructor(
    private route: ActivatedRoute,
    private _UserService: UserService,
    private formBuilder: FormBuilder,
    private _messages: LangService,
    private location: Location,
    private _languageService: LangService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.createForm();
    this.langObject = this._languageService.langObject();
  }

  createForm() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getHero(): void {
    this.user = this._UserService.getUser(this.userId);
  }

  updateUser(): any {
    this.stateObject.submitted = true;
    // Select the key of the language property according to validation error property name
    for (let msg in this.formRegister.get('name')?.errors) {
      this.errorName = this.errorMsgs[msg];
    }
    for (let msg in this.formRegister.get('familyName')?.errors) {
      this.errorFamilyName = this.errorMsgs[msg];
    }
    for (let msg in this.formRegister.get('email')?.errors) {
      this.errorEmail = this.errorMsgs[msg];
    }

    if (this.formRegister.valid) {
      this.user.id = this.userId;
      this.user.name = this.formRegister.get('name')?.value;
      this.user.familyName = this.formRegister.get('familyName')?.value;
      this.user.email = this.formRegister.get('email')?.value;
      this._UserService.updateUser(this.user);
      this.stateObject.submitted = false;
    }
    this.goBack();
  }

  goBack(): void {
      this.location.back();
  }
}
