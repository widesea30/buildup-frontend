import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';


@NgModule({
  declarations: [HomeComponent, EventListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NzIconModule,
    NzBadgeModule,
    NzButtonModule
  ]
})
export class PagesModule { }
