import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public formGroup: FormGroup;

  constructor(private service: AuthService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      firstNameControl: ["",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern("[a-z-A-Z-а-яА-Я]*"),
          Validators.required
        ])],
      middleNameControl: ["",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern("[a-z-A-Z-а-яА-Я]*"),
        ])],
      lastNameControl: ["",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern("[a-z-A-Z-а-яА-Я]*"),
          Validators.required
        ])],
      emailControl: ["",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern("(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))"),
          Validators.required
        ])],
      loginControl: ["",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])],
      passwordControl: ["",
        Validators.compose([
          Validators.minLength(8),
          Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
          Validators.required
        ])]
    });
  }

  ngOnInit() {
    this.service.redirectIfRegistered();
  }

  register() {
    const form = this.formGroup.value;
    let user = new User(form.firstNameControl, form.lastNameControl,
      form.middleNameControl, form.emailControl, form.loginControl, form.passwordControl);
    this.service.register(user);
  }
}
