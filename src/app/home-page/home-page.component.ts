import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {

  private curLang: string;
  private lSub: Subscription;

  constructor(
    private pagesService: PagesService,
    private cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.pagesService.currentLanguage.subscribe(
      lang => {
        this.curLang = lang;
        this.cd.detectChanges();
      }
    )
  }

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
