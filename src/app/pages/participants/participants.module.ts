import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ParticipantsPageRoutingModule} from './participants-routing.module';

import {ParticipantsPage} from './participants.page';
import {GroupsPageModule} from "../groups/groups.module";
import {TranslateModule} from "@ngx-translate/core";
import {ImageViewComponent} from "../../components/image-view/image-view.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantsPageRoutingModule,
    GroupsPageModule,
    TranslateModule.forChild()
  ],
  declarations: [ParticipantsPage, ImageViewComponent]
})
export class ParticipantsPageModule {
}
