import { Building, Capacity } from "./DB_Types";

export type DropdownOption<T> = {
  label: string;
  value: T;
};

export type ReservationData = {
  building: Building | null;
  floor: number | null;
  capacity: Capacity | null;
};
