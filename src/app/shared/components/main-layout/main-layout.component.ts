import { Component, OnInit } from '@angular/core';

import { VisitsService } from '@app/shared/services/visits.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public showNavModal = false;

  constructor(
    private visitsService: VisitsService
  ) { }

  ngOnInit(): void { }

  goToAnotherPage(futurePath:string): void {
    // const pathnameBeforeNav = location.pathname;
    // if (pathnameBeforeNav !== futurePath) {
      this.showNavModal = false;
    // }
  }

  getAmountOfUserVisits() {
    this.visitsService.getAmountOfVisits().subscribe(
      amount => {
        console.log(amount)
      }
    )
  }

  openNavPopup() {
    
  }

  closeNavPopup() {
    
  }

}
