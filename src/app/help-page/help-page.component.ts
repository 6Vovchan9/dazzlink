import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute)
  public updatePageInfo: Date = new Date("2024-01-21");

  constructor() { }

  ngOnInit(): void {
    this.route.fragment.subscribe(data => {
      if (data) this.jumpToSection(data);
    })
  }

  clickByMyBtn() {
    // document.getElementById('pageWrap').scrollBy(0,10);
    document.getElementById('pageWrap').scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  private jumpToSection(section): void {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
