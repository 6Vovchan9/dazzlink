import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  constructor(
    public postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void { }

  create() {
    const post: Post = {
      title: 'Как замутить с богатым',
      text: `
        Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так.
        Его корни уходят в один фрагмент классической латыни 45 года н.э.,
        то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney,
        штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur",
        и занялся его поисками в классической латинской литературе.
        В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum"
        ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения.
        Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32
      `,
      author: 'Семен Андреевич',
      date: new Date(),
      views: 147,
      likes: 20,
      dislikes: 11,
    };

    this.postsService.create(post).subscribe(
      () => {
        console.log('Создали пост');
        this.alertService.success('Пост был успешно создан');
      }
    )
  }

}
