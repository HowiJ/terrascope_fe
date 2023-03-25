import type { ReactElement } from 'react';

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

enum SaveState {
  INITIAL,
  SAVING,
  SAVED,
}

type Props = Readonly<{
  state: SaveState;
}>;

const DisplayText: { [key in SaveState]: string } = {
  [SaveState.INITIAL]: '',
  [SaveState.SAVING]: 'Saving...',
  [SaveState.SAVED]: 'Saved!',
};

function Saving({ state }: Props): ReactElement {
  return (
    <div
      className={css(
        styles.saving,
        state === SaveState.SAVING && styles.isSaving,
        state === SaveState.SAVED && styles.isSaved
      )}
    >
      {DisplayText[state]}
    </div>
  );
}

const styles = StyleSheet.create({
  saving: {
    borderRadius: '8px',
    verticalAlign: 'middle',
    padding: '12px',
    fontSize: '10px',
    fontFamily: 'Segoe UI, Roboto',
  },
  isSaving: {
    color: 'orange',
  },
  isSaved: {
    color: 'green',
  },
});

export { SaveState };
export default Saving;
