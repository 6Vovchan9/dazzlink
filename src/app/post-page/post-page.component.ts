import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, delay, switchMap } from 'rxjs/operators';

import { PostsService } from '@app/shared/services/posts.service';
import { Post } from '@app/shared/interfaces';
import { PagesService } from '@app/shared/services/pages.service';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public postData: Post;
  public articleEvaluation: 'like' | 'dislike';
  private articleId: string;
  private lSub: Subscription;
  private eSub: Subscription;
  private vSub: Subscription;
  public votingIsLoading = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private pagesService: PagesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        if (!this.isLoading) {
          // console.log(lang);
          this.isLoading = true;
          this.postsService.getById(this.articleId)
            .subscribe(
              (post: Post) => {
                this.postData = post;
                this.isLoading = false;
              }
            );
        }
      }
    );

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.articleId = params['id'];
            // return this.postsService.getById(params['id']);
            // return this.postsService.getByIdRovragge(params['id']);
            return this.postsService.getByIdProd(params['id']);
          }
        ),
        catchError(err => {
          this.isLoading = false;
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
            //       imageUrl: 'assets/images/linkToArticlesX2.jpg'
            //     },
            //     {
            //       // link: 'grg/gvsv/bsdfv/bdfv3',
            //       // link: null,
            //       name: 'Диана Семеновна',
            //       occupation: 'Бухгалтер',
            //       // imageUrl: 'assets/images/linkToArticlesX2.jpg'
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
          if (post) this.getEvaluation();
          this.postData = post;
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  private getEvaluation() {
    const articlesRating = JSON.parse(localStorage.getItem('articlesEvaluation')) || [];
    // if (articlesRating?.length) {
      const aboutThisArticle = articlesRating.find(about => about.articleId === this.articleId);
      if (aboutThisArticle) {
        console.log(`Статья "${this.articleId}" уже была просмотрена Вами ранее!`);
        this.articleEvaluation = aboutThisArticle.choice;
      } else {
        console.log(`Фиксируем просмотр статьи "${this.articleId}"!`);
        // this.eSub = this.postsService.setArticleEvaluation(this.articleId)
        this.eSub = this.postsService.setArticleEvaluationProd(this.articleId)
          .subscribe(
            () => {
              this.setArticleEvaluationToSS();
              console.log(`Зафиксировали просмотр статьи "${this.articleId}"!`);
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
    this.router.navigate(['/articles']);
  }

  public onVoting(val: 'like' | 'dislike'): void {
    // console.log('onVoting');
    // if (this.articleEvaluation) {
    //   return;
    // }

    if (!this.articleEvaluation && !this.votingIsLoading) {
      console.log(`Фиксируем ваш ${val}`);
      this.votingIsLoading = true;
      // this.vSub = this.postsService.setArticleVoting(this.articleId, val)
      this.vSub = this.postsService.setArticleVotingProd(this.articleId, val)
        .pipe(
        // delay(5000)
      )
        .subscribe(
          resp => {
            this.postData['likeCount'] = resp['likeCount'];
            this.postData['dislikeCount'] = resp['dislikeCount'];
            this.votingIsLoading = false;
            this.articleEvaluation = val;
            this.setArticleEvaluationToSSWithChoice(val);
            console.log(`Зафиксировали ваш выбор!`, this.articleEvaluation);
          },
          () => {
            this.votingIsLoading = false;
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

    const aboutThisArticle = curVal.find(about => about.articleId === this.articleId);
    // Возможно id-шник статьи уже есть в LS потому что она была ранее просмотрена, теперь для этой записи надо установить признак like/dislike
    if (aboutThisArticle) {
      aboutThisArticle.choice = choice;
      localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
    } else {
      const val: { articleId: string, choice?: string } = { articleId: this.articleId };
      if (choice) {
        val.choice = choice;
      }
      curVal.push(val);
      localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
    }
  }

  private setArticleEvaluationToSS(): void {
    const curVal = JSON.parse(localStorage.getItem('articlesEvaluation')) || [];
    const val: { articleId: string } = { articleId: this.articleId };
    curVal.push(val);
    localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
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
    this.lSub?.unsubscribe();
    this.eSub?.unsubscribe();
    // this.vSub?.unsubscribe();
  }

}
