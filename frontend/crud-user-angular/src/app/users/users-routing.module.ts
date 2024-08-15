import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserByIdComponent} from './user-by-id/user-by-id.component';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: ':id', component: UserByIdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
