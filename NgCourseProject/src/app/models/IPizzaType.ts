import { IPizza } from '.';

export interface IPizzaType {
  size: string;
  weight: number;
  price: number;
  pizza?: IPizza;
}
