import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';

import {ProfileRoutingModule} from './profile-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {SettingsPage} from "../settings/settings.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ProfilePage}]),
    ProfileRoutingModule,
    TranslateModule,
  ],
  exports: [CommonModule, FormsModule, TranslateModule,
    RouterModule],
  declarations: [ProfilePage, SettingsPage]
})
export class ProfilePageModule {
}
