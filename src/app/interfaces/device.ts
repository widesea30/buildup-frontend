export interface Device {
  id: number;
  device_name: string;
  device_type: string;
  radio_status: number;
  battery_status: number;
  date_updated: string;
  floorName: number;
  floor: string;
  position: string;
  date_added: string;
}

export const Device_Types = [ 'Clog Detector', 'Water Detector Industrial', 'Water Detector'];