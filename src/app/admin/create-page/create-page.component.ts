import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  ngOnInit(): void { }

  create() {
    const post: Post = {
      title: 'Заголовок поста',
      text: `
        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
        В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
        используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
        без заметных изменений пять веков, но и перешагнул в электронный дизайн.
        Его популяризации в новое время послужили публикация листов Letraset с образцами
        Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа
        Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
      `,
      author: 'Иван Петров',
      date: new Date()
    };

    this.postsService.create(post).subscribe(
      () => {
        console.log('Создали пост');
      }
    )
  }

}
