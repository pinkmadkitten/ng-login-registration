import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {UserInfoComponent} from './components/user-info/user-info.component';
import { UserResolver } from './resolvers/user.resolver';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'info',
    component: UserInfoComponent,
    resolve: {
      user: UserResolver
    },
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolver, AuthGuardService]
})
export class AppRoutingModule {
}
