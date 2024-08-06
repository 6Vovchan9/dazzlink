import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, delay, map, skipWhile, switchMap, takeUntil } from 'rxjs/operators';

import { PostsService } from '@app/shared/services/posts.service';
import { Post } from '@app/shared/interfaces';
import { PagesService } from '@app/shared/services/pages.service';
import { Subject, Subscription, fromEvent, of } from 'rxjs';
import { TelegramService } from '@app/shared/services/telegram.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public isLoading = signal<boolean>(true);
  public postData: Post;
  public articleEvaluation: 'like' | 'dislike';
  private pageName: string;
  private lSub: Subscription;
  private eSub: Subscription;
  private vSub: Subscription;
  public votingIsLoading = signal<boolean>(false);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public hideScrollProgress = true;
  public scrollToTopBtnOptions: { hide: boolean, opacity: boolean } = {
    hide: true,
    opacity: false
  };

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private pagesService: PagesService,
    private router: Router,
    private tgService: TelegramService,
    private cd: ChangeDetectorRef
  ) {
    this.goBackByTg = this.goBackByTg.bind(this);
  }

  ngOnInit(): void {

    this.setTgBackButton(); // Это для появления кнопки "Назад" в телеге

    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        if (!this.isLoading()) {
          // console.log(lang);
          this.isLoading.set(true);
          this.postsService.getById(this.pageName)
            .subscribe(
              (post: Post) => {
                this.postData = post;
                this.isLoading.set(false);
              }
            );
        }
      }
    );

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.pageName = params['title'];
            // return this.postsService.getById(params['title']);
            // return this.postsService.getByIdRovragge(params['title']);
            return this.postsService.getPost(params['title']);
          }
        ),
        catchError(err => {
          this.isLoading.set(false);
          return of(
            null
            // {
            //   id: 'ferb54grv',
            //   title: 'title',
            //   html: 'Уext мпаиваи впаиви впивапип ип иевапи нипвиеивап п твапмвеи паиваеивмв, text мпаиваи впаиви впивапип ип иевапи нипвиеивап п твапмвеи паиваеивмв. Ммеки text мпаиваи впаиви впивапип ип иевапи нипвиеивап п твапмвеи паиваеивмв',
            //   authorList: [
            //     {
            //       link: 'grg/gvsv/bsdfv/bdfv3',
            //       // link: null,
            //       name: 'Игорь',
            //       occupation: 'Водитель',
            //       imageUrl: 'assets/images/home-page/linkToArticlesX2.jpg'
            //     },
            //     {
            //       // link: 'grg/gvsv/bsdfv/bdfv3',
            //       // link: null,
            //       name: 'Диана Семеновна',
            //       occupation: 'Бухгалтер',
            //       // imageUrl: 'assets/images/home-page/linkToArticlesX2.jpg'
            //     }
            //   ],
            //   published: new Date(),
            //   viewCount: 3,
            //   likeCount: 53,
            //   dislikeCount: 5,
            // }
          );
        })
      )
      .subscribe(
        (post: Post) => {
          if (post) {
            this.postData = post;
            this.getEvaluation();
            this.isLoading.set(false);
          } else {
            this.goToAllArticles();
          }
        },
        err => {
          this.isLoading.set(false);
        }
      );
  }

  ngAfterViewInit() {

    const pageWrap = document.getElementById('pageWrap');
    fromEvent<Event>(pageWrap, 'scroll')
      .pipe(
        takeUntil(this.destroy$),
        skipWhile(() => this.isLoading()),
        map(e => (e.target as HTMLDivElement))
      )
      .subscribe(
        (el: HTMLDivElement) => {
          const scrollTop = pageWrap.scrollTop;
          const scrollHeight = pageWrap.scrollHeight;
          const offsetHeight = pageWrap.offsetHeight;
          // console.log(scrollTop, scrollHeight, offsetHeight);
          const prevState = this.scrollToTopBtnOptions.hide;
          const prevOpacity = this.scrollToTopBtnOptions.opacity;
          this.scrollToTopBtnOptions.hide = scrollTop < offsetHeight;
          this.scrollToTopBtnOptions.opacity = scrollTop > scrollHeight - offsetHeight * 2; // эти расчёты можно будет подкорректировать
          const futureState = this.scrollToTopBtnOptions.hide;
          const futureOpacity = this.scrollToTopBtnOptions.opacity;

          if (prevState !== futureState) {
            // console.log('Изменилась видимость кнопки');
            this.cd.detectChanges();
          } else if (prevOpacity !== futureOpacity) {
            // console.log('Изменилась прозрачность кнопки');
            this.cd.detectChanges();
          }
        }
      );
  }

  private setTgBackButton() {

    if (this.tgService.backTgButton) {
      this.tgService.backTgButton.show();
      this.tgService.backTgButton.onClick(this.goBackByTg);
    }
  }

  private deleteTgBackButton() {
    if (this.tgService.backTgButton) {
      this.tgService.backTgButton.hide();
      this.tgService.backTgButton?.offClick(this.goBackByTg);
    }
  }

  private goBackByTg() {
    this.goToAllArticles();
  }

  private getEvaluation() {
    const articlesRating = JSON.parse(localStorage.getItem('articlesEvaluation')) || [];
    // if (articlesRating?.length) {
      const aboutThisArticle = articlesRating.find(about => about.articleId === this.postData.id);
      if (aboutThisArticle) {
        console.log(`Статья "${this.postData.id}" уже была просмотрена Вами ранее!`);
        this.articleEvaluation = aboutThisArticle.choice;
      } else {
        console.log(`Фиксируем просмотр статьи "${this.postData.id}"...`);
        // this.eSub = this.postsService.setArticleEvaluation(this.articleId)
        this.eSub = this.postsService.setArticleEvaluationProd(this.postData.id)
          .subscribe(
            () => {
              this.setArticleEvaluationToSS();
              console.log(`Зафиксировали просмотр статьи "${this.postData.id}"`);
            }
          );
        // setTimeout(() => {
        //   // Записываем id статьи в LS только после того как сервер ответил "ОК"
        //   this.setArticleEvaluationToSS();
        //   console.log(`Зафиксировали просмотр статьи "${this.articleId}"!`);
        // }, 3000)
      // }
    }
  }

  public goToAllArticles(): void {
    this.router.navigate(['/media']);
  }

  public onVoting(val: 'like' | 'dislike'): void {
    // console.log('onVoting');
    // if (this.articleEvaluation) {
    //   return;
    // }

    if (!this.articleEvaluation && !this.votingIsLoading()) {
      console.log(`Фиксируем Ваш ${val}...`);
      this.votingIsLoading.set(true);
      // this.vSub = this.postsService.setArticleVoting(this.articleId, val)
      this.vSub = this.postsService.setArticleVotingProd(this.postData.id, val)
        // .pipe(
        //   delay(5000)
        // )
        .subscribe(
          resp => {
            this.postData['likeCount'] = resp['likeCount'];
            this.postData['dislikeCount'] = resp['dislikeCount'];
            this.votingIsLoading.set(false); // несмотря на то что этот сигнал делает detectChanges при OnPush стратегии, новое значение у articleEvaluation ниже также учитывается при перерендеринге страницы
            this.articleEvaluation = val;
            this.setArticleEvaluationToSSWithChoice(val);
            console.log(`Зафиксировали Ваш ${this.articleEvaluation}`);
          },
          () => {
            this.votingIsLoading.set(false);
          }
        );
      // Тут есть момент как можно обойти LS и наделать много лайков (нужно лайкнуть и быстро обновить страницу, нужно успеть перед тем как сервер ответит),
      // решить это можно если вынести setArticleEvaluationToSSWithChoice из subscribe и в случае если фиксация реакиции
      // завершится с ошибкой тогда нкжно будет удалить реакцию из LS

      // this.articleEvaluation = val;
      // this.setArticleEvaluationToSSWithChoice(val);
    }
  }

  private setArticleEvaluationToSSWithChoice(choice?: 'like' | 'dislike'): void {
    const curVal = JSON.parse(localStorage.getItem('articlesEvaluation')) || [];

    const aboutThisArticle = curVal.find(about => about.articleId === this.postData.id);
    // Возможно id-шник статьи уже есть в LS потому что она была ранее просмотрена, теперь для этой записи надо установить признак like/dislike
    if (aboutThisArticle) {
      aboutThisArticle.choice = choice;
      localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
    } else {
      const val: { articleId: string, choice?: string } = { articleId: this.postData.id };
      if (choice) {
        val.choice = choice;
      }
      curVal.push(val);
      localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
    }
  }

  private setArticleEvaluationToSS(): void {
    const curVal = JSON.parse(localStorage.getItem('articlesEvaluation')) || [];
    const val: { articleId: string } = { articleId: this.postData.id };
    curVal.push(val);
    localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
  }

  public scrollToTop(): void {
    document.getElementById('pageWrap')?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  public get titleForDownloadBtn(): string {
    console.log('Обновляем контент на post-page');
    return 'Hello';
  }

  public buildViewCount(val?: number): string {
    const name =
      `${val}`.endsWith('1') && +val !== 11 ? ' просмотр' :
      `${val}`.endsWith('2') && +val !== 12 ||
      `${val}`.endsWith('3') && +val !== 13 ||
      `${val}`.endsWith('4') && +val !== 14 ? ' просмотра' : ' просмотров';

    return name;
  }

  public ngOnDestroy(): void {
    this.deleteTgBackButton(); // Это для удаления кнопки "Назад" в телеге
    this.lSub?.unsubscribe();
    this.eSub?.unsubscribe();
    // this.vSub?.unsubscribe();

    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
