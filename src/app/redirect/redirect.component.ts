import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class RedirectComponent implements OnInit {
  private mobileDetectService = inject(MobileDetectService);
  ngOnInit(): void {
    this.mobileDetectService.goToDeviceStore();
  }
}
