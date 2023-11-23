export type Building = {
  address: string;
  close_time: string;
  floors: number;
  id: number;
  name: string;
  open_time: string;
};

export type Room = {
  id: number;
  identifier: string;
  capacity: CapacityFromNumber;
  size?: number;
  tv: boolean;
  projector: boolean;
  whiteboard: boolean;
  computers: boolean;
  building: Building;
};

type CapacityFromNumber = {
  min: 1;
  max: number;
} & Capacity;

export type Capacity = {
  min: number;
  max: number | null;
};
