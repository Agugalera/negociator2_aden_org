import { Observable } from 'rxjs';
import { Replies } from './reply';

export interface Negotations {
  color_a: string;
  color_b: string;
  id: number;
  max: string;
  min: string;
  okvalue_a: string;
  okvalue_b: string;
  reply: Replies;
  reply_a: string;
  reply_b: string;
  required: string;
  section: string;
  type: string;
  unit: string;
  value: string;
  valueReply: string | boolean;
  state: string;
}


export interface NegotationsResponse {
  id_group_author: string;
  id_user_author: string;
  creation_date: string;
  message: string;
  teacher_return: string;
  return_date: string;
  readed: string;
  phase:  any;
  state: any;
  reply: Replies[];
}


export abstract class NegotationsData {
  abstract list(): Observable<Negotations[]>;
  abstract get(id: number): Promise<Negotations>;
  abstract update(variable: Negotations): Observable<Negotations>;
}
