/** @format */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = Readonly<{ onClick: () => void }>;

function CreateButton({ onClick }: Props): React.ReactElement {
  return (
    <button className={css(styles.main)} onClick={onClick}>
      +
    </button>
  );
}

const styles = StyleSheet.create({
  main: {
    ':hover': {
      cursor: 'pointer',
    },
    borderRadius: 100,
    border: 0,
    backgroundColor: '#898989',
    height: '40px',
    width: '40px',
  },
});

export default CreateButton;
