import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatListModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MainComponent } from '../components/main/main.component';
import { RankingComponent } from '../components/ranking/ranking.component';
import { CreateNewGameComponent } from '../components/create-new-game/create-new-game.component';
import { PlayerComponent } from '../components/create-new-game/player/player.component';
import { MoveComponent } from '../components/move/move.component';
import { ScoreComponent } from '../components/score/score.component';
import { GameService } from '../services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RankingComponent,
    CreateNewGameComponent,
    PlayerComponent,
    MoveComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
