import { JsonPipe, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { ForBusinessBlockComponent } from '@app/shared/components/for-business-block/for-business-block.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { IForBusinessBlock } from './types/partnership.types';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import { PagesService } from '@app/shared/services/pages.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FOR_WHOM_DATA_EN, FOR_WHOM_DATA_RU, FOR_WHOM_DATA_UZ } from './constants/for-whom.constant';
import { WHAT_EXACTLY_EN, WHAT_EXACTLY_RU, WHAT_EXACTLY_UZ } from './constants/what-exactly.constant';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrl: './business-page.component.scss',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ForBusinessBlockComponent,
    TranslocoPipe,
  ],
  providers: [provideTranslocoScope('business')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessPageComponent {
  forWhomData: Array<IForBusinessBlock> = FOR_WHOM_DATA_RU;
  whatExactly: IForBusinessBlock[] = WHAT_EXACTLY_RU;

  curGlobalLang = 'ru';

  #vc: ViewportScroller = inject(ViewportScroller);
  #pagesService = inject(PagesService);

  constructor() {
    this.#pagesService.currentLanguage
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: val => {
          this.#setLangData(val.toLowerCase());
        },
      });
  }

  #setLangData(curLang: string): void {
    this.curGlobalLang = curLang;
    if (curLang === 'en') {
      this.forWhomData = FOR_WHOM_DATA_EN;
      this.whatExactly = WHAT_EXACTLY_EN;
    } else if (curLang === 'uz') {
      this.forWhomData = FOR_WHOM_DATA_UZ;
      this.whatExactly = WHAT_EXACTLY_UZ;
    } else {
      this.forWhomData = FOR_WHOM_DATA_RU;
      this.whatExactly = WHAT_EXACTLY_RU;
    }
  }

  jumpToSection(section): void {
    this.#vc.scrollToAnchor(section);
  }
}
