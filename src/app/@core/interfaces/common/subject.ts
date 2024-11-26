import { Observable } from 'rxjs';

export interface Subject {
  // id: number;
  id_sis: string;
  name: string;
  abbreviation?: string;
  // state: string;
}

export abstract class SubjectData {
  abstract list(): Observable<Subject[]>;
  abstract get(id: number): Observable<Subject>;
  abstract getSubjecstByTeacher(id: number): Observable<Subject[]>;
}