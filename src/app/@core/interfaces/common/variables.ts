import { Observable } from 'rxjs';

export interface Variables {
  id: number;
  value: any;
  max: string;
  min: string;
  name: string;
  boolean: string;
  color_a: string;
  color_b: string;
  id_company: number;
  company_name?: string;
  color_name: string;
  reply_a: string;
  reply_b: string;
  colorReply: string;
  valueReply?: any;
  id_variable?: string;
  sharedReply?: any;
  section?: string;
  type: string;
  unit: string;
  okvalue_a?: string;
  okvalue_b?: string;
  state: string;
  required: string;
  lastUpdate?: any;
}

export abstract class VariablesData {
  abstract list(type): Observable<Variables[]>;
  abstract getByCompany(companyId): Observable<Variables[]>;
  abstract get(id: number): Promise<Variables>;
  abstract update(variable: Variables): Observable<Variables>;
}