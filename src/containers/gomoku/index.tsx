import React, { Component } from 'react';

import Board from '../board';
import GlobalStyle from '../../globalStyle';
import { Title, Description, Winner } from './index.style';

export interface MyClassProps {};
export interface MyClassStates { winner: string };


export default class Gomoku extends Component<MyClassProps, MyClassStates>{

  constructor(props: object) {
    super(props);
    this.state = {
      winner: '',
    }
  }

  handleFinished = (winner: string) => {
    this.setState({ winner });
  }

  render() {
    const { winner } = this.state;
    return (
      <>
        <GlobalStyle />
        <Title>Gomoku Game</Title>
        <Description>Get five same color circle in row to win (assume black circle is computer, but it need to a human play instead of computer till an AI adds to project)</Description>
        <Winner>winner: {winner ? winner : '?'}</Winner>
        <Board
          size={12}
          onFinished={(winner: string) => this.handleFinished(winner)}
        />
      </>
    );
  }
}
