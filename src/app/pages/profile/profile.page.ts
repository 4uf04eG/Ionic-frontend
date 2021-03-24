import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoadingController, NavController} from "@ionic/angular";
import {ApiService} from "../../services/api.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  public profile: User;
  public error: any;

  public editing = {};

  constructor(private authService: AuthService,
              private navCtl: NavController,
              private api: ApiService,
              private loadingController: LoadingController,
  ) {
    this.getUser();
  }

  async getUser() {
    let loader = await this.loadingController.create()
    await loader.present()

    this.api.getCurrentUser().subscribe(p => {
      this.profile = p;
      loader.dismiss();
    }, error => {
      this.error = error;
      loader.dismiss();
      throw error;
    });

  }

  editPassword() {

  }

  openSettings() {
    this.navCtl.navigateForward('main/tabs/tab5/settings')
  }


  logOut() {
    this.authService.logOut();
  }

  updateValue(event, cell) {
    this.profile[cell] = event.target.value;
    this.api.updateUser(this.profile).subscribe();
  }
}
