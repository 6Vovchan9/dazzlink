import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class GoogleTranslationService {

    constructor(
        private http: HttpClient,
    ) { }

    translate(lang: string, text: Array<string>): Observable<any> {
        return this.http.post(`https://translation.googleapis.com/language/translate/v2?key=${environment.apiKey}`, {
            q: text,
            target: lang
        })
    }
}