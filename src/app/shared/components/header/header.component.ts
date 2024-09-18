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

  @Input() hidden = false;

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
    this.hideScroll();
  }

  public closeNavPopup(): void {
    this.showNavModal = false;
    this.showScroll();
  }

}
