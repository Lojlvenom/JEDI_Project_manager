import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';

const routes: Routes = [
  {path:'', redirectTo:'list-projects', pathMatch: 'full'},
  {path:'list-projects', component:ListProjectsComponent},
  {path:'modify-project/:id', component:CreateProjectComponent},
  {path:'create-project', component:CreateProjectComponent},
  {path:'**', redirectTo:'list-projects', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
