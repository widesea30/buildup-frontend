export interface Event {
  id: number;
  date_occurred: string;
  date_occurred1: string;
  event_type: string;
  device_name: string;
  floor: number;
  position: string;
}

export const Event_type = {
  clog_warn: 'Clog Warning',
  water_leak: 'Water leak detected',
  low_battery: 'Low battery'
}
