import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-back-btn',
  templateUrl: './go-back-btn.component.html',
  styleUrls: ['./go-back-btn.component.scss']
})
export class GoBackBtnComponent implements OnInit {

  @Input() public text = 'Назад';

  constructor() { }

  ngOnInit(): void { }

}
