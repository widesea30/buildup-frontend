import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'events',
    component: EventListComponent
  },
  {
    path: 'events/:id',
    component: EventListComponent
  },
  {
    path: 'devices',
    component: DeviceListComponent
  },
  {
    path: 'device/:id/:name',
    component: DeviceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
