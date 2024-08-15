import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import { UserByIdComponent } from './user-by-id/user-by-id.component';

@NgModule({
  declarations: [UsersComponent, UserByIdComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        TableModule,
        InputTextModule,
        PaginatorModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        ReactiveFormsModule,
        PanelModule
    ]
})
export class UsersModule { }
