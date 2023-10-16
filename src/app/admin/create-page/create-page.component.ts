import { Component, OnInit } from '@angular/core';

import { Place, Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { LocationsService } from '@app/shared/services/locations.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  constructor(
    public postsService: PostsService,
    private alertService: AlertService,
    private locationsService: LocationsService
  ) { }

  ngOnInit(): void { }

  create() {
    const post: Post = {
      title: '5 причин почему флиртовать на работе ненадежно',
      html: `
        <p class="articleParagraph">Флирт – распространенная форма общения между мужчиной и женщиной. Представители противоположного пола заигрывают друг с другом, как на досуге, так и в деловой обстановке.</p>
        <p class="articleParagraph">Непринужденные ухаживания на работе напоминают игру, кажутся безобидным развлечением. Так ли это на самом деле? Психологи находят плюсы в заигрываниях между коллегами, но все же считают такой флирт опасным.</p>
        <span class="articleHeader">Положительные стороны непринужденных отношений.</span>
        <p class="articleParagraph">
          Человек проводит на рабочем месте минимум 8 часов в сутки 5 дней в неделю. Если на протяжении этого времени сохранять серьезный настрой и думать только о деловых проектах, может произойти внутреннее выгорание.
        </p>
        <div class="articleParagraph">
          Флирт помогает:
          <ul class="articleList">
            <li class="articleListItem">Предотвратить стресс. Комплимент, полученный от представителя противоположного пола, улучшает настроение, заставляет расправить плечи.</li>
            <li class="articleListItem">Повысить самооценку. Ответная реакция на подмигивание или улыбку приятна, так как убеждает в собственной привлекательности.</li>
            <li class="articleListItem">Улучшить работоспособность. Наличие поклонника или объекта симпатии мотивирует приходить на место службы вовремя, качественно выполнять задачи, чтобы показать себя с лучшей стороны.</li>
          </ul>
        </div>
        <span class="articleHeader">Почему флиртовать на работе ненадежно?</span>
        <div class="articleParagraph">
          Отрицательных моментов флирта на работе больше, чем положительных:
          <ul class="articleList">
            <li class="articleListItem">Улыбки и невинные намеки могут вызвать влюбленность. Если один из участников игры настроен на серьезные отношения, а другой – нет, неминуем скорый разрыв. В несостоявшейся паре возникает напряжение, способное перерасти в открытый конфликт.</li>
            <li class="articleListItem">Заигрывания дают повод для сплетен. Пересуды за спиной – распространенное развлечение офисных сотрудников. Разговоры о возможном служебном романе могут выйти за пределы фирмы и привести к семейным проблемам, если один из объектов несвободен.</li>
            <li class="articleListItem">Увлеченный человек способен выдать тайны компании. Иногда флиртовать начинают для того, чтобы расположить и «разговорить» сотрудника фирмы. В некоторых случаях разочарованный безответными чувствами объект идет на служебное преступление из мести.</li>
            <li class="articleListItem">Флирт может вызвать ревность. Если симпатичный коллега пользуется популярностью, тот, с кем он заигрывает, попадает в опалу.</li>
            <li class="articleListItem">Комплименты и улыбки способны привести к потере должности. Опаснее всего флирт с начальником. Если руководитель увлечется, придется переходить от слов к делу или искать новую работу.</li>
          </ul>
        </div>
        <div class="articleParagraph">
          Стоит ли прибегать к заигрываниям – личный выбор человека. Они способны вызвать неприятности, но иногда флирт помогает устроить личную жизнь.
        </div>
      `,
      authorList: [
        {
          link: 'grg/gvsv/bsdfv/bdfv3',
          // link: null,
          name: 'Игорь',
          occupation: 'Водитель',
          imageUrl: 'assets/images/linkToArticlesX2.jpg'
        }
      ],
      published: new Date(),
      viewCount: 147,
      likeCount: 20,
      dislikeCount: 11,
    };

    this.postsService.create(post).subscribe(
      () => {
        console.log('Создали пост');
        this.alertService.success('Пост был успешно создан');
      }
    )
  }

  createLocation() {
    const place: Place = {
      // country: 'Узбекистан',
      // city: 'Ташкент',
      address: 'ул. Ислама Каримова, 17',
      categoryCode: 'Ресторан',
      subcategory: 'Бар',
      subtitle: 'Узбекская',
      title: 'Чайхана',
      priceRange: 2,
      rating: 4.8
    };

    this.locationsService.create(place).subscribe(
      () => {
        this.alertService.success('Локация была успешно создана');
      }
    )
  }

}
