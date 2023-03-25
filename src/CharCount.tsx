import type { ReactElement } from 'react';

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = Readonly<{
  charCount: number;
  maxCount: number;
}>;

function CharCount({ charCount, maxCount }: Props): ReactElement {
  return <div className={css(styles.main)}>{maxCount - charCount}</div>;
}

const styles = StyleSheet.create({
  main: {
    bottom: '8px',
    color: 'lightgray',
    fontSize: '8px',
    position: 'absolute',
    right: '24px',
  },
});
export default CharCount;
