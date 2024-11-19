import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalModalService } from '@app/shared/services/global-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(private modalService: GlobalModalService) { }

  public routerLinkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
    paths: 'subset'
  };

  public openNavPopup(): void {
    this.modalService.open({ component: 'appComponent', modalName: 'navigationModal' });
    // this.hideScroll(); // следует иметь в виду, что, когда навигация короткая (и, следовательно, не прокручивается как тут), а пользователь пытается прокрутить ее, тело страницы будет прокручиваться, даже если установлено свойство overscroll-behavior-y: contain, поэтому придется прибегнуть к такому решению
  }

}
