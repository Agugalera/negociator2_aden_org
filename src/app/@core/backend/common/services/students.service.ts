import { Injectable } from '@angular/core';
import { StudentsApi } from '../api/students.api';
import { Observable } from 'rxjs';
import { StudentData, Student } from '../../../interfaces/common/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends StudentData {
  constructor(private api: StudentsApi) {
    super();
  }

  list(): Observable<Student[]> {
    return this.api.list();
  }

  get(id: number): Observable<Student> {
    return this.api.get(id);
  }

  getBySubject(idSubject): Observable<Student[]> {
    return this.api.getBySubject(idSubject);
  }

  getBySubjectAden(idSubject): Observable<Student[]> {
    return this.api.getBySubjectAden(idSubject);
  }

}
