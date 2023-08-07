import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { VisitsService } from '@app/shared/services/visits.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public showNavModal = false;
  public myForm: FormGroup;
  public langFieldOptions: DropdownOptions = {
    disabled: false,
    id: "language",
    required: true,
    items: [{ value: 'RU', caption: 'RU' }, { value: 'UZ', caption: 'UZ' }, { value: 'EN', caption: 'EN' }, { value: 'KZ', caption: 'KZ' }],
    value: 'RU'
  };

  constructor(
    private visitsService: VisitsService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.myForm = new FormGroup({
      language: new FormControl({value: this.langFieldOptions.value, disabled: this.langFieldOptions.disabled}, this.langFieldOptions.required ? [Validators.required] : []),
    });
  }

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
