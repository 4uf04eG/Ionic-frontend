import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public formGroup: FormGroup

  constructor(private service: AuthService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
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

  signIn() {
    const form = this.formGroup.value;
    this.service.signIn(form.loginControl, form.passwordControl);
  }
}
