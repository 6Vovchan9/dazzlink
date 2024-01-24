import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IToast } from "../interfaces";

@Injectable()
export class ToastService {
    public toast$ = new Subject<IToast>();

    success(text: string) {
        this.toast$.next({type: 'success', text});
    }

    warning(text: string) {
        this.toast$.next({type: 'warning', text});
    }

    danger(text: string) {
        this.toast$.next({type: 'danger', text});
    }
}