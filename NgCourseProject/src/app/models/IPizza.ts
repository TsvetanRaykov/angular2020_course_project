import { IPhoto } from './IPhoto';
import { IPizzaType } from './IPizzaType';

export interface IPizza {
  objectId?: string;
  name: string;
  weight: number;
  description: string;
  photo: IPhoto;
  types: IPizzaType[];
  onSale: boolean;
}
