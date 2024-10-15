import { ViewportScroller } from "@angular/common";
import { DestroyRef, inject, Injectable } from "@angular/core";
import { Router, Scroll } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class AutoScrollService {
    private readonly router = inject(Router);
    private readonly vc = inject(ViewportScroller);
    private destroyRef = inject(DestroyRef);

    shouldScroll = new BehaviorSubject<boolean>(false);
    private readonly shouldScroll$ = this.shouldScroll.asObservable();

    constructor() {
        this.init();
    }

    private init(): void {
        console.log('AutoScrollService init');
        const position$ = this.router.events.pipe(
            filter((event): event is Scroll => event instanceof Scroll),
            tap(position => console.log('AutoScrollService', position)),
            map((event: Scroll) => event.position)
        );

        position$
            .pipe(
                switchMap(position => 
                    this.shouldScroll$.pipe(
                        filter(Boolean),
                        map(() => position)
                    )
                ),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: position => {
                    console.log(position);
                    this.vc.scrollToPosition(position || [0, 0]);
                },
            });
    }
}