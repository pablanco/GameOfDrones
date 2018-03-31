import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Output() toggleRanking: EventEmitter<null> = new EventEmitter();
  @Output() toggleUsersSignUp: EventEmitter<null> = new EventEmitter();

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  private UsersSignUp() {
    this.gameService.ClearPlayers();
    this.toggleUsersSignUp.emit();
  }

  private ShowRanking() {
    this.toggleRanking.emit();
  }

}
