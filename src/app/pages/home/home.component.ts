import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
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
  building: any;
  event:Event = null;

  event_type = Event_type;
  
  warnImg = '';

  loading = false;

  showUpdate = false;
  
  constructor(private mainService: MainService, private router: Router, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    this.loading = true;
    this.mainService.getDetail().subscribe((res: any) => {
      if (res) {
        console.log(res);
        
        this.users = res.users;
        this.devices = res.devices;
        this.equipments = res.equipments;
        this.building = res.building;
        if (res.unread_event) {
          let evt = res.unread_event;
          evt.eventCreatedDate1 = formatTimeString(evt.eventCreatedDate);
          evt.eventCreatedDate = getTimeString(evt.eventCreatedDate);
          this.event = evt;

          if (this.event.eventDescription === Event_type.clog_warn) {
            this.warnImg = 'clog';
          } else if (this.event.eventDescription === Event_type.water_leak) {
            this.warnImg = 'water-drop';
          } else if (this.event.eventDescription === Event_type.low_battery) {
            this.warnImg = 'low-battery';
          }
        }
      }

      this.loading = false;
    }, (err: any) => { this.loading = false; });
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.modal.create({
      nzStyle: {bottom: 0, position: 'absolute', maxWidth: '100vw', marginBottom: 0},
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

  goDeviceDetail(id, name) {
    this.destroyModal();
    this.router.navigate(['/device/', id, name]);
  }
}
