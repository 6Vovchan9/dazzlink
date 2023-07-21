import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  public post: Post;
  private pSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsServise: PostsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.post = data.data;
      }
    ); // Отписываться от роутов не нужно, ангуляр это делает самостоятельно

    // this.route.params
    //   .pipe(
    //     switchMap(
    //       (params: Params) => {
    //         return this.postsServise.getById(params['id'])
    //       }
    //     )
    //   )
    //   .subscribe(
    //     (post: Post) => {
    //       console.log(post)
    //     }
    //   ); // Если бы не ресолвер то можно было таким образом получить конкретный пост
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}
