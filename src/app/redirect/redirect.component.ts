import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';

@Component({
  selector: 'app-redirect',
  template: '',
  standalone: true,
})
export class RedirectComponent implements OnInit {
  private mobileDetectService = inject(MobileDetectService);
  ngOnInit(): void {
    this.mobileDetectService.goToDeviceStore();
  }
}
