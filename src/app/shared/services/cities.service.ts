import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import {
    RovraggeRespWrapper,
    CountryFilterItem
} from "../interfaces";
import { PagesService } from "@app/shared/services/pages.service";

@Injectable({ providedIn: 'root' })
export class CitiesService {

    constructor(
        private readonly http: HttpClient,
        private pagesService: PagesService
    ) { }

    public getCities(categoryCode = 'RESTAURANTS'): Observable<Array<CountryFilterItem>> {
        
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
}