import { Component, OnInit, ViewChild, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { PlayerComponent } from './player/player.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-create-new-game',
  templateUrl: './create-new-game.component.html',
  styleUrls: ['./create-new-game.component.css']
})
export class CreateNewGameComponent implements OnInit {

  @ViewChild('PlayerComponent') playerComponent_1: PlayerComponent;
  @ViewChild('PlayerComponent') playerComponent_2: PlayerComponent;
  @HostBinding('class.is-open') @Input() isOpen = false;
  @Output() toggleNewGame: EventEmitter<null> = new EventEmitter();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      playerName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      playerName: ['', Validators.required]
    });
  }

  get frmStepOne() {
    return this.playerComponent_1 ? this.playerComponent_1.frmStepOne : null;
  }
  get frmStepTwo() {
    return this.playerComponent_2 ? this.playerComponent_2.frmStepOne : null;
  }

  private SaveUsers(gameData: any) {
    // Save de user to the current game
    if (gameData.playerName && gameData.playerName !== '') {
      this.gameService.SavePlayer(gameData.playerName);
      // If its done, Initialize the game
      if (gameData.start) {
        if (this.gameService.InitGame()) {
          this.toggleNewGame.emit();
        }
      }
    } else {
      console.log('Player name can not be empty');
    }

  }

}

