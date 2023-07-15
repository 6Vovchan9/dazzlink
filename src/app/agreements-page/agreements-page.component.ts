import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agreements-page',
  templateUrl: './agreements-page.component.html',
  styleUrls: ['./agreements-page.component.scss']
})
export class AgreementsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('AgreementsPageComponent init')
  }

}
