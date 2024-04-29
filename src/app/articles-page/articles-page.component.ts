import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
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
export class ArticlesPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('lastPostItem', { read: ElementRef }) lastPostList: QueryList<ElementRef>;

  public posts$: Observable<Post[]>;
  public articlesList: Post[] = [];
  public searchStr = '';
  public isLoading = true;
  private lSub: Subscription;
  private pSub: Subscription;
  private curLang: string;
  public errorInGetAllArticles = false;
  private observer: IntersectionObserver;
  public showLoadMoreSpinner = false;

  constructor(
    private postsService: PostsService,
    private pagesService: PagesService,
    @Optional() public mobileDetectService: MobileDetectService,  // Если вдруг для этого сервиса не определен провайдер, чтоб мы не получили ошибку при обращении к нему в таком случае определяем его как опциональный
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.lSub = this.pagesService.currentLanguage.subscribe(
    //   lang => {
    //     this.curLang = lang;
    //     if (!this.isLoading) {
    //       this.getAllArticles();
    //     }
    //   }
    // );

    this.getAllArticles();
    // this.intersectionObserver();
  }

  ngAfterViewInit() {
    // this.lastPostList.changes.subscribe(
    //   d => {
    //     if (d.last && this.observer) this.observer.observe(d.last.nativeElement);
    //   }
    // );
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    // return true;
    return result;
  }

  public trackPost(index: number, post: Post): string {
    return post.id;
  }

  private getAllArticles(options?: { id: string, direction: 'EARLIER' | 'LATER' }, withError = false): void {
    if (false) {
      this.pSub = new Observable((observer: Observer<Array<Post>>) => {
        console.warn('locationsGet пошел');
        setTimeout(() => {
          if (withError) {
            console.warn('locationsGet error :(');
            observer.error('Error');
            // observer.next([]);
            // observer.next({});
            // observer.next(null);
          } else {
            console.warn('locationsGet ok :)');
            observer.next([
              {
                "id": "6d65891f-624f-48cb-9a1d-7059ad3bc9ff",
                "title": "Статья 1",
                "imageUrl": "https://static.dazzlink.asia/article/new/article_19.jpg",
                "viewCount": 22,
                "published": new Date('2024-02-12T11:08:04.31')
              },
              {
                "id": "a3f799d2-cb68-44b1-8fa6-3dbd6e554f0e",
                "title": "Статья 2",
                "imageUrl": "https://static.dazzlink.asia/article/new/article_6.jpg",
                "viewCount": 12,
                "published": new Date('2024-02-11T11:08:04.31')
              },
              {
                "id": "a3f799d2-cb68-44b1-8fa6-3dbd6e554f0e",
                "title": "Статья 3",
                "imageUrl": "https://static.dazzlink.asia/article/new/article_6.jpg",
                "viewCount": 12,
                "published": new Date('2024-02-11T12:08:04.31')
              },
              {
                "id": "a3f799d2-cb68-44b1-8fa6-3dbd6e554f0e",
                "title": "Статья 4",
                "imageUrl": "https://static.dazzlink.asia/article/new/article_6.jpg",
                "viewCount": 12,
                "published": new Date('2024-02-11T11:09:04.31')
              },
              {
                "id": "a3f799d2-cb68-44b1-8fa6-3dbd6e554f0e",
                "title": "Статья 5",
                "imageUrl": "https://static.dazzlink.asia/article/new/article_6.jpg",
                "viewCount": 12,
                "published": new Date('2024-02-13T11:08:04.31')
              },
              {
                "id": "a3f799d2-cb68-44b1-8fa6-3dbd6e554f0e",
                "title": "Статья 6",
                "imageUrl": "https://static.dazzlink.asia/article/new/article_6.jpg",
                "viewCount": 12,
                "published": new Date('2024-02-14T11:08:04.31')
              }
            ]);
          }
        }, 2000)
      })
        // .pipe(
        //   catchError(err => {
        //     this.errorInGetAllArticles = true;
        //     return of([]);
        //   })
        // )
        .subscribe({
          next: value => {
            value.forEach(post => {
              this.articlesList.push(post);
            })
            this.isLoading = false;
          },
          error: err => {
            this.isLoading = false;
            this.errorInGetAllArticles = true;
          }
        })
    } else {

      // Старый вариант
      // this.posts$ = this.postsService.getAllProd()
      //   .pipe(
      //     tap(val => {
      //       console.log(val);
      //       this.isLoading = false;
      //     }),
      //     catchError(err => {
      //       this.isLoading = false;
      //       this.errorInGetAllArticles = true;
      //       return of([]);
      //     })
      //   )

      this.pSub = this.postsService.getAllProd(options)
      .subscribe({
        next: value => {
          value.forEach(post => {
            this.articlesList.push(post);
          })
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.errorInGetAllArticles = true;
        }
      })
    }
  }

  private reloadArticles(): void {
    this.errorInGetAllArticles = false;
    this.isLoading = true;
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

  private intersectionObserver() {

    const optionsForObserver = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    this.observer = new IntersectionObserver(
      ([entry], observer) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            console.log('load more articles...');
            this.showLoadMoreSpinner = true;
          }
      },
      optionsForObserver
    );
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
    this.pSub?.unsubscribe();
    this.observer?.disconnect();
  }

}
