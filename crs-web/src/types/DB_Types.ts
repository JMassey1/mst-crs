export type Building = {
  address: string;
  longitude: number;
  latitude: number;
  close_time: string;
  floors: number;
  id: number;
  name: string;
  open_time: string;
};

export type Room = {
  id: number;
  identifier: string;
  capacity: number;
  size?: number;
  tv: boolean;
  projector: boolean;
  whiteboard: boolean;
  computers: boolean;
  building: Building;
  floor: string;
};

export type Capacity = {
  min: number;
  max?: number;
};
