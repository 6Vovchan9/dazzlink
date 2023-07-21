import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAlert } from '../../interfaces';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;
  public alertData: IAlert | null;
  aSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe(
      alert => {
        this.alertData = alert;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.alertData = null;
        }, this.delay);
      }
    )
  }

  ngOnDestroy() {
    this.aSub?.unsubscribe();
  }

}
