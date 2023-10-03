import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Post, RovraggeRespWrapper } from "../interfaces";
import { PagesService } from "@app/shared/services/pages.service";

@Injectable({ providedIn: 'root' })
export class PostsService {

    constructor(
        private http: HttpClient,
        private pagesService: PagesService
    ) { }

    create(post: Post): Observable<Post> {
        return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post);
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`, { headers: { 'accept-language': this.pagesService.currentLanguage.getValue() } })
            .pipe(
                delay(2000),
                map((post: Post) => {
                    // console.log(post);
                    if (post) {
                        return {
                            ...post,
                            id,
                            published: new Date(post?.published)
                        } as Post;
                    } else {
                        throw new Error('Post not found');
                    }
                })
            )
    }

    public getByIdRovragge(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.rovraggeUrl}/publication/${id}`, { headers: { 'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase() } })
            .pipe(
                map((resp: { [key: string]: any }) => resp.data)
            )
    }

    public setArticleEvaluation(id: string): Observable<RovraggeRespWrapper> {
        return this.http.patch<RovraggeRespWrapper>(`${environment.rovraggeUrl}/publication/${id}/read`, null);
    }

    public setArticleVoting(id: string, choice: 'like' | 'dislike'): Observable<RovraggeRespWrapper> {
        return this.http.patch<RovraggeRespWrapper>(`${environment.rovraggeUrl}/publication/${id}/${choice}`, null)
            .pipe(
                map((resp: { [key: string]: any }) => resp.data)
            )
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
            .pipe(
                delay(2000)
            )
    }

    getAll(): Observable<Post[]> {

        const options = {
            headers: new HttpHeaders({ 'x-accept-language': this.pagesService.currentLanguage.getValue() || 'RU' })
        };

        return this.http.get(`${environment.fbDbUrl}/posts.json`, { headers: { 'x-accept-language': this.pagesService.currentLanguage.getValue() } })
            .pipe(
                delay(2000),
                map((resp: { [key: string]: any }) => {
                    if (resp) {
                        return Object.keys(resp)
                            .map(key => {
                                return {
                                    ...resp[key],
                                    id: key,
                                    published: new Date(resp[key].published)
                                }
                            });
                    } else {
                        return [];
                    }
                })
            )
    }

    public getAllRovragge(): Observable<Post[]> {
        return this.http.get(`${environment.rovraggeUrl}/publication`, { headers: { 'accept-language': this.pagesService.currentLanguage.getValue().toLowerCase() } })
            .pipe(
                map((resp: RovraggeRespWrapper) => {
                    return resp.data;
                })
            )
    }
}