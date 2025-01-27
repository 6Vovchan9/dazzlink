import { Attribute, ChangeDetectionStrategy, Component } from '@angular/core';
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

  constructor(
    private modalService: GlobalModalService,
    @Attribute('name') public myLetName: string // если нужно передать статическое значение дочернему компоненту, то лучше сделать это таким образом, использ. этого декоратора повышает произодит-ть приложения за счет оптимизации механизма ChangeDetection. Механизм ChangeDetection проверяет эти значения только на этапе инициализации компонента. Доступ к таким значениям можно получить внутри контсруктора, а не внутри метода ЖЦ ngOnChanges()
  ) { }

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
