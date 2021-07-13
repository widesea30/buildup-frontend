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

  public updateEventRead(event_id: number) {
    return this.serviceUtils.ApiPOST('event/update/', { event_id: event_id });
  }

  public getDevices() {
    return this.serviceUtils.ApiGET('device/');
  }

  public getDeviceEvents(id: number) {
    return this.serviceUtils.ApiGET('event/device/' + id);
  }

  public addWebtoken(token: string) {
    return this.serviceUtils.ApiPOST('auth/addwebtoken/', {token});
  }

  public getDeviceInfo(device_id: number) {
    return this.serviceUtils.ApiPOST('device/get_device_detail/', {device_id});
  }

  public handleValve(device_id: number, command: string) {
    return this.serviceUtils.ApiPOST('device/handle_valve/', {device_id, command});
  }
}
