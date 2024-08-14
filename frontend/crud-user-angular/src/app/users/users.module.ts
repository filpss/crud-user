import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        TableModule,
        InputTextModule
    ]
})
export class UsersModule { }
