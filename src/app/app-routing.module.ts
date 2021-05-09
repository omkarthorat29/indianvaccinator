import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './common/user-data/user-data.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent
  },
  {
    path: 'user-data',
    component: UserDataComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: '**',
    redirectTo: 'pageNotFound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
