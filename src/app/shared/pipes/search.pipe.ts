import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(posts: Post[], search: string): Post[] {
    if (search.trim()) {
      return posts.filter(post => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      return posts;
    }
  }

}
