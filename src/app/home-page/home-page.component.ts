import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { Router } from '@angular/router';

type IOpportunityMenu = {
  active?: boolean,
  type: 'link' | 'button',
  caption: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {

  private curLang: string;
  private lSub: Subscription;
  public appOpportunityMenu: {[key: string]: IOpportunityMenu} = {
    media: {
      type: 'link',
      caption: 'Медиа про психологию отношений'
    },
    locations: {
      active: false,
      type: 'button',
      caption: 'Локации для романтических свиданий'
    },
    company: {
      active: false,
      type: 'button',
      caption: 'Блог о компании и правовая информация'
    }
  };

  constructor(
    private pagesService: PagesService,
    private router: Router
    // private cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        this.curLang = lang;
        // this.cd.detectChanges();
      }
    )
  }

  public onAccoTriggerClick(path: Array<string>): void {
    this.router.navigate(
      path,
      // {skipLocationChange: true}
    );
  }

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
