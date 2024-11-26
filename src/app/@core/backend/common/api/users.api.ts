import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";
import { UserHttpService } from "./user-http.service";
import { HttpService } from "./http.service";

@Injectable()
export class UsersApi {
  private readonly apiController: string = "users";

  constructor(private userApi: UserHttpService, private api: HttpService) {}

  get usersDataSource(): DataSource {
    return this.userApi.getServerDataSource(
      `${this.userApi.apiUrl}/${this.apiController}`
    );
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set("offset", `${pageNumber}`)
      .set("limit", `${pageSize}`);

    return this.userApi.get(this.apiController, { params }).pipe(
      map((data) =>
        data[0].map((item) => {
          const picture = `${this.userApi.apiUrl}/${this.apiController}/${item.id}/photo`;
          return { ...item, picture };
        })
      )
    );
  }

  getCurrent(): Observable<any> {
    return this.userApi.get("currents").pipe(
      map((data) => {
        const picture = `${this.userApi.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      })
    );
  }

  get(id: number): Observable<any> {
    return this.userApi.get(`${this.apiController}/${id}`).pipe(
      map((data) => {
        //const picture = `${this.userApi.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data };
      })
    );
  }

  getAll(profile = "student", search = ""): Observable<any[]> {
    let params;

    if (search !== "" && search !== null) {
      params = new HttpParams()
        .set("search", search)
        .set("profile", `${profile}`);
    } else {
      params = new HttpParams().set("profile", `${profile}`);
    }

    return this.userApi.get(this.apiController, { params }).pipe(
      map((data) =>
        data.map((item) => {
          const picture = `${this.userApi.apiUrl}/${this.apiController}/${item.id}/photo`;
          return { ...item, picture };
        })
      )
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.userApi.get(this.apiController).pipe(
      map((data) =>
        data[0].map((item) => {
          const picture = `${this.userApi.apiUrl}/${this.apiController}/${item.id}/photo`;
          return { ...item, picture };
        })
      )
    );
  }

  delete(id: number): Observable<boolean> {
    return this.userApi.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.userApi.post(this.apiController, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.userApi.patch(`${this.apiController}/currents`, item);
  }

  update(id: number, item: any): Observable<any> {
    return this.userApi.patch(`${this.apiController}/${id}`, item);
  }

  sendEmail(item: any): Observable<any> {
    return this.userApi.post(`emails`, item);
  }
}
