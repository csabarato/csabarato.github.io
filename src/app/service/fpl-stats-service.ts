import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DataTableModel} from "../model/data-table.model";



@Injectable({providedIn: "root"})
export class FplStatsService {

  private picksReqUrl = 'https://csarato.pythonanywhere.com'
  constructor(private http: HttpClient) {}
  getDataTable(): Observable<DataTableModel> {
    return this.http.get(this.picksReqUrl)
      .pipe(
        map((result) => JSON.parse(JSON.stringify(result)) as DataTableModel),
      )
  }
}
