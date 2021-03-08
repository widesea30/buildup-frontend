import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MainService } from '../../services/main/main.service';
import { Device, Device_Types } from '../../interfaces/device';
import { getTimeString } from '../../core/helpers/helper';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})

export class DeviceListComponent implements OnInit {
  devices: Array<Device> = [];

  loading = false;

  search = false;
  searchedDevices: Array<Device> = [];

  device_types = Device_Types;
  deviceFilters = [];
  floorFilters = [];
  filteredDevices: Array<Device> = [];

  constructor(private mainService: MainService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.loading = true;
    this.mainService.getDevices().subscribe((res: any) => {
      if (res) {
        this.devices = res.devices;
        this.devices.forEach(evt => {
          evt.date_updated = getTimeString(evt.date_updated);
        });
        this.filterDevices();
      }
      this.loading = false;
    }, (err: any) => { this.loading = false; });
  }

  openSearch() {
    this.searchedDevices = [];
    this.search = true;
  }

  searchChanged(val) {
    if (val) {
      let search_val = val.toLowerCase();
      this.searchedDevices = this.devices.filter(el => 
        el.device_name.toLowerCase().includes(search_val) 
        || el.device_type.toLowerCase().includes(search_val)
        || (el.floor + "th - " + el.position).toLowerCase().includes(search_val)
      );
    } else {
      this.searchedDevices = [];
    }
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.modal.create({
      nzTitle: null,
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: true,
      nzClosable: false
    });
  }

  destroyModal(): void {
    this.deviceFilters = [];
    this.floorFilters = [];
    this.filterDevices();
    this.modal.closeAll();
  }

  showResults() {
    this.filterDevices();
    this.modal.closeAll();
  }

  selectType(dt) {
    let idx = this.deviceFilters.indexOf(dt);
    if (idx > -1) {
      this.deviceFilters.splice(idx, 1);
    } else {
      this.deviceFilters.push(dt);
    }
  }

  removeType(dt) {
    let idx = this.deviceFilters.indexOf(dt);
    if (idx > -1) {
      this.deviceFilters.splice(idx, 1);
      this.filterDevices();
    }
  }

  selectFloor(fl) {
    let idx = this.floorFilters.indexOf(fl);
    if (idx > -1) {
      this.floorFilters.splice(idx, 1);
    } else {
      this.floorFilters.push(fl);
    }
  }

  floorRemove(fl) {
    let idx = this.floorFilters.indexOf(fl);
    if (idx > -1) {
      this.floorFilters.splice(idx, 1);
      this.filterDevices();
    }
  }

  filterDevices() {
    if (this.deviceFilters.length == 0 && this.floorFilters.length == 0) this.filteredDevices = this.devices;
    else 
      this.filteredDevices = this.devices.filter(el => {
        let res = false;
        this.deviceFilters.forEach(element => {
          if (el.device_type == element) res = true;
        });
        this.floorFilters.forEach(element => {
          if (el.floor == element) res = true;
        });
        return res;
      });
  }
}
