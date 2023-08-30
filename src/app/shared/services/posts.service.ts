import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { delay, map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Post } from "../interfaces";

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) { }

    create(post: Post): Observable<Post> {
        return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post);
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
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

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
            .pipe(
                delay(2000)
            )
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
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
}