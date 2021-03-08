import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'participants',
    loadChildren: () => import('./pages/participants/participants.module').then(m => m.ParticipantsPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
