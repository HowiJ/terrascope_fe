import type { ReactElement } from 'react';

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const MAX_CHAR_COUNT = 140;
const DIFF_TO_SHOW = 15;

type Props = Readonly<{
  charCount: number;
}>;

function CharCount({ charCount }: Props): ReactElement | null {
  if (MAX_CHAR_COUNT - charCount > DIFF_TO_SHOW) {
    return null;
  }
  return <div className={css(styles.main)}>{MAX_CHAR_COUNT - charCount}</div>;
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
