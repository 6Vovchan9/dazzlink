import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subscription, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Post } from '@app/shared/interfaces';
import { PostsService } from '@app/shared/services/posts.service';
import { Router } from '@angular/router';
import { PagesService } from '@app/shared/services/pages.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';

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
    public mobileDetectService: MobileDetectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log('---ArticlesPageComponent init---');
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
        }),
        catchError(err => {
          this.isLoading = false;
          return of([
            // {
            //   id: 'ferb54grv',
            //   title: 'title',
            //   text: 'text',
            //   author: 'author',
            //   published: new Date(),
            //   viewCount: 3,
            //   likeCount: 53,
            //   dislikeCount: 5,
            // }
          ]);
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

  public mobileStoreSrc(): string {
    const osDevice = this.mobileDetectService.osDevice;

    if (osDevice?.toLowerCase() === 'ios') {
      return 'assets/images/linkIOSShort.svg';
    } else if (osDevice?.toLowerCase() === 'androidos') {
      return 'assets/images/linkAndroidShort.svg';
    } else {
      return 'assets/images/linkAppGallery.svg';
    }
  }

  public goToStore(): void {
    const osDevice = this.mobileDetectService.osDevice;
    console.log('Идем в store');
    if (osDevice?.toLowerCase() === 'ios') {
      // window.location.href = 'https://www.apple.com/app-store';
      window.location.href = 'https://apps.apple.com/ru';
    } else if (osDevice?.toLowerCase() === 'androidos') {
      // window.open('https://play.google.com', '_blank');
      // window.location.href = 'https://play.google.com';
      window.open('https://play.google.com');
    } else {
      // window.location.href = 'https://appgallery.huawei.com';
      window.open('https://appgallery.huawei.com');
    }
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
