import { Component, OnInit, TemplateRef, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main/main.service';
import { Event, Event_type } from '../../interfaces/event';
import { getTimeString, formatTimeString } from '../../core/helpers/helper';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  event_id: number;

  events: Array<Event> = [];
  event: Event = null;

  loading = false;
  
  @ViewChild('tplContent') private tplContent: TemplateRef<any>;
  constructor(private mainService: MainService, private modal: NzModalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event_id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getEvents();
  }

  showInitModal(evt: Event) {
    setTimeout(() => {
      this.createTplModal(this.tplContent, evt, false)
    }, 1000)
    
  }

  getEvents(): void {
    this.loading = true;
    this.mainService.getEvents().subscribe((res: any) => {
      if (res) {
        this.events = res.read;
        this.events.forEach(evt => {
          evt.eventCreatedDate1 = formatTimeString(evt.eventCreatedDate);
          evt.eventCreatedDate = getTimeString(evt.eventCreatedDate);
        });
        
        if (res.unread) {
          let evt = res.unread;
          evt.eventCreatedDate1 = formatTimeString(evt.eventCreatedDate);
          evt.eventCreatedDate = getTimeString(evt.eventCreatedDate);
          this.event = evt;
        }

        if (this.event_id) {
          let evts = this.events;
          evts.push(this.event);
          let evt = evts.filter(el => el.id === this.event_id);
          if (evt.length > 0)
            this.showInitModal(evt[0]);
        }
      }
      this.loading = false;
    }, (err: any) => { this.loading = false; });
  }

  getWarnImg(evt: Event, tp: Number) {
    let warnImg = '';
    if (evt.eventDescription === Event_type.clog_warn) {
      warnImg = 'clog';
    } else if (evt.eventDescription === Event_type.water_leak) {
      if (tp === 0)
        warnImg = 'water-drop-white';
      else
        warnImg = 'water-drop-black';
    } else if (evt.eventDescription === Event_type.low_battery) {
      warnImg = 'low-battery';
    }
    return warnImg;
  }

  createTplModal(tplContent: TemplateRef<{}>, evt: Event, read: Boolean): void {
    this.modal.create({
      nzStyle: {bottom: 0, position: 'absolute', maxWidth: '100vw', marginBottom: 0},
      nzTitle: null,
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: true,
      nzClosable: false,
      nzComponentParams: {
        value: evt
      }
    });

    if (!read) this.mainService.updateEventRead(evt.id).subscribe((res: any) => {});
  }

  destroyModal(): void {
    this.modal.closeAll();
  }

  goDeviceDetail(id, name) {
    this.destroyModal();
    this.router.navigate(['/device/', id, name]);
  }
}
