import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute)

  constructor() { }

  ngOnInit(): void {
    this.route.fragment.subscribe(data => {
      if (data) this.jumpToSection(data);
    })
  }

  private jumpToSection(section): void {
    document.getElementById(section).scrollIntoView({behavior: 'smooth'})
  }
}
