import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { ServerDataSource } from "ng2-smart-table";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

@Injectable()
export class UserHttpService {
  get apiUrl(): string {
    return environment.userApiUrl;
  }

  constructor(private http: HttpClient) {}

  getServerDataSource(uri: string): DataSource {
    return new ServerDataSource(this.http, {
      endPoint: uri,
      totalKey: "totalCount",
      dataKey: "items",
      pagerPageKey: "pageNumber",
      pagerLimitKey: "pageSize",
      filterFieldKey: "filterBy#field#",
      sortFieldKey: "sortBy",
      sortDirKey: "orderBy",
    });
  }

  get(endpoint: string, options?): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options);
  }

  post(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options);
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options);
  }

  patch(endpoint: string, data, options?): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options);
  }
}
