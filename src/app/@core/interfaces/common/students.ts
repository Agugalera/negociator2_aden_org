import { Observable } from 'rxjs';

export interface Student {
  id: string;
  id_sis: string;
  name: string;
  state: string;
  id_student: string;
  id_group: string;
  firstname: string;
  lastname: string;
  email: string;
  id_profile: string;
  sisid?: string;
}

export abstract class StudentData {
  abstract list(): Observable<Student[]>;
  abstract get(id: number): Observable<Student>;
  abstract getBySubject(id: number): Observable<Student[]>;
}