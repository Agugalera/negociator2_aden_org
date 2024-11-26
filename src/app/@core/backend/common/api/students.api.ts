import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsApi {

  private readonly apiController: string = 'adm/student';

  constructor(private api: HttpService) { }

  list(): Observable<any[]> {
    return this.api.get(this.apiController);
  }

  getBySubject(idSubjet: number): Observable<any[]> {
    return this.api.get(`${this.apiController}/subject/${idSubjet}`);
  }

  getBySubjectAden(idSis: number): Observable<any[]> {
    return this.api.get(`${this.apiController}/id/${idSis}`);
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

}
