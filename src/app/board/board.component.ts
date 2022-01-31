import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  winner: string = '';
  player: string = 'X';
  board: string[] = [];
  constructor() { }
  newGame() {
    this.board = [];
    for (let counter = 0; counter < 9; counter++) {
      this.board.push(' ')
    }
    this.player = 'O';
    this.winner = '';
  }
  ngOnInit(): void {
    this.newGame();
  }
  GameWon(winner: string) {
    this.winner = 'Player ' + winner + ' has won the game!';
    setTimeout(this.newGame, 2000);
  }
  makeMove(index: number) {
    this.winner = '';
    if (this.board[index] == ' ') {
      this.board[index] = this.player;
      this.player = this.player == 'X' ? this.player = 'O' : this.player = 'X';
    }
    else if (this.winner[0] !== 'P') {
      this.winner = 'This box has been already marked by player ' + this.board[index];
    }
    this.calculateWinner();
  }
  // for (let counter = 0; counter < 3; counter++) {
  //   for (let count = 0; count < 3; count++) {
  //     if (arr[counter].every( (val, i, arr) => val === arr[0] ) && !arr[counter].includes(' ')) {
  //       //this.GameWon(arr[counter][0]);
  //     }
  //      }
  //   }
  // }
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.GameWon(this.board[a]);
      }
    }
    return '';
  }
}

