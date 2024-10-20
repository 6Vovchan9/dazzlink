import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Self,
  Signal,
  ViewChildren,
  effect,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { NgStyle, NgTemplateOutlet, ViewportScroller } from '@angular/common';
import { Router, RouterLink, Scroll } from '@angular/router';
import {
  EMPTY,
  Observable,
  Observer,
  Subject,
  Subscription,
  fromEvent, of,
  throwError
} from 'rxjs';
import {
  catchError,
  debounceTime,
  delay, map,
  distinctUntilChanged,
  skipWhile,
  takeUntil, tap,
  throttleTime,
  auditTime,
  filter
} from 'rxjs/operators';

import { Post, RespArticlesData } from '@app/shared/interfaces';
import { PostsService } from '@app/shared/services/posts.service';
import { PagesService } from '@app/shared/services/pages.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { MOCK_ARTICLES, MOCK_ARTICLES_FOR_SKELETON } from '@app/shared/mock/articles';
import { PersistanceService } from '@app/admin/shared/services/persistance.service';
import { PostComponent } from '@app/shared/components/post/post.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { openDB } from '@tempfix/idb';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss'],
  providers: [PersistanceService],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NgStyle,
    PostComponent,
    HeaderComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('lastPostItem', { read: ElementRef }) lastPostList: QueryList<ElementRef>;

  public posts$: Observable<Post[]>;
  public articlesList = signal<Post[]>([]);
  public mockArticlesList = MOCK_ARTICLES_FOR_SKELETON;
  public lastPaginationPage = true;
  public searchStr = '';
  public isLoading = signal<boolean>(true);
  private lSub: Subscription;
  private pSub: Subscription;
  private pageScrollSub: Subscription;
  private lastPostSub: Subscription;
  private prevScrollTop = 0;
  public hideHeader = signal(true);
  private curLang: string;
  public errorAfterGetAllArticles = signal(false);
  public implementErrorInGetAllArticles = false;
  private observer: IntersectionObserver;
  public showLoadMoreSpinner = signal(false);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public hideScrollProgress = true;
  private router = inject(Router);
  private db: any;
  scrollingRef = viewChild<HTMLElement>("restoreScrollPosition");

  constructor(
    private postsService: PostsService,
    // private pagesService: PagesService,
    @Self() private persistanceService: PersistanceService, // Такой декоратор требует чтоб этот сервис был зарегистрирован локально, прям в декораторе этого компонента.
    // У декоратора @SkipSelf противоположный эффект, он tells Angular not to look for the injector in the local injector, but start from the Parent
    // Есть еще декоратор @Host и для него сервис должен регистрироваться либо в текущем компоненте либо в родительском компоненте при помощи свойсва декоратора компонента "viewProviders"
    @Optional() public mobileDetectService: MobileDetectService,  // Если вдруг для этого сервиса не определен провайдер, чтоб мы не получили ошибку при обращении к нему в таком случае определяем его как опциональный
    private modalService: GlobalModalService,
    private vc: ViewportScroller
    // private cd: ChangeDetectorRef
  ) {
    const scrollingPosition: Signal<[number, number] | null> = toSignal(
      inject(Router).events.pipe(
        filter((event): event is Scroll => event instanceof Scroll),
        map((event: Scroll) => event.position),
      ),
    );

    effect(() => {
      if (this.scrollingRef() && scrollingPosition()) {
        this.vc.scrollToPosition(scrollingPosition()!);
      }
    });
  }

  ngOnInit(): void {

    // this.lSub = this.pagesService.currentLanguage.subscribe(
    //   lang => {
    //     this.curLang = lang;
    //     if (!this.isLoading()) {
    //       this.getAllArticles();
    //     }
    //   }
    // );

    if (false) {
      this.aboutIDB(); // используем IndexedDB, берем статьи из БД браузера если они там есть
    } else {
      this.getAllArticles(); // не используем IndexedDB, загружаем их всегда с бэка
    }
    this.intersectionObserver();
  }

  ngAfterViewInit() {

    this.lastPostSub = this.lastPostList.changes.subscribe(
      d => {
        if (d.last && this.observer && !this.lastPaginationPage) {
          this.observer.observe(d.last.nativeElement);
        }
      }
    );
    this.addEventListenerToPage();
    // const pageWrap = document.getElementById('pageWrap');
    // fromEvent<Event>(pageWrap, 'scroll')
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     skipWhile(() => this.isLoading()),
    //     map(e => (e.target as HTMLDivElement))
    //   )
    //   .subscribe(
    //     (el: HTMLDivElement) => {
    //       const scrollTop = pageWrap.scrollTop;
    //       const offsetHeight = pageWrap.offsetHeight;
    //       this.hideScrollProgress = scrollTop < offsetHeight;
    //     }
    //   );
  }

  public get appWebview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    // return true;
    return result;
  }

  private async aboutIDB() {
    this.db = await this.openDatabase();
    this.getAllFromIDB();
  }

  private openDatabase() {
    return openDB('articlesDb', undefined, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        // This is similar to the upgradeneeded event in plain IndexedDB
        console.log('Создаем хранилище объекта!');
        if (!db.objectStoreNames.contains('articles')) { // если хранилище "books" не существует
          db.createObjectStore('articles', { autoIncrement: true }); // создаём хранилище
        }
      },
      blocked(currentVersion, blockedVersion, event) {
        // This is similar to the blocked event in plain IndexedDB
      },
      blocking(currentVersion, blockedVersion, event) {
        // This is similar to the versionchange event in plain IndexedDB
      },
      terminated() {
        // This is similar to the close event in plain IndexedDB
      },
    });
  }

  private async getAllFromIDB(): Promise<any> {
    let tx = this.db.transaction("articles", "readonly");
    let articleStore = tx.objectStore("articles");
    let articles = await articleStore.getAll();
    if (articles.length) {
      console.log("Список статей из indexedDB:", articles);
      const curLastArticle = articles[articles.length  - 1];
      this.lastPaginationPage = curLastArticle?.last ?? true;
      this.articlesList.update(prevArticles => [...prevArticles, ...articles]);
      this.showLoadMoreSpinner.set(false);
      // this.errorAfterGetAllArticles.set(false); // На всякий случай
      this.isLoading.set(false);
    } else {
      console.log("В БД IndexedDB пока нет статей. Запросим их с бэка");
      this.getAllArticles();
    }
  }

  private addToIDB(articles: Post[]) {
    if (this.db && articles.length) {
      let tx = this.db.transaction("articles", "readwrite");
      let articleStore = tx.objectStore("articles");
      console.log("Добавляем новые статьи в IndexedDB");
      articles[articles.length - 1].last = this.lastPaginationPage;
      for (let atricle of articles) {
        articleStore.add(atricle);
      }
    }
  }

  private clearArticlesInIDB() {
    if (this.db) {
      let tx = this.db.transaction("articles", "readwrite");
      tx.objectStore("articles").clear();
    }
  }

  private addEventListenerToPage(): void {
    if (!this.appWebview) {
      this.pageScrollSub = fromEvent(window, "scroll")
        .pipe(
          filter(() => !this.isLoading()),
          auditTime(200)
        )
        .subscribe({
          next: () => {
            this.operatePageScroll();
          }
        });
    }
  }

  private operatePageScroll() {
    const [curScrollLeft, curScrollTop] = this.vc.getScrollPosition();
    // console.log('cur:', curScrollTop);
    // console.log('prev:', this.prevScrollTop);

    if (curScrollTop > this.prevScrollTop || curScrollTop < 100) {
      if (curScrollTop < 100) {
        if (curScrollTop === 0) {
          // console.log('Скрываем header');
          this.hideHeader.set(true);
        }
      } else {
        // console.log('Скрываем header');
        this.hideHeader.set(true);
      }
    } else {
      // console.log('Показываем header');
      this.hideHeader.set(false);
    }
    
    this.prevScrollTop = curScrollTop;
    // this.cd.detectChanges();
  }

  public trackPost(index: number, post: Post): string {
    return post.id;
  }

  private getAllArticles(options?: { id: string, direction: 'EARLIER' | 'LATER' }, withError = false): void {
    if (false) {
      this.pSub = new Observable((observer: Observer<RespArticlesData>) => {
        console.warn('locationsGet пошел');
        setTimeout(() => {
          if (withError || this.implementErrorInGetAllArticles) {
            console.warn('locationsGet error :(');
            observer.error('Error');
            // observer.next([]);
            // observer.next({});
            // observer.next(null);
          } else {
            console.warn('locationsGet ok :)');
            observer.next(MOCK_ARTICLES);
          }
        }, 2000)
      })
        // .pipe(
        //   catchError(err => {
        //     this.errorAfterGetAllArticles = true;
        //     return of([]);
        //   })
        // )
        .pipe(
          tap((resp: RespArticlesData) => this.lastPaginationPage = resp?.last ?? true),
          map((resp: RespArticlesData): Array<Post> => resp.content || [])
        )
        .subscribe({
          next: value => {

            // value.forEach(post => {
            //   // this.articlesList.push(post);
            // });
            this.articlesList.update(prevArticles => [...prevArticles, ...value]);

            this.showLoadMoreSpinner.set(false);
            this.errorAfterGetAllArticles.set(false);
            this.isLoading.set(false);
          },
          error: err => {
            this.errorAfterGetAllArticles.set(true);
            this.isLoading.set(false);
            // this.articlesList = []; // Это надо сделать на тот случай когда мы уже получили некоторое кол-во статей и при запросе очередной пачки статей случилась ошибка и чтобы если вдруг после "Перезагрузить" из баннера сервак раздуплится то надо очистить старые посты 
            this.articlesList.set([]);
          }
        })
    } else {

      // Старый вариант
      // this.posts$ = this.postsService.getAllProd()
      //   .pipe(
      //     tap(val => {
      //       console.log(val);
      //       this.isLoading.set(false);
      //     }),
      //     catchError(err => {
      //       this.isLoading.set(false);
      //       this.errorAfterGetAllArticles.set(true);
      //       return of([]);
      //     })
      //   )

      this.pSub = this.postsService.getAllProd(options)
        .pipe(
          // delay(2000),
          tap((resp: RespArticlesData) => this.lastPaginationPage = resp?.last ?? true),
          map((resp: RespArticlesData): Array<Post> => resp.content || [])
        )
        .subscribe({
          next: value => {
            // console.log('1');

            // value.forEach(post => {
            //   // this.articlesList.push(post);
            // });

            this.addToIDB(value);

            this.articlesList.update(prevArticles => [...prevArticles, ...value]);

            // console.log('2');
            this.showLoadMoreSpinner.set(false);
            this.errorAfterGetAllArticles.set(false); // Это нужно когда была ошибка и потом помог перезапрос статей
            this.isLoading.set(false);
            // console.log('3');
            // this.cd.detectChanges();
          },
          error: () => {
            this.errorAfterGetAllArticles.set(true);
            this.isLoading.set(false);

            // this.articlesList = []; // Это надо сделать на тот случай когда мы уже получили некоторое кол-во статей и при запросе очередной пачки статей случилась ошибка и чтобы если вдруг после "Перезагрузить" из баннера сервак раздуплится то надо очистить старые посты
            // this.clearArticlesInIDB(); // Также удаляем статьи из IndexedDB
            this.articlesList.set([]);
          }
        })
    }
  }

  public reloadArticles(): void {
    if (this.db) {
      this.checkIDBAfterReload();
    } else {
      // this.errorAfterGetAllArticles.set(false);
      this.isLoading.set(true);
      this.getAllArticles();
    }
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
    return langArr[key][this.curLang || 'RU'];
  }

  // public scrollToTop(): void {
  //   document.getElementById('pageWrap')?.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }

  // public get titleForDownloadBtn(): string {
  //   console.log('Обновляем контент на articles-page');
  //   return 'Hello';
  // }

  private intersectionObserver() {

    const optionsForObserver = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    this.observer = new IntersectionObserver(
      // callback может сработать неожиданно раньше, при первом переходе на страницу, изза того что вначале картинки статей не загружены и соотв высота карточек будет маленькой, поэтому надлюдаемый элемент может вызвать callback
      ([entry], observer) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            console.log('load more articles...');
            this.showLoadMoreSpinner.set(true);
            this.checkIDB();
          }
      },
      optionsForObserver
    );
  }

  private async checkIDB() {
    if (this.db) {
      let tx = this.db.transaction("articles", "readonly");
      let articleStore = tx.objectStore("articles");
      let articlesInIDB = await articleStore.getAll();
      if (articlesInIDB.length > this.articlesList().length) {
        console.log(`в IndexedDB (${articlesInIDB.length}) больше статей чем на странице (${this.articlesList().length}), поэтому выводим статьи из БД, а не запрашиваем с бэка`);
        // когда открыли одну вкладку -> получили статьи -> перешли в другую -> запросили вторую пачку статей -> вернулись в первую, проскролили вниз и тоже начали просить еще статьи...
        const curLastArticle = articlesInIDB[articlesInIDB.length  - 1];
        this.lastPaginationPage = curLastArticle?.last ?? true;
        this.articlesList.set(articlesInIDB); 
        this.showLoadMoreSpinner.set(false);
        // Todo: надо будет взять только новые статьи из IndexedDB и положить их в articlesList через update
      } else if (articlesInIDB.length < this.articlesList().length) {
        console.log('в IndexedDB меньше статей чем на странице');

      } else {
        console.log(`На странице и в IndexedDB одинак. кол-во статей, идем за новой пачкой`);
        this.getAllArticles({ id: this.articlesList()[this.articlesList().length - 1].id, direction: 'EARLIER' });
      }
    } else {
      this.getAllArticles({ id: this.articlesList()[this.articlesList().length - 1].id, direction: 'EARLIER' });
    }
  }

  private async checkIDBAfterReload() {
    const tx = this.db.transaction("articles", "readonly");
    const articleStore = tx.objectStore("articles");
    const articlesInIDB = await articleStore.getAll();
    if (articlesInIDB.length) {
      console.log(`В IndexedDB есть статьи (${articlesInIDB.length}), возьмем оттуда`);
      const curLastArticle = articlesInIDB[articlesInIDB.length  - 1];
      this.lastPaginationPage = curLastArticle?.last ?? true;
      this.articlesList.set(articlesInIDB); 
      this.showLoadMoreSpinner.set(false);
      this.errorAfterGetAllArticles.set(false);
    } else {
      console.log(`В IndexedDB нет статей, попробуем запросить еще раз с бэка`);
      this.isLoading.set(true);
      this.getAllArticles();
    }
  }

  public qrModalOrTelegram(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService.goToTelegramChannel();
    } else {
      this.modalService.open({ component: 'appComponent', modalName: 'qrForTelegram' });
    }
  }

  public ngOnDestroy(): void {
    this.pageScrollSub?.unsubscribe();
    this.lSub?.unsubscribe();
    this.pSub?.unsubscribe();
    this.lastPostSub?.unsubscribe();
    this.observer?.disconnect();

    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
