import { Component } from '@angular/core';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';

@Component({
  selector: 'app-legal-info-page',
  templateUrl: './legal-info-page.component.html',
  styleUrls: ['./legal-info-page.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LegalInfoPageComponent { }