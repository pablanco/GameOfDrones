import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { PARAMS } from '../../environments/config';


@Injectable()
export class GameService {

  // Service data event Change
  public onGameDataChange: Subject<any> = new Subject<any>();
  public onNewGameWinner: Subject<any> = new Subject<any>();
  public onScoreChange: Subject<any> = new Subject<any>();
  public onGameSaved: Subject<any> = new Subject<any>();
  public onChangedPlayer: Subject<any> = new Subject<any>();
  public onGameRulesChanges: Subject<any> = new Subject<any>();

  private host: string = PARAMS.API;
  private moves: Array<any>;
  private currentPlayer: number;
  private currentRound: number;
  private gameState: Array<any> = [];
  private winnerByRound: Array<any> = [];
  private matchWinner: any;
  private matchLoser: any;
  private players: Array<any> = [];

  private coll: any;

  constructor(private http: HttpClient) {}

  InitGame(): boolean {

    let gameCreated: any = false;

    if (this.players.length === 2 ) {
      // Initialize game
      this.currentPlayer = 0;
      this.currentRound = 1;
      this.gameState = [];
      this.winnerByRound = [];
      this.matchWinner = null;
      this.matchLoser = null;

      // Broadcast Data Change
      this.onGameDataChange.next(this.currentRound);
      this.onNewGameWinner.next(null);
      this.onScoreChange.next(null);
      gameCreated = true;

      this.GetGameRules().subscribe(
        rules => {
          this.moves = rules.data;
          this.onGameRulesChanges.next(this.moves);
        }
      );


    } else {
      console.log(this.players);
      console.log('Missing player');
    }

    return gameCreated;

  }

  SwitchPlayer() {
    this.currentPlayer = (this.currentPlayer === 0) ? 1 : 0;
    this.onChangedPlayer.next(this.currentPlayer);
  }

  GetAvailableMoves() {
    return this.moves;
  }

  GetCurrentPlayer(): string {
    return this.players[this.currentPlayer].playerName;
  }

  SavePlayer(name: string) {
    this.players.push({ playerName: name });
  }

  ClearPlayers() {
    this.players = [];
  }

  IsRoundFinished(): boolean {
    return (this.currentPlayer === (this.players.length - 1));
  }

  GetRoundNumber(): number {
    return this.currentRound;
  }

  SaveGameState(state: any): void {
    // Save the state of the current game
    this.gameState.push(state);
    // Checks if round ends
    if (this.IsRoundFinished()) {
      this.AnalizeRoundWinner();
      this.SwitchPlayer();
      // Checks if match ends
      this.AnalizeMatchWinner();
      // Send game data to server
      if (this.matchWinner !== null) {
        this.SaveGame(
          {
            winner: this.players[this.matchWinner].playerName,
            looser: this.players[this.matchLoser].playerName
          }
        ).subscribe(
          result => {
            if (result !== null) {
              // Broadcast Data Change
              this.onGameSaved.next(true);
            }
          }
        );
      }
    } else {
      this.SwitchPlayer();
    }
  }

  private AnalizeRoundWinner() { // TODO: Ver que pasa con los empates!!

    let moveFlag = true;
    let move, kills: any = null;
    let winner: number = null;

    this.gameState.forEach(element => {
      if (element.round === this.currentRound) {
        if (moveFlag) {
          move = element.option;
          moveFlag = !moveFlag;
        } else {
          kills = element.option;
        }
      }
    });

    if (move && kills) {

      // Verifies if players tie
      if (move !== kills) {
        this.moves.forEach(element => {
          if (JSON.stringify({ move: move, kills: kills }) === JSON.stringify(element)) {
            winner = 0;
            return null;
          }
        });
        winner = (winner !== null) ? winner : 1;
      }

      this.winnerByRound.push(
        {
          round: this.currentRound,
          winner: winner,
          moveOne: move,
          moveTwo: kills,
          winnerName: (winner !== null) ? this.players[winner].playerName : 'TIE'
        }
      );
      // Broadcast Data Change
      this.onScoreChange.next(this.winnerByRound);
    }
  }

  private AnalizeMatchWinner() {

    let matchFinished = false;
    // Verifies if player #1 is the winner, otherways player #2 wins
    const winsCountPlayerOne: any = (JSON.stringify(this.winnerByRound).match(/"winner":0/g) || []).length;
    const winsCountPlayerTwo: any = (JSON.stringify(this.winnerByRound).match(/"winner":1/g) || []).length;

    if (winsCountPlayerOne === 3) {
      this.matchWinner = 0;
      this.matchLoser  = 1;
      matchFinished = true;

    } else if (winsCountPlayerTwo === 3) {
      this.matchWinner = 1;
      this.matchLoser  = 0;
      matchFinished = true;
    }

    if (matchFinished) {
      // Broadcast Data Change
      this.onNewGameWinner.next(this.players[this.matchWinner].playerName);
    } else {
      this.currentRound++;
    }
  }

  GetUsers(): Observable<any> {

    // Set the request
    const url = this.host + '/games/get';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // Send request to API
    return this.http.get(url);
  }

  GetGameRules(): Observable<any> {

    // Set the request
    const url = this.host + '/rules/get';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // Send request to API
    return this.http.get(url);
  }

  SaveGame(gameDate: any): Observable<any> {

    // Set the request
    const url = this.host + '/games/create';
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const body: any = gameDate;
    // Send request to API
    return this.http.post(url, body);
  }

}
