import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public inutVal: string = 'Иван Андреевич';
  public labelMargin: number = 10;

  constructor() { }

  ngOnInit(): void { }

}
