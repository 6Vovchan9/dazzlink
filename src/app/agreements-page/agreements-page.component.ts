import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { requirementForCarModal, tooltipForMainVector } from '@app/shared/constants/modal/appComponent.constants';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { FieldOptions } from '@app/shared/fields/radiobutton-new-field/radiobutton-field.component';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { TelegramService } from '@app/shared/services/telegram.service';

@Component({
  selector: 'app-agreements-page',
  templateUrl: './agreements-page.component.html',
  styleUrls: ['./agreements-page.component.scss']
})
export class AgreementsPageComponent implements OnInit {

  public inutVal: string = 'Иван Андреевич';
  public labelMargin: number = 10;
  public myForm: UntypedFormGroup;
  public vectorFieldOptions: FieldOptions = {
    id: 'vectors',
    items: [
      {
        value: 'mainVector',
        showItemDesc: true,
        caption: 'Без справок',
        id: 'mainVector',
        iconSrc: 'assets/images/store/linkAndroid.png'
      },
      {
        value: 'carVector',
        showItemDesc: true,
        caption: 'Без справок с залогом<br>авто <span class="highlight">ставка ниже<br>на 3% годовых</span>',
        id: 'carVector',
        iconSrc: 'assets/images/store/linkIOS.png'
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

  public langFieldOptions: DropdownOptions = {
    disabled: false,
    id: "language",
    required: true,
    items: [{ value: 'RU', caption: 'RU' }, { value: 'UZ', caption: 'UZ' }, { value: 'EN', caption: 'EN' }, { value: 'KZ', caption: 'KZ' }],
    // value: ['RU', 'UZ']
    // value: 'UZ'
    // value: [{ value: 'UZ', caption: 'UZ' }]
    value: 'RU'
  };

  constructor(
    public modalService: GlobalModalService,
    private tgService: TelegramService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public sendMessageInTelegram(): void {
    const messData = {
      from: 'dazzlink',
      date: new Date(),
      message: this.inutVal
    };
    this.tgService.sendData(messData);
  }

  private createForm(): void {
    this.myForm = new UntypedFormGroup({
      vectors: new UntypedFormControl({value: this.vectorFieldOptions.value, disabled: this.vectorFieldOptions.disabled}, this.vectorFieldOptions.required ? [Validators.required] : []),
      gender: new UntypedFormControl({value: this.genderFieldOptions.value, disabled: this.genderFieldOptions.disabled}, this.genderFieldOptions.required ? [Validators.required] : []),
      language: new UntypedFormControl({value: this.langFieldOptions.value, disabled: this.langFieldOptions.disabled}, this.langFieldOptions.required ? [Validators.required] : []),
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
