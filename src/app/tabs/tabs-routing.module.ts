import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/dances/dances.module').then(m => m.DancesPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pages/coaches/coaches.module').then(m => m.CoachesPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../pages/groups/groups.module').then(m => m.GroupsPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/participants/participants.module').then(m => m.ParticipantsPageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
