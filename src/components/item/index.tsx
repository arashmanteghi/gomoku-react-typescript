import React from 'react';

import { PERSON_PLAYER, COMPUTER_PLAYER } from '../../utils/constants';
import { ItemWrapper } from './index.style';


const generateColor = (value: string) => {
  if (value === PERSON_PLAYER) {
    return '#FEFEFE';
  } else if (value === COMPUTER_PLAYER) {
    return '#363636';
  }
  return 'none';
};

export interface ItemPropsTypes {
  value: string,
  onClick: Function,
}

const Item = (props: ItemPropsTypes) => {
  return (
    <ItemWrapper
      onClick={() => props.onClick()}
    >
      <svg height="40" width="40">
        <circle cx='20' cy='20' r='8' fill={generateColor(props.value)} />
      </svg>
    </ItemWrapper>
  );
};

export default Item;
