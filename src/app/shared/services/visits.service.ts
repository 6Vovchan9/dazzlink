import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { delay, map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { VisitsAmount } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class VisitsService {

    constructor(private http: HttpClient) { }

    getAmountOfVisits(): Observable<VisitsAmount> {
        return this.http.get<VisitsAmount>(`${environment.fbDbUrl}/visits.json`);
    }
}