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
      title: 'Почему он используется?',
      text: `
        Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
        Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,
        а также реальное распределение букв и пробелов в абзацах,
        которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."
        Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию,
        так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются
        своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии
        появились по ошибке, некоторые - намеренно (например, юмористические варианты).
      `,
      author: 'Петр Иванов',
      date: new Date()
    };

    this.postsService.create(post).subscribe(
      () => {
        console.log('Создали пост');
      }
    )
  }

}
