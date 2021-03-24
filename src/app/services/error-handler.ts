import {ErrorHandler, Injectable} from '@angular/core';
import {NavController} from "@ionic/angular";
import {RootPaths} from "../app-routing.module";
import {PreferencesService} from "./preferences.service";
import {ApiService} from "./api.service";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(
    private navCtl: NavController,
    private preferences: PreferencesService,
    private api: ApiService
  ) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);

    if (error.status == 401) {
      this.api.updateToken().subscribe(
        token => {
          this.preferences.token = token.token;
          this.navCtl.navigateRoot(RootPaths.main);
        },
        err => {
          console.log(err);
          this.navCtl.navigateRoot(RootPaths.login);
        }
      )
    }
  }
}
