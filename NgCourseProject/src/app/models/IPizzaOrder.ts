import { IPizza, IUser, IPizzaType } from '.';

export interface IPizzaOrder {
  pizza: IPizza;
  type: IPizzaType;
  user: IUser;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  size?: string;
  weight?: number;
  status: string;
  objectId?: string;
  price: number;
}
