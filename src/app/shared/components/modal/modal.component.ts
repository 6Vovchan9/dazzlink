import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GlobalModalService, ModalData } from '@app/shared/services/global-modal.service';
import { Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {

  data: ModalData;
  contWithShadow = false;
  modalServiceSub: Subscription;
  // stop$ = new Subject<void>();

  @Output()
  public buttonClick = new EventEmitter<any>();

  @Output()
  public closeModal = new EventEmitter<string>();

  constructor(
    public modalService: GlobalModalService
  ) { }

  ngOnInit(): void {
    this.modalServiceSub = this.modalService.modalData$

      // .pipe(
      //   take(1)
      // ) // Может показаться что это хорошо но это не так, потому что если в одной модалке нажали кнопку и после должна открыться сразу другая подалка - будут проблемы (даже если перед открытием новой модалки сделать "this.modalService.close()").
      // Надо подумать какой тут лучше исп оператор. Или в альтернативу этому сделал unsubscribe при OnDestroy. Если этого не сделать то при каждом новом открытии модалки у стрима modalData$ будут накапливаться подписчики,
      // каждое новое открытие, даже одной и той же модалки, добаляет подписчика и закрытие модалки его не удаляет!

      // .pipe(
      //   takeUntil(this.stop$)
      // ) // Или вот тоже рабочий прием аналогичный unsubscribe (PS если хотим им воспольз-ся надо разкомментировать stop$ и stop$.next())

      .subscribe(
        data => {
          this.data = data;
          // if (data) this.operateContentSize(); // Определяем показывать ли градиент у контента, в том случае когда много текста и есть скролл
          // console.log('subscribe: ', data);
        }
      )
    // this.data = this.modalService.modalData$.getValue()
    // console.log(this.modalService.modalData$.getValue());
  }

  operateContentSize() {
    setTimeout(() => {
      const contentWrap = document.getElementById('modal__content');

      // console.log(contentWrap.offsetHeight, contentWrap.scrollHeight);
      if (contentWrap) {
        if (contentWrap.scrollHeight > contentWrap.offsetHeight) {
          this.contWithShadow = true;
        }
      }
    });
  }

  btnClick(methodName: string, componentName: string) {
    this.buttonClick.emit({methodName, componentName});
  }

  clickByBackground() {
    if (this.data.closeButton) {
      if (this.data.modalName === 'otpPopup') {
        this.closeModal.emit('otpPopup');
      }
      this.modalService.close();
    }
  }

  toggleAccoStatus(link) {
    const curVal = link['close'];
    link['close'] = !curVal;
  }

  clickByCloseModal(modalName) {
    this.modalService.close();
    this.closeModal.emit(modalName);
  }

  ngOnDestroy(): void {
    if (this.modalServiceSub) this.modalServiceSub.unsubscribe();

    // this.stop$.next();
  }

}
