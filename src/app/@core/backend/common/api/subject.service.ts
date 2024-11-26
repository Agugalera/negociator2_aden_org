import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from '../../../interfaces/common/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectApi {

  private readonly apiController: string = 'subject';

  constructor(private api: HttpService) { }

  list(): Observable<any[]> {
    return this.api.get(this.apiController);
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  getSubjectByTeacher(id: number): Observable<any> {
    return this.api.get('adm/subject/id/' + id).pipe(
      map(data => {
        try {
          return data.map(element => {
            const subject: Subject = {} as Subject;
            subject.id_sis = element.id_curso;
            subject.name = element.nombre;
            subject.abbreviation = element.abreviatura_Curso;
            return subject;
          });
        } catch {
          return null;
        }
      }),
    );
  }
}
