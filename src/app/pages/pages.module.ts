import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { ToggleButtonComponent } from './components/toggle-button.component';


@NgModule({
  declarations: [
    HomeComponent, 
    EventListComponent, 
    DeviceListComponent, 
    DeviceDetailComponent, 
    ToggleButtonComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NzIconModule,
    NzBadgeModule,
    NzButtonModule,
    NzModalModule,
    NzTabsModule,
  ],
  exports: [
    EventListComponent
  ]
})
export class PagesModule { }
