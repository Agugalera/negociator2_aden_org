

import { Observable } from 'rxjs';
import { Settings } from './settings';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface User {
  id: number;
  role: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  login: string;
  picture: string;
  address: Address;
  settings: Settings;
  sisid: number;
  id_profile: number;
  state?: string | number;
  user: {
    id_profile: number;
  };
  //TODO mejorar este tema
  blocks?: any;

}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;
  abstract getCurrentUser(): Observable<User>;
  abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
  abstract get(id: number): Observable<User>;
  abstract update(id:number, user: User): Observable<User>;
  abstract updateCurrent(user: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
