import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PostsService } from '@app/shared/services/posts.service';
import { Post } from '@app/shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public isLoading = true;
  public postData: Post;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.postsService.getById(params['id']);
          }
        )
      )
      .subscribe(
        (post: Post) => {
          this.postData = post;
          this.isLoading = false;
        }
      ); 
  }

  public goToAllArticles(): void {
    this.router.navigate([ '/articles' ])
  }

}
