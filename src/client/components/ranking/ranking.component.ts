import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  private gameSavedSubscription: Subscription;

  @HostBinding('class.is-open') @Input()
  isOpen = false;

  displayedColumns = ['position', 'match', 'winner', 'date'];
  dataSource = new MatTableDataSource();

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {

    // Initialize data
    this.LoadRankingData();

    // Subscribe to ranking changes
    this.gameSavedSubscription = this.gameService.onGameSaved.subscribe(
      saved => {
        this.LoadRankingData();
      }
    );

  }

  LoadRankingData() {
    this.gameService.GetUsers().subscribe(
      result => {
        if (result !== null && result.data.length > 0) {
          this.dataSource.data = result.data.map( (match, i) => {
            return {position: (i + 1), winner: match.winner, looser: match.looser, date: match.createDate};
          });
        }
      }
    );
  }

  applyFilter(filterValue: string) {
    // Filter Data Table
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

export interface Element {
  winner: string;
  looser: string;
  position: number;
  date: Date;
}
