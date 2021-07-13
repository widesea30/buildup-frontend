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

export interface DeviceInfo {
  id: number;
  devEUI: string;
  buildingFloorArea: string;
  deviceMACAddress: string;
  deviceApplicationKey: string;
  deviceGatewayEUI: string;
  deviceSerialNumber: string;
  deviceBattery: number;
  deviceRadio: number;
  deviceAssetNumber: string;
  deviceLatitude: number;
  deviceLongitude: number;
  deviceAltitude: number;
  devicePicture: string;
  deviceModel: string;
}

export const Device_Types = [ 'Clog Detector', 'Water Detector Industrial', 'Water Detector'];