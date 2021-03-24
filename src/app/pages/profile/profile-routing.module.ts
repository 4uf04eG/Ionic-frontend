import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePage} from './profile.page';
import {SettingsPage} from "../settings/settings.page";

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: 'settings',
    component: SettingsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
