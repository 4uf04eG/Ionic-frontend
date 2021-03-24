import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GroupsPageRoutingModule} from './groups-routing.module';

import {GroupsPage} from './groups.page';
import {ErrorViewComponent} from "../../components/error-view/error-view.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsPageRoutingModule,
    NgxDatatableModule,
    TranslateModule
  ],
  exports: [
    ErrorViewComponent
  ],
  declarations: [GroupsPage, ErrorViewComponent]
})
export class GroupsPageModule {
}
