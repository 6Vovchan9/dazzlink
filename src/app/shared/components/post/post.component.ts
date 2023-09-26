import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postData: Post;

  constructor() { }

  ngOnInit(): void { }

  buildViewCount(val?) {
    const name =
      `${val}`.endsWith('1') && +val !== 11 ? ' просмотр' :
      `${val}`.endsWith('2') && +val !== 12 ||
      `${val}`.endsWith('3') && +val !== 13 ||
      `${val}`.endsWith('4') && +val !== 14 ? ' просмотра' : ' просмотров';

    return name;
  }

}
