import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { DeviceListComponent } from './device-list/device-list.component';


@NgModule({
  declarations: [HomeComponent, EventListComponent, DeviceListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NzIconModule,
    NzBadgeModule,
    NzButtonModule,
    NzModalModule
  ]
})
export class PagesModule { }
