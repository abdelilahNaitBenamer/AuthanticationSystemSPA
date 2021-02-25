import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MeComponent } from './components/me/me.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterAuthGuard } from './guards/after-auth.guard';

const routes: Routes = [
  { path:"", component:HomeComponent, canActivate: [AuthGuard]},
  { path:"home", component:HomeComponent, canActivate: [AuthGuard]},
  { path:"register", component:RegisterComponent, canActivate: [AfterAuthGuard]},
  { path:"login", component:LoginComponent, canActivate: [AfterAuthGuard]},
  { path:"me", component:MeComponent, canActivate: [AuthGuard]},
  { path:"emailconfirmation", component:UserConfirmationComponent},
  { path:"forgetpassword", component:ForgetpasswordComponent},
  { path:"resetpassword", component:ResetpasswordComponent},
  { path:"**", component:NotfoundComponent} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
