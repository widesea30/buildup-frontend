import { Injectable } from '@angular/core';
import { ServiceUtils } from '../serviceUtils';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private serviceUtils: ServiceUtils) { }

  public getDetail() {
    return this.serviceUtils.ApiGET('auth/details/');
  }

  public getEvents() {
    return this.serviceUtils.ApiGET('event/');
  }

  public updateEventRead(event_id) {
    return this.serviceUtils.ApiPOST('event/update/', { event_id: event_id });
  }

  public getDevices() {
    return this.serviceUtils.ApiGET('device/');
  }
}
