import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main/main.service';
import { Device, DeviceInfo } from '../../interfaces/device';
import { getTimeString } from '../../core/helpers/helper';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  device_id: number;
  device_name: string;
  device: Device = null;
  device_info: DeviceInfo = null;

  unread: boolean = false;
  events = [];
  loading = false;

  tabNum: number = 0;

  valve_open = false;

  constructor(private mainService: MainService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.device_id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.device_name = this.route.snapshot.paramMap.get("name");
    this.getDetails();
  }

  getDetails() {
    this.loading = true;
    this.mainService.getDeviceEvents(this.device_id).subscribe((res: any) => {
      if (res) {
        this.device = res.device;
        this.device.date_updated = getTimeString(this.device.date_updated);
        this.device.date_added = getTimeString(this.device.date_added);

        this.device_info = res.device_info;

        this.unread = res.unread;

        this.events = res.events;
        this.events.forEach(evt => {
          evt.eventCreatedDate = getTimeString(evt.eventCreatedDate);
        });
        this.events.push({eventDescription: 'Device added', eventCreatedDate: this.device.date_added});
      }
      this.loading = false;
    }, (err: any) => { this.loading = false; });
  }

  onChnageValve($event) {
    this.valve_open = $event;    
    let command = this.valve_open? 'OPEN':'CLOSE';

    this.mainService.handleValve(this.device_id, command).subscribe((res: any) => {
    }, (err: any) => { });
  }
}
