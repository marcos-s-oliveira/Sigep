import { ChamadaComponent } from './layout/chamada/chamada.component';
import { AuthGuard } from './account/shared/auth.guard';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { ClassesComponent } from './layout/classes/classes.component';
import { ProfessoresComponent } from './layout/professores/professores.component';
import { AlunosComponent } from './layout/alunos/alunos.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'alunos', component: AlunosComponent,
      },
      {
        path: 'professores', component: ProfessoresComponent,
      },
      {
        path: 'classes', component: ClassesComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'chamada',
    component: ChamadaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
