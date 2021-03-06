import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MainService } from '../../services/main/main.service';
import { Event, Event_type } from '../../interfaces/event';
import { getTimeString, formatTimeString } from '../../core/helpers/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users = 0;
  devices = 0;
  equipments = 0;
  building = '';
  location = '';
  event:Event = null;

  warnImg = '';

  loading = false;

  showUpdate = false;
  
  constructor(private mainService: MainService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    this.loading = true;
    this.mainService.getDetail().subscribe((res: any) => {
      if (res) {
        this.users = res.users;
        this.devices = res.devices;
        this.equipments = res.equipments;
        this.building = res.building;
        this.location = res.location; 
        if (res.unread_event) {
          let evt = res.unread_event;
          evt.date_occurred1 = formatTimeString(evt.date_occurred);
          evt.date_occurred = getTimeString(evt.date_occurred);
          this.event = evt;

          if (this.event.event_type === Event_type.clog_warn) {
            this.warnImg = 'clog';
          } else if (this.event.event_type === Event_type.water_leak) {
            this.warnImg = 'water-drop';
          } else if (this.event.event_type === Event_type.low_battery) {
            this.warnImg = 'low-battery';
          }
        }
      }

      this.loading = false;
    }, (err: any) => { this.loading = false; });
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.modal.create({
      nzTitle: null,
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: true,
      nzClosable: false,
      nzOkDisabled: true
    });

    this.mainService.updateEventRead(this.event.id).subscribe((res: any) => {});
  }

  destroyModal(): void {
    this.modal.closeAll();
  }

  showUpdateform(): void {
    this.showUpdate = true;
  }

  update(): void {
    this.showUpdate = false;
    this.getDetail();
  }

  cancel(): void {
    this.showUpdate = false;
  }
}
