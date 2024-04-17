import { AfterViewInit, Component } from '@angular/core';
import { AbsractExample } from '@app/shared/abstract.class';
import { ourTeamList } from '@app/shared/constants/ourTeam.constants';
import { IAboutPersonalData } from '@app/shared/interfaces';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent extends AbsractExample implements AfterViewInit {

  public ourPersonal: Array<IAboutPersonalData> = ourTeamList;
  public showNavModal = false;
  public chosenPersonData: IAboutPersonalData;

  // constructor() {
  //   super();
  // }

  ngAfterViewInit(): void {
    // console.log(this.getName());
    // this.scrollToTop();
  }

  requiredMethod(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  getName(): string {
    let greeting = super.getName() + ' hello!';
    return greeting;
  }

  private scrollToTop(): void {
    document.getElementById('pageWrap').scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  public openPersonDescModal(persona: IAboutPersonalData): void {
    this.chosenPersonData = persona;
    this.hideScroll();
  }

  public closePersonDescModal(): void {
    this.chosenPersonData = null;
    this.showScroll();
  }
}
