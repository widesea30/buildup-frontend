import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { MainService } from '../../services/main/main.service';
import { Event, Event_type } from '../../interfaces/event';
import { getTimeString, formatTimeString } from '../../core/helpers/helper';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Array<Event> = [];
  event: Event = null;

  loading = false;

  constructor(private mainService: MainService, private modal: NzModalService, private router: Router) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.loading = true;
    this.mainService.getEvents().subscribe((res: any) => {
      if (res) {
        this.events = res.read;
        this.events.forEach(evt => {
          evt.date_occurred1 = formatTimeString(evt.date_occurred);
          evt.date_occurred = getTimeString(evt.date_occurred);
        });
        if (res.unread) {
          let evt = res.unread;
          evt.date_occurred1 = formatTimeString(evt.date_occurred);
          evt.date_occurred = getTimeString(evt.date_occurred);
          this.event = evt;
        }
      }
      this.loading = false;
    }, (err: any) => { this.loading = false; });
  }

  getWarnImg(evt: Event, tp: Number) {
    let warnImg = '';
    if (evt.event_type === Event_type.clog_warn) {
      warnImg = 'clog';
    } else if (evt.event_type === Event_type.water_leak) {
      if (tp === 0)
        warnImg = 'water-drop-white';
      else
        warnImg = 'water-drop-black';
    } else if (evt.event_type === Event_type.low_battery) {
      warnImg = 'low-battery';
    }
    return warnImg;
  }

  createTplModal(tplContent: TemplateRef<{}>, evt: Event): void {
    this.modal.create({
      nzTitle: null,
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: true,
      nzClosable: false,
      nzComponentParams: {
        value: evt
      }
    });
  }

  destroyModal(): void {
    this.modal.closeAll();
  }

  goDeviceDetail(id, name) {
    this.router.navigate(['/device/', id, name]);
  }
}
