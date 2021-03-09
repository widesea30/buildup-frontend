export interface Device {
  id: number;
  device_name: string;
  device_type: string;
  radio_status: boolean;
  battery_status: boolean;
  date_updated: string;
  floor: number;
  position: string;
  date_added: string;
}

export const Device_Types = [ 'Clog Detector', 'Water Detector Industrial', 'Water Detector'];