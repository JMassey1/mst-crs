export type Building = {
  address: string;
  close_time: string;
  floors: number;
  id: number;
  name: string;
  open_time: string;
};

export type Capacity = {
  min: number;
  max: number | null;
};
