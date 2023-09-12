import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '@app/shared/interfaces';
import { PostsService } from '@app/shared/services/posts.service';
import { Router } from '@angular/router';
import { PagesService } from '@app/shared/services/pages.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit, OnDestroy {

  public posts$: Observable<Post[]>;
  public searchStr = '';
  public isLoading = true;
  private lSub: Subscription;

  constructor(
    private postsService: PostsService,
    private pagesService: PagesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.lSub = this.pagesService.currentLanguage.subscribe(
      () => {
        if (!this.isLoading) {
          this.getAllArticles();
        }
      }
    );

    this.getAllArticles();
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    return navigator.userAgent.includes('Dazzlink');
  }

  private getAllArticles(): void {
    this.isLoading = true;
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

  public checkViewedOrNot(id: string): boolean {
    const articlesFromLS = JSON.parse(localStorage.getItem('articlesEvaluation'));
    if (articlesFromLS?.length) {
      return articlesFromLS.find(about => about.articleId === id);
    } else {
      return false;
    }
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
