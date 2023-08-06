import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { requirementForCarModal, tooltipForMainVector } from '@app/shared/constants/modal/appComponent.constants';
import { FieldOptions } from '@app/shared/fields/radiobutton-new-field/radiobutton-field.component';
import { GlobalModalService } from '@app/shared/services/global-modal.service';

@Component({
  selector: 'app-agreements-page',
  templateUrl: './agreements-page.component.html',
  styleUrls: ['./agreements-page.component.scss']
})
export class AgreementsPageComponent implements OnInit {

  public inutVal: string = 'Иван Андреевич';
  public labelMargin: number = 10;
  public myForm: FormGroup;
  public vectorFieldOptions: FieldOptions = {
    id: 'vectors',
    items: [
      {
        value: 'mainVector',
        showItemDesc: true,
        caption: 'Без справок',
        id: 'mainVector',
        iconSrc: 'assets/images/linkAndroid.png'
      },
      {
        value: 'carVector',
        showItemDesc: true,
        caption: 'Без справок с залогом<br>авто <span class="highlight">ставка ниже<br>на 3% годовых</span>',
        id: 'carVector',
        iconSrc: 'assets/images/linkIOS.png'
      }
    ],
    value: 'carVector'
  };
  public genderFieldOptions: FieldOptions = {
    disabled: false,
    id: "gender",
    required: true,
    items: [{ value: 'MALE', caption: 'М' }, { value: 'FEMALE', caption: 'Ж' }],
    // value: {value: 'MALE', caption: 'Мужчина'}
  };

  public langFieldOptions: FieldOptions = {
    disabled: false,
    id: "language",
    required: true,
    items: [{ value: 'RU', caption: 'RU' }, { value: 'UZ', caption: 'UZ' }, { value: 'EN', caption: 'EN' }, { value: 'KZ', caption: 'KZ' }],
    // value: ['RU', 'UZ']
    // value: 'UZ'
    value: 'RU'
  };

  constructor(
    public modalService: GlobalModalService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.myForm = new FormGroup({
      vectors: new FormControl(this.vectorFieldOptions.value, this.vectorFieldOptions.required ? [Validators.required] : []),
      gender: new FormControl(this.genderFieldOptions.value, this.genderFieldOptions.required ? [Validators.required] : []),
      language: new FormControl(this.langFieldOptions.value, this.langFieldOptions.required ? [Validators.required] : []),
    });
  }

  showVectorDesc(e?) {
    this.modalService.open(tooltipForMainVector);
  }

  myBtn() {
    // console.log('click by myBtn');
    // this.modalService.open(tooltipForMainVector);
    this.modalService.open(requirementForCarModal());
  }

}
