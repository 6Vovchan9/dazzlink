import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Place, Post, RovraggeRespLocationsData, RovraggeRespWrapper } from "../interfaces";
import { PagesService } from "@app/shared/services/pages.service";

@Injectable({ providedIn: 'root' })
export class LocationsService {

    constructor(
        private http: HttpClient,
        private pagesService: PagesService
    ) { }

    getAllLocations(): Observable<RovraggeRespLocationsData> {

        const options = {
            headers: new HttpHeaders({ 'x-accept-language': this.pagesService.currentLanguage.getValue() || 'RU' })
        };

        return this.http.get(
            `${environment.rovraggePlacesUrl}/place`,
            {
                headers: { 'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase() },
                params: { categoryCode: 'RESTAURANTS' }
            }
        )
            .pipe(
                map((resp: RovraggeRespWrapper) => {
                    return resp.data;
                })
            )
    }

    create(location: Place): Observable<Place> {
        return this.http.post<Place>(`${environment.fbDbUrl}/locations.json`, location);
    }
}