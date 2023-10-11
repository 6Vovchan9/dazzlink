import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Place, Post, RovraggeRespWrapper } from "../interfaces";
import { PagesService } from "@app/shared/services/pages.service";

@Injectable({ providedIn: 'root' })
export class LocationsService {

    constructor(
        private http: HttpClient,
        private pagesService: PagesService
    ) { }

    getAllLocations(): Observable<Place[]> {

        const options = {
            headers: new HttpHeaders({ 'x-accept-language': this.pagesService.currentLanguage.getValue() || 'RU' })
        };

        return this.http.get<Place[]>(`${environment.fbDbUrl}/locations.json`, { headers: { 'x-accept-language': this.pagesService.currentLanguage.getValue() } })
            .pipe(
                delay(2000),
                map((resp: { [key: string]: any }) => {
                    if (resp) {
                        return Object.keys(resp)
                            .map(key => {
                                return {
                                    ...resp[key],
                                    id: key,
                                }
                            });
                    } else {
                        return [];
                    }
                })
            )
    }

    create(location: Place): Observable<Place> {
        return this.http.post<Place>(`${environment.fbDbUrl}/locations.json`, location);
    }
}