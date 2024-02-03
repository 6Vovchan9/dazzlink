import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit, AfterViewInit {

  @ViewChildren('section', { read: ElementRef }) sectionsRef: QueryList<ElementRef>;

  private route: ActivatedRoute = inject(ActivatedRoute)
  public updatePageInfo: Date = new Date("2024-01-21");
  public curSection: 'phones' | 'support' | 'questions' = 'phones';
  private observer: IntersectionObserver;

  constructor() { }

  ngOnInit(): void {
    this.route.fragment.subscribe(data => {
      if (data) this.jumpToSection(data);
    });

    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.scrollToTop();

    // console.log(this.sectionsRef);
    // this.sectionsRef.forEach(el => {
    //   // console.log(el.nativeElement);
    //   this.observer.observe(el.nativeElement);
    // });
  }

  scrollToTop() {
    document.getElementById('pageWrap').scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  clickByMyBtn2() {
    document.getElementById('phoneTab').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  public onNavInMobile(sectionName, tabName): void {
    this.curSection = sectionName;

    // Нельзя 2 подряд behavior: 'smooth' поэтому ниже придется обойтись без него:
    document.getElementById(tabName).scrollIntoView({ block: 'nearest', inline: 'center' });
    this.jumpToSection(sectionName);
  }

  public onNavInDesktop(sectionName): void {
    this.curSection = sectionName;
    this.jumpToSection(sectionName);
  }

  private jumpToSection(section): void {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private intersectionObserver() {

    const clientH = document.documentElement.clientHeight;
    const rootMarginH = Math.trunc(clientH / 2) - 4;

    let options = {
      root: null,
      // rootMargin: '0px',
      rootMargin: `-${rootMarginH}px 0px -${rootMarginH}px 0px`,
      threshold: 0
    };


    this.observer = new IntersectionObserver((entries) => {
      console.log(entries);
      // entries.forEach(entry => {
      //   if (entry.isIntersecting) {
      //     console.log(entry.target);
      //     this.curSection = entry.target.firstChild['id'];
      //   }
      // })
    }, options);
  }
}
