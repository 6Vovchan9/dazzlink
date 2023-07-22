import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {

  public posts$: Observable<Post[]>;
  public searchStr = '';

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll()
      .pipe(
        tap(val => {
          console.log(val)
        })
      )
  }

}
