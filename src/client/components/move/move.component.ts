import { Component, OnInit, HostBinding, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-move-cmp',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {

  private gameDataSubscription: Subscription;
  private winnerDataSubscription: Subscription;
  private playerChangedSubscription: Subscription;

  roundNumber: number;
  currentPlayer: string;
  currentPlayerKey: number;
  winner: string = null;
  availableMoves: Array<any>;
  displayNewGame: Boolean = true;
  gameScoreIsOpened = true;

  @HostBinding('class.is-open') @Input()
  isOpen = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {

    // Subscribe component to game service changes
    this.gameDataSubscription = this.gameService.onGameDataChange.subscribe(
      roundNumber => {
        this.roundNumber = roundNumber;
        this.currentPlayer = this.gameService.GetCurrentPlayer();
      }
    );

    this.gameDataSubscription = this.gameService.onGameRulesChanges.subscribe(
      rules => {
        this.availableMoves = rules;
      }
    );

    this.gameDataSubscription = this.gameService.onChangedPlayer.subscribe(
      player => {
        this.currentPlayerKey = player;
      }
    );

    this.winnerDataSubscription = this.gameService.onNewGameWinner.subscribe(
      winner => {
        this.winner = winner;
      }
    );
  }

  toggleScore(shouldOpen: boolean) {
    this.gameScoreIsOpened = !this.gameScoreIsOpened;
  }

  private choise(option: any) {
    this.gameService.SaveGameState(
      {
          round: this.gameService.GetRoundNumber(),
          player: this.gameService.GetCurrentPlayer(),
          option: option
      }
    );
    this.roundNumber = this.gameService.GetRoundNumber();
    this.currentPlayer = this.gameService.GetCurrentPlayer();
  }

  private Restart() {
      this.gameService.InitGame();
  }

}
