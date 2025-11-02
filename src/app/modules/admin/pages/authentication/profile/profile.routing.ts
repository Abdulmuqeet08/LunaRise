import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';

export const profileRoutes: Routes = [
  {
    path: '',  // Use dynamic userId in the URL
    component: ProfileComponent,
    resolve  : {
      report    : ProfileResolver                   
  }
  }
];
