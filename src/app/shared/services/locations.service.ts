import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import {
    Place,
    Post,
    RovraggeRespLocationsData,
    RovraggeRespWrapper,
    RovraggeRespFiltersData,
    CountryFilterItem,
    IVotingService,
    ILocationCategories
} from "../interfaces";
import { PagesService } from "@app/shared/services/pages.service";

@Injectable({ providedIn: 'root' })
export class LocationsService {

    constructor(
        private readonly http: HttpClient,
        private pagesService: PagesService
    ) { }

    getAllLocations(sortVal?: string, filterVal?: string, categoryCode = 'RESTAURANTS'): Observable<RovraggeRespLocationsData> {

        const options = {
            headers: new HttpHeaders({ 'x-accept-language': this.pagesService.currentLanguage.getValue() || 'ru' })
        };

        // let queryParams = new HttpParams().appendAll({ categoryCode: 'REST', sort: sortVal });
        const customQueryParams = { categoryCode };

        if (sortVal) {
            customQueryParams['sort'] = sortVal;
        }

        if (filterVal) {
            customQueryParams['cityCode'] = filterVal;
        }

        // 'x-source-channel': dazzlink-android'
        return this.http.get(
            `${environment.placeUrl}/place`,
            {
                headers: {
                    'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase(),
                    'x-source-channel': 'dazzlink-web'
                },
                // params: queryParams
                params: customQueryParams
            }
        ).pipe(
            map((resp: RovraggeRespWrapper) => {
                return resp.data;
            })
        )
    }

    public getById(id: string): Observable<any> {
        return this.http.get<Post>(`${environment.placeUrl}/place/id/${id}`, { headers: { 'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase() } })
            .pipe(
                map((resp: { [key: string]: any }) => resp.data)
            )
    }

    public getCategoryOptions(): Observable<Array<ILocationCategories>> {
        return this.http.get(
            `${environment.placeUrl}/place/category`,
            {
                headers: {
                    'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase(),
                    'x-source-channel': 'dazzlink-web'
                },
            }
        ).pipe(
            map((resp: RovraggeRespWrapper) => resp.data)
        )
    }

    public getFilterOptions(categoryCode = 'RESTAURANTS'): Observable<Array<CountryFilterItem>> {
        
        const customQueryParams = { categoryCode };

        return this.http.get(
            `${environment.placeUrl}/place/filter/city`,
            {
                headers: {
                    'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase(),
                },
                params: customQueryParams
            }
        ).pipe(
            map((resp: RovraggeRespWrapper) => resp.data)
        )
    }

    public getSortOptions(categoryCode = 'RESTAURANTS'): Observable<Array<{ title: string, code: string }>> {

        const customQueryParams = { categoryCode };

        return this.http.get(
            `${environment.placeUrl}/place/sort`,
            {
                headers: {
                    'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase(),
                },
                params: customQueryParams
            }
        ).pipe(
            map((resp: RovraggeRespWrapper) => resp.data)
        )
    }

    public setPlaceVotingProd(id: string, choice: 'like' | 'dislike'): Observable<IVotingService> {
        return this.http.patch<RovraggeRespWrapper>(`${environment.placeUrl}/place/${id}/${choice}`, null)
            .pipe(
                map((resp: { [key: string]: any }) => resp.data)
            )
    }

    create(location: Place): Observable<Place> {
        return this.http.post<Place>(`${environment.fbDbUrl}/locations.json`, location);
    }
}