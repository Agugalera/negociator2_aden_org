import { Observable } from 'rxjs';

export interface Company {
  id: number;
  name: string;
  logo: string;
  welcome: string;
  aboutOther: string;
  aboutMe: string;
  market: string;
  robots: string;
  negotiation: string;
}

export abstract class CompaniesData {
  abstract list(): Observable<Company[]>;
  abstract get(id: number): Observable<Company>;
  abstract get(id: number): Observable<Company>;
  abstract update(company: Company): Observable<Company>;
}