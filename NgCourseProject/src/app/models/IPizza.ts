import { IPhoto } from './IPhoto';
import { IPizzaType } from './IPizzaType';

export interface IPizza {
  objectId?: string;
  _id?: string;
  name: string;
  weight: number;
  description: string;
  photo: IPhoto;
  types: IPizzaType[];
  onSale: boolean;
}
