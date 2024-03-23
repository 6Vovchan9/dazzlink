import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { EMPTY, Observable, Observer, Subscription, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Post } from '@app/shared/interfaces';
import { PostsService } from '@app/shared/services/posts.service';
import { Router } from '@angular/router';
import { PagesService } from '@app/shared/services/pages.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { langArr } from '@app/shared/constants/languages.constants';

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
  private curLang: string;
  public errorInGetAllArticles = false;

  constructor(
    private postsService: PostsService,
    private pagesService: PagesService,
    @Optional() public mobileDetectService: MobileDetectService,  // Если вдруг для этого сервиса не определен провайдер, чтоб мы не получили ошибку при обращении к нему в таком случае определяем его как опциональный
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log('---ArticlesPageComponent init---');
    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        this.curLang = lang;
        if (!this.isLoading) {
          this.getAllArticles();
        }
      }
    );

    this.getAllArticles();
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    // return true;
    return result;
  }

  public trackPost(index: number, post: Post): string {
    return post.id;
  }

  private getAllArticles(): void {
    this.isLoading = true;

    if (false) {
      this.posts$ = new Observable((observer: Observer<any>) => {
        console.warn('locationsGet пошел');
        setTimeout(() => {
          console.warn('locationsGet error :(');
          // observer.next({});
          // observer.next(null);
          // observer.next([]);
          observer.error('Error');
        })
      }).pipe(
        tap(val => {
          console.log('3', val);
          this.isLoading = false;
        }),
        catchError(err => {
          console.log('4');
          this.isLoading = false;
          this.errorInGetAllArticles = true;
          return of([]);
        })
      )
    } else {
      // this.posts$ = this.postsService.getAll()
      // this.posts$ = this.postsService.getAllRovragge()
      this.posts$ = this.postsService.getAllProd()
        .pipe(
          tap(val => {
            // console.log(val);
            this.isLoading = false;
          }),
          catchError(err => {
            this.isLoading = false;
            this.errorInGetAllArticles = true;
            return of([
              // {
              //   id: 'ferb54grv',
              //   title: 'title',
              //   // imageUrl: null,
              //   viewCount: 22,
              //   published: new Date(),
              // }
            ]);
          })
        )
    }
  }

  private reloadArticles(): void {
    this.errorInGetAllArticles = false;
    this.getAllArticles();
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

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
