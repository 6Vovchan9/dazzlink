import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VisitsService } from '../../services/visits.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public showNavModal = false;

  constructor(
    private router: Router,
    private visitsService: VisitsService
  ) { }

  ngOnInit(): void { }

  goToAnotherPage(commands: Array<string>): void {
    this.router.navigate(
      commands,
      // {skipLocationChange: true}
    );
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
