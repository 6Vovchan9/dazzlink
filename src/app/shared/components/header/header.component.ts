import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { AbsractExample } from '@app/shared/helpers/classes/abstract.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends AbsractExample {

  public routerLinkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
    paths: 'subset'
  };

  public showNavModal = false;

  requiredMethod(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  goToAnotherPage(futurePath?: string): void {
    // const pathnameBeforeNav = location.pathname;
    // if (pathnameBeforeNav !== futurePath) {
      this.closeNavPopup();
    // }
  }

  public openNavPopup(): void {
    this.showNavModal = true;
    this.hideScroll(); // следует иметь в виду, что, когда навигация короткая (и, следовательно, не прокручивается как тут), а пользователь пытается прокрутить ее, тело страницы будет прокручиваться, даже если установлено свойство overscroll-behavior-y: contain, поэтому придется прибегнуть к такому решению
  }

  public closeNavPopup(): void {
    this.showNavModal = false;
    this.showScroll();
  }

}
