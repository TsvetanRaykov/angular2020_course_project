import { IPhoto } from './IPhoto';

export interface IPizza {
  objectId?: string;
  name: string;
  weight: number;
  description: string;
  photo: IPhoto;
}
