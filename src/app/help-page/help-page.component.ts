import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { questions } from './constants/questions.constant';
import { IQuestions } from './types/question.types';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('section', { read: ElementRef }) sectionsRef: QueryList<ElementRef>;

  private route: ActivatedRoute = inject(ActivatedRoute);
  public updatePageInfo: Date = new Date("2024-01-21");
  public rootMarginBottom: number;
  
  public curSection: 'phones' | 'support' | 'questions' = 'phones';
  private observer: IntersectionObserver;
  public sectionDictionary = {
    phones: 'phoneTab',
    support: 'supportTab',
    questions: 'questionTab'
  };
  public questionsForRender: Array<IQuestions>;

  private resizeObservable$: Observable<Event>;
  private resizeSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {

    this.prepareQuestions();
    this.aboutWindowResize();

    // this.route.fragment.subscribe(data => {
    //   if (data) this.jumpToSection(data);
    // });

    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    // console.log(this.sectionsRef);
    this.sectionsRef.forEach(el => {
      // console.log(el.nativeElement);
      this.observer.observe(el.nativeElement);
    });
  }

  private prepareQuestions() {
    // const questionsFromConst = questions;
    this.questionsForRender = questions.map(q => ({ active: true, ...q }));
    // console.log(this.questionsForRender, questionsFromConst);
  }

  private aboutWindowResize(): void {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(
      debounceTime(1000)
    );
    this.resizeSubscription = this.resizeObservable$.subscribe(evt => {
      // console.log('event: ', evt);
      this.updateObserver();
    });
  }

  private updateObserver(): void {
    this.observer.disconnect();
    this.intersectionObserver();
    this.sectionsRef.forEach(el => {
      this.observer.observe(el.nativeElement);
    });
  }

  clickByMyBtn2() {
    // document.getElementById('phoneTab').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    // this.modalService.open({component: 'mainLayoutComponent'});
  }

  public onNavInMobile(sectionName): void {
    // this.curSection = sectionName;

    // Нельзя 2 подряд behavior: 'smooth' поэтому ниже придется обойтись без него. Позже выяснилось что проблема набл только в браузере в режиме "Emulated Devices", поэтому возвращаем эту настройку:
    document.getElementById(this.sectionDictionary[sectionName]).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    this.jumpToSection(sectionName);
  }

  public onNavInDesktop(sectionName): void {
    // this.curSection = sectionName;
    this.jumpToSection(sectionName);
  }

  private jumpToSection(section): void {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private intersectionObserver() {

    const clientH = document.documentElement.clientHeight;
    const rootMarginT = 154;
    // const rootMarginH1 = Math.trunc(clientH / 2) - 4;
    const rootMarginB = clientH - rootMarginT - 4;
    this.rootMarginBottom = rootMarginB;

    // console.log(clientH, rootMarginH1, rootMarginH2);

    const optionsForObserver = {
      root: null,
      // rootMargin: '0px',
      // rootMargin: `-${rootMarginH1}px 0px -${rootMarginH1}px 0px`,
      rootMargin: `-${rootMarginT}px 0px -${rootMarginB}px 0px`,
      threshold: 0
    };

    this.observer = new IntersectionObserver(
      entries => {
        // console.log(entries);
        entries.forEach(
          entry => {
            if (entry.isIntersecting) {
              // console.log(entry.target);
              const sectionName = entry.target.firstChild['id'];
              this.curSection = sectionName;
              // this.inlineScrollInTabBar(sectionName);
            }
          }
        );
      },
      optionsForObserver
    );
  }

  private inlineScrollInTabBar(sectionName): void {
    document.getElementById(this.sectionDictionary[sectionName]).scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe();
    this.observer?.disconnect();
  }
}
