import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PostsService } from '@app/shared/services/posts.service';
import { Post } from '@app/shared/interfaces';
import { PagesService } from '@app/shared/services/pages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public postData: Post;
  public articleEvaluation: string;
  private articleId: string;
  private lSub: Subscription;

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
            return this.postsService.getById(params['id']);
          }
        )
      )
      .subscribe(
        (post: Post) => {
          this.getEvaluation();
          this.postData = post;
          this.isLoading = false;
        }
      );
  }

  private getEvaluation() {
    const articlesRating = JSON.parse(localStorage.getItem('articlesEvaluation'));
    if (articlesRating?.length) {
      const aboutThisArticle = articlesRating.find(about => about.articleId === this.articleId);
      if (aboutThisArticle) {
        this.articleEvaluation = aboutThisArticle.choice;
      }
    }
  }

  public goToAllArticles(): void {
    this.router.navigate(['/articles']);
  }

  public onVoting(val: 'like'| 'dislike'): void {
    console.log('onVoting');
    // if (this.articleEvaluation) {
    //   return;
    // }

    if (!this.articleEvaluation) {
      this.articleEvaluation = val;
      this.setArticleEvaluationToSS(val);
    }
  }

  private setArticleEvaluationToSS(choice: 'like'| 'dislike'): void {
    const curVal = JSON.parse(localStorage.getItem('articlesEvaluation')) || [];
    curVal.push({articleId: this.articleId, choice: choice});
    localStorage.setItem('articlesEvaluation', JSON.stringify(curVal));
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
