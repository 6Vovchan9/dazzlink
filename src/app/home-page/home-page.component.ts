import { Component, OnInit } from '@angular/core';
import { requirementForCarModal, tooltipForMainVector } from '@app/shared/constants/modal/appComponent.constants';
import { GlobalModalService } from '@app/shared/services/global-modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public inutVal: string = 'Иван Андреевич';
  public labelMargin: number = 10;

  constructor(
    public modalService: GlobalModalService
  ) { }

  ngOnInit(): void { }

  myBtn() {
    // console.log('click by myBtn');
    // this.modalService.open(tooltipForMainVector);
    this.modalService.open(requirementForCarModal());
  }

}
