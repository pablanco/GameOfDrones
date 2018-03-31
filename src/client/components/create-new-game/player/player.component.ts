import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNewGameComponent } from '../create-new-game.component';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    @Output() finished = new EventEmitter<any>();
    @Output() selectionChange = new EventEmitter<boolean>();
    @Input() lastOne: boolean;
    frmStepOne: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.frmStepOne = this.formBuilder.group({
            playerName: ['', Validators.required]
        });
    }

    StoreUser(e: any) {
        this.finished.emit({playerName: this.frmStepOne.value.playerName, start: false});

    }

    FinishRegistry() {
        // TODO: validate fields
        this.finished.emit({playerName: this.frmStepOne.value.playerName, start: true});
    }

}
