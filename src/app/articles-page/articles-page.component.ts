import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {

  public posts$: Observable<Post[]>;
  public searchStr = '';
  public isLoading = true;

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll()
      .pipe(
        tap(val => {
          // console.log(val);
          this.isLoading = false;
        })
      )
  }

  goToPostPage(postId) {
    this.router.navigate([ '/post', postId ]).then(
      (success: boolean) => {
        // console.log(success)
      }
    )
  }

}
