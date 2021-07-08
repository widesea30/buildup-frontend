export interface Event {
  id: number;
  eventCreatedDate: string;
  eventCreatedDate1: string;
  eventResolvedDate: string;
  eventDescription: string;
  device_id: number;
  device_name: string;
  device_type: string;
  floor: number;
  position: string;
}

export const Event_type = {
  clog_warn: 'Clog Warning',
  water_leak: 'Water leak detected',
  low_battery: 'Low Battery',
  low_radio: 'Low Radio',
}
