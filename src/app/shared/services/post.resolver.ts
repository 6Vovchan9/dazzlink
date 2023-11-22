import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Post } from "../interfaces";
import { PostsService } from "./posts.service";

@Injectable({ providedIn: 'root' })
export class PostResolver {
    constructor(private postsService: PostsService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
        return this.postsService.getById(route.params?.['id'])
            .pipe(
                catchError(() => {
                    console.log('catchError in PostResolver');
                    this.router.navigate(['/admin', 'dashboard']);
                    return EMPTY;
                })
            )
    }
}