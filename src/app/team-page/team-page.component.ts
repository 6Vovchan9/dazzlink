import { Component } from '@angular/core';
import { ourTeamList } from '@app/shared/constants/ourTeam.constants';
import { IAboutPersonalData } from '@app/shared/interfaces';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent {

  public ourPersonal: Array<IAboutPersonalData> = ourTeamList;
  public showNavModal = false;
  public chosenPersonData: IAboutPersonalData;

  public openPersonDescModal(persona): void {
    this.chosenPersonData = persona;
    this.hideScroll();
  }

  public closePersonDescModal(): void {
    this.chosenPersonData = null;
    this.showScroll();
  }

  private hideScroll(): void {
    document.body.classList.add('no-scroll');
  }

  private showScroll(): void {
    document.body.classList.remove('no-scroll');
  }
}
