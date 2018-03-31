import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  rankingIsOpened = false;
  newGameIsOpened = false;
  userSignUpIsOpened = false;


  toggleRanking(shouldOpen: boolean) {
    this.newGameIsOpened = false;
    this.userSignUpIsOpened = false;
    this.rankingIsOpened = !this.rankingIsOpened;
  }

  toggleNewGame(shouldOpen: boolean) {
    this.rankingIsOpened = false;
    this.userSignUpIsOpened = false;
    this.newGameIsOpened = !this.newGameIsOpened;
  }

  toggleUsersSignUp(shouldOpen: boolean) {
    this.newGameIsOpened = false;
    this.rankingIsOpened = false;
    this.userSignUpIsOpened = !this.userSignUpIsOpened;
  }

}
