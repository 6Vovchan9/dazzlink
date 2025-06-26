import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { DropdownOptions } from "@app/shared/fields/dropdown-field/dropdown-field.component";
import { DropdownFieldModule } from "@app/shared/fields/dropdown-field/dropdown-field.module";
import { GlobalModalService } from "@app/shared/services/global-modal.service";
import { PagesService } from "@app/shared/services/pages.service";
import { TranslocoService } from "@jsverse/transloco";

@Component({
  selector: 'dz-language-switcher',
  templateUrl: './language-switcher.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownFieldModule
  ],
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {

    switcherInModal: InputSignal<boolean> = input(false, { alias: 'inModal' });

    constructor() {
        this.langFieldOptions = this.#pagesService.langFieldOptions;
    }

    languageControl: FormControl;
    langFieldOptions: DropdownOptions;

    #pagesService = inject(PagesService);
    #translocoService = inject(TranslocoService);
    #modalService = inject(GlobalModalService);

    ngOnInit(): void {
        this.#initLangControl();
    }

    #initLangControl(): void {
        const initVal = this.#pagesService.currentLanguage.getValue();
        this.languageControl = new FormControl<any>({ value: initVal, disabled: this.langFieldOptions.disabled });
    }

    onChangeLang(lang: string, fromModal = false): void {
        this.#pagesService.currentLanguage.next(lang);
        if (fromModal || this.switcherInModal()) this.#clickByCloseModal();
    }

    #clickByCloseModal(): void {
        this.#modalService.close();
    }
}