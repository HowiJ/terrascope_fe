import type { ReactElement } from 'react';

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = Readonly<{
  onClick: () => void;
}>;

function Trash({ onClick }: Props): ReactElement {
  return (
    <div className={css(styles.trash)} onClick={onClick}>
      X
    </div>
  );
}

const styles = StyleSheet.create({
  trash: {
    backgroundColor: '#353543',
    borderRadius: '20px',
    cursor: 'pointer',
    display: 'none',
    fontSize: '16px',
    height: '20px',
    position: 'absolute',
    right: '-8px',
    textAlign: 'center',
    top: '-8px',
    userSelect: 'none',
    width: '20px',
  },
});

export default Trash;
