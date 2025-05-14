import { JsonPipe, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { ForBusinessBlockComponent } from '@app/shared/components/for-business-block/for-business-block.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { IForBusinessBlock } from './types/partnership.types';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrl: './business-page.component.scss',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ForBusinessBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessPageComponent {

  readonly forWhomData: Array<IForBusinessBlock> = [
    {
      icon: 'assets/icons/business-page/restaurant.svg',
      title: 'Кафе, рестораны и кондитерские',
      text: 'Станьте местом, где начинаются истории. Мы подсказываем пользователям уютные места для первых встреч — рекомендуем ваши заведения внутри нашего сервиса.'
    },
    {
      icon: 'assets/icons/business-page/barbershop.svg',
      title: 'Салоны красоты и барбершопы',
      text: 'Помогите выглядеть уверенно перед встречей. Перед свиданием наши пользователи ищут, где быстро привести себя в порядок — рекомендуем им именно вас.'
    },
    {
      icon: 'assets/icons/business-page/flower.svg',
      title: 'Цветочные, бутики и многие другие',
      text: 'Станьте частью тёплых моментов. Букет, подарок, концерт или путешествие — мы подсказываем идеи, а вы помогаете сделать встречу особенной.'
    }
  ];
  readonly whatExactly: IForBusinessBlock[] = [
    {
      icon: 'assets/icons/business-page/brand.svg',
      title: 'Узнаваемость бренда',
      text: 'Мы делаем ваш бренд запоминающимся благодаря точному и ненавязчивому присутствию в ключевых моментах — когда пользователи планируют встречи, выбирают место, образ или подарок. Ваш бизнес оказывается рядом в нужное время, формируя естественную ассоциацию.'
    },
    {
      icon: 'assets/icons/business-page/client.svg',
      title: 'Лояльные клиенты',
      text: 'Мы продвигаем ваш бизнес с помощью рекламы в приложении и на сайте, напоминаем пользователям о вас после визита. При желании, собираем обратную связь и делимся статистикой, чтобы вы улучшали опыт гостей. Помогаем превращать новых клиентов в постоянных.'
    }
  ];

  readonly #vc: ViewportScroller = inject(ViewportScroller);

  jumpToSection(section): void {
    this.#vc.scrollToAnchor(section);
  }
}
