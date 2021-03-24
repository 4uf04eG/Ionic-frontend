import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {User} from "../models/user";
import {AlertController, NavController} from "@ionic/angular";
import {RootPaths} from "../app-routing.module";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private preferences: PreferencesService,
    private navCtrl: NavController,
    private alertController: AlertController,
  ) {
  }

  public get token(): string {
    return this.preferences.token;
  }

  public set token(value: string) {
    this.preferences.token = value;
  }

  redirectIfNotRegistered() {
    if (this.isRegistered()) {
      this.navCtrl.navigateRoot(RootPaths.login);
      return false;
    }

    return true;
  }

  redirectIfRegistered() {
    if (this.isRegistered()) {
      this.navCtrl.navigateRoot(RootPaths.main);
    }
  }

  isRegistered() {
    return this.token !== undefined && this.token !== null;
  }

  register(user: User) {
    return this.apiService.register(user).subscribe(
      token => {
        if (token != undefined) {
          this.token = token.token;
          this.setDefaultSettings();
          this.navCtrl.navigateRoot(RootPaths.main);
        }
      },
      error => this.showAuthAlert(error),
    );
  }

  signIn(login: string, password: string) {
    return this.apiService.signIn(login, password).subscribe(
      token => {
        this.token = token.token;
        this.setDefaultSettings();
        this.navCtrl.navigateRoot(RootPaths.main);
      },
      error => this.showAuthAlert(error),
    );
  }

  logOut() {
    this.preferences.clear().then(_ => this.navCtrl.navigateRoot(RootPaths.login));
    this.apiService.signOut().subscribe();
  }

  private setDefaultSettings() {
    this.preferences.updatePeriodInSec = 60;
    this.preferences.forcedLanguage = 'en';
    this.preferences.pageSize = 5;
  }

  private async showAuthAlert(error: any) {
    let msg = 'Unknown error';

    if (error.status == 401) {
      msg = 'Could not authenticate';
    }
    if (error.status == 500) {
      msg = 'User with this login already exists';
    }

    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Authentication',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
