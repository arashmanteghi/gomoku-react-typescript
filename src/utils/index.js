import { PERSON_PLAYER } from './constants';

export const initialBoard = size => {
  let board = [];
  for (let counter = 0; counter < size; counter++) {
    board[counter] = new Array(size);
  }
  return board;
}

export const isArrayFiveInRow = (array, targetItem) => array.filter(itm => (itm === targetItem)).length === 5;

export const checkItem = (board, item, row, col) => {
  let array = [];
  for (let i = 0; i <= 4; i += 1) {
    for ( let j = ((col - 4) + i); j <= (col + i); j += 1) {
      if (j < 0 || j >= board.length) continue;
      array.push(board[row][j]);
    }
    if (isArrayFiveInRow(array, item)) {
      return true;
    }
    array = [];
  }
  for (let i = 0; i <= 4; i += 1) {
    for ( let j = ((row - 4) + i); j <= (row + i); j += 1) {
      if (j < 0 || j >= board.length) continue;
      array.push(board[j][col]);
    }
    if (isArrayFiveInRow(array, item)) {
      return true;
    }
    array = [];
  }
  for (let i = 0; i <= 4; i += 1) {
    for ( let j = ((col - 4) + i); j <= (col + i); j += 1) {
      for ( let y = ((row - 4) + i); y <= (row + i); y += 1) {
        if (j < 0 || j >= board.length || y < 0 || y >= board.length) continue;
        if ((y - j) === (row - col)) {
          array.push(board[y][j]);
        }
      }
    }
    if (isArrayFiveInRow(array, item)) {
      return true;
    }
    array = [];
  }

  for (let i = 0; i <= 4; i += 1) {
    for ( let j = ((col - 4) + i); j <= (col + i); j += 1) {
      for ( let y = ((row + 4) - i); y >= (row - i); y -= 1) {
        if (j < 0 || j >= board.length || y < 0 || y >= board.length) continue;
        if ((y + j) === (row + col)) {
          array.push(board[y][j]);
        }
      }
    }
    if (isArrayFiveInRow(array, item)) {
      return true;
    }
    array = [];
  }
  return false;
}


export const guessNextMove = board => {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board.length; j += 1) {
      if (board[i][j] === PERSON_PLAYER) {
        console.log('should check neighbors of this item or other white circle to guess the next move. it needs AI and it will be completed soon');
      }
    }
  }
}