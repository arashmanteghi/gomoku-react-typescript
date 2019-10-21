import React, { Component } from 'react';

import Item from '../../components/item';
import { initialBoard, checkItem, guessNextMove } from '../../utils/';
import { PERSON_PLAYER, COMPUTER_PLAYER } from '../../utils/constants';

import { BoardWrapper, BoardRow } from './index.style';


export interface BoardPropsTypes {
  size: number,
  onFinished: Function,
};
export interface BoardStatesTypes {
  turn: string,
  lastSelectedRow: number,
  lastSelectedCol: number,
  boardSchema: string[][],
  isFinished: boolean,
};

class Board extends Component<BoardPropsTypes, BoardStatesTypes>{
  constructor(props: BoardPropsTypes) {
    super(props);
    const { size } = props;
    this.state = {
      turn: PERSON_PLAYER,
      lastSelectedRow: -1,
      lastSelectedCol: -1,
      boardSchema: initialBoard(size),
      isFinished: false,
    };
  }

  componentDidUpdate(prevProps: BoardPropsTypes, prevState: BoardStatesTypes) {
    const { turn, isFinished, boardSchema } = this.state;
    if (prevState.turn !== turn && !isFinished) {
      this.checkGameStatus();
    }
    if (turn === COMPUTER_PLAYER && !isFinished) {
      guessNextMove(boardSchema);
    }
  }
  
  checkGameStatus = () => {
    const { boardSchema, lastSelectedRow, lastSelectedCol, turn } = this.state;
    const latestItem = boardSchema[lastSelectedRow][lastSelectedCol];
    if (latestItem !== undefined && checkItem(boardSchema, latestItem, lastSelectedRow, lastSelectedCol)) {
      this.setState({ isFinished: true });
      this.props.onFinished(turn === PERSON_PLAYER ? COMPUTER_PLAYER : PERSON_PLAYER);
    }
  }

  onClick = (row: number, col: number) => {
    const { turn, boardSchema, isFinished } = this.state;
    if (isFinished || boardSchema[row][col]) return;
    let newBoardSchema = boardSchema;
    newBoardSchema[row][col] = turn;
    if (turn === PERSON_PLAYER) {
      this.setState({
        turn: COMPUTER_PLAYER,
        lastSelectedRow: row,
        lastSelectedCol: col,
        boardSchema: newBoardSchema,
      });
      return;
    }
    this.setState({
      turn: PERSON_PLAYER,
      lastSelectedRow: row,
      lastSelectedCol: col,
      boardSchema: newBoardSchema,
    });
  }

  renderColumns(col: number) {
    const { size } = this.props;
    let rows = [];
    for (let row = 0; row < size; row++) {
      rows.push(
        <Item
          value={this.state.boardSchema[row][col]}
          key={row * this.props.size + col}
          onClick={() => this.onClick(row, col)}/>
      );
    }
    return rows;
  }

  renderBoard() {
    const { size } = this.props;
    let columns = [];
    for (let col = 0; col < size; col++) {
      columns.push(
        <BoardRow key={col}>
          {this.renderColumns(col)}
        </BoardRow>
      );
    }
    return columns;
  }

  render() {
    const { size } = this.props;
    return(
      <BoardWrapper columnCount={size}>
        {this.renderBoard()}
      </BoardWrapper>
    );
  }
}

export default Board;