import type { ReactElement, FormEvent } from 'react';
import type { TIdea } from './Ideas';

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

enum Sorting {
  CREATED_DATE_ASC,
  CREATED_DATE_DESC,
  TITLE_ASC,
  TITLE_DESC,
}

const sortingDisplay: { [key in Sorting]: string } = {
  [Sorting.CREATED_DATE_ASC]: 'Created Date ↑',
  [Sorting.CREATED_DATE_DESC]: 'Created Date ↓',
  [Sorting.TITLE_ASC]: 'Title ↑',
  [Sorting.TITLE_DESC]: 'Title ↓',
};

type Props = Readonly<{
  value: Sorting;
  onChange: (sorting: Sorting) => void;
}>;

function Sorter({ value, onChange }: Props): ReactElement {
  return (
    <select
      className={css(styles.main)}
      value={value}
      onChange={(e: FormEvent<HTMLSelectElement>): void => {
        const newValue = parseInt(e.currentTarget.value, 10);
        if (newValue in Sorting) {
          onChange(newValue);
        }
      }}
    >
      <option value={Sorting.CREATED_DATE_ASC}>
        {sortingDisplay[Sorting.CREATED_DATE_ASC]}
      </option>
      <option value={Sorting.CREATED_DATE_DESC}>
        {sortingDisplay[Sorting.CREATED_DATE_DESC]}
      </option>
      <option value={Sorting.TITLE_ASC}>
        {sortingDisplay[Sorting.TITLE_ASC]}
      </option>
      <option value={Sorting.TITLE_DESC}>
        {sortingDisplay[Sorting.TITLE_DESC]}
      </option>
    </select>
  );
}

function sorter(sorting: Sorting): (a: TIdea, b: TIdea) => number {
  return function sortFn(a: TIdea, b: TIdea): number {
    switch (sorting) {
      case Sorting.TITLE_ASC:
        return a.title.localeCompare(b.title);
      case Sorting.TITLE_DESC:
        return b.title.localeCompare(a.title);
      case Sorting.CREATED_DATE_ASC:
        return a.created_date < b.created_date ? -1 : 1;
      case Sorting.CREATED_DATE_DESC:
        return a.created_date > b.created_date ? -1 : 1;
      default:
        return 0;
    }
  };
}

const styles = StyleSheet.create({
  main: {
    padding: '12px',
    borderRadius: '8px',
  },
});

export { Sorting, sorter };
export default Sorter;
