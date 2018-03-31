import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  private scoreDataSubscription: Subscription;
  scores: Array<any>;

  @HostBinding('class.is-open') @Input()
  isOpen = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    // Subscribe to game data changes
    this.scoreDataSubscription = this.gameService.onScoreChange.subscribe(
      newScore => {
        this.scores = newScore;
      }
    );
  }

}
