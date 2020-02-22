import { ILocation } from '.';

export interface IUser {
  username?: string;
  password?: string;
  fullName?: string;
  phone: string;
  address: string;
  location: ILocation;
  email: string;
  userRole?: string;
  objectId?: string;
  _id: string;
}
