import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IToast } from '@app/shared/interfaces';
import { ToastService } from '@app/shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;
  public toastData: IToast = { type: 'success', text: 'Заглушка' };
  tSub: Subscription;
  private timeout: any
  public showToast = false;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.tSub = this.toastService.toast$.subscribe(
      toast => {
        this.toastData = toast;
        this.showToast = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.showToast = false;
        }, this.delay);
      }
    )
  }

  ngOnDestroy() {
    this.tSub?.unsubscribe();
  }

}