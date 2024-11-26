import { Injectable } from '@angular/core';
import { SubjectApi } from '../api/subject.service';
import { SubjectData, Subject } from '../../../interfaces/common/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService  extends SubjectData {
  constructor(private api: SubjectApi) {
    super();
  }

  list(): Observable<Subject[]> {
    return this.api.list();
  }

  get(id: number): Observable<Subject> {
    return this.api.get(id);
  }

  getSubjecstByTeacher(id: number): Observable<Subject[]> {
    return this.api.getSubjectByTeacher(id);
  }


}
