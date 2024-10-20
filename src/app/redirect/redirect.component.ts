import {
  AfterViewInit,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
  standalone: true,
  imports: [
    // HeaderComponent,
    // FooterComponent
  ]
})
export class RedirectComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  private mobileDetectService = inject(MobileDetectService);
  ngOnInit(): void {
    this.mobileDetectService.goToDeviceStore();
  }
  ngAfterViewInit(): void {
    this.router.navigateByUrl('/');
  }
}
