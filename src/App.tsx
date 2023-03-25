/** @format */

import type { Idea } from './Ideas';

import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, css } from 'aphrodite';

import CreateButton from './CreateButton';
import IdeaHandler from './Ideas';
import Sorter, { Sorting, sorter } from './Sorter';
import Tile from './Tile';
import Saving, { SaveState } from './Saving';

function App(_: Readonly<{}>): React.ReactElement {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [sorting, setSorting] = useState<Sorting>(Sorting.CREATED_DATE_ASC);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.INITIAL);

  function fetchIdeas() {
    IdeaHandler.fetchAll().then(data => {
      setIdeas(data);
    });
  }
  function reFetch() {
    fetchIdeas();
    setSaveState(SaveState.SAVED);
  }
  function updateIdea({ id, title, body }: Idea): void {
    setSaveState(SaveState.SAVING);
    IdeaHandler.update({ id, title, body }).then(reFetch);
  }
  function onCreate() {
    setSaveState(SaveState.SAVING);
    IdeaHandler.insert().then(reFetch);
  }
  function deleteIdea(id: number): void {
    setSaveState(SaveState.SAVING);
    IdeaHandler.delete(id).then(reFetch);
  }

  useEffect(fetchIdeas, []);

  const sortedIdeas = useMemo(
    () => [...ideas].sort(sorter(sorting)),
    [sorting, ideas]
  );

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.header)}>
        <CreateButton onClick={onCreate} />
        <Sorter
          value={sorting}
          onChange={(sorting: Sorting) => setSorting(sorting)}
        />
        {saveState !== SaveState.INITIAL && <Saving state={saveState} />}
      </div>
      <div className={css(styles.ideas)}>
        {sortedIdeas.map(idea => (
          <Tile
            deleteIdea={deleteIdea}
            idea={idea}
            key={idea.id}
            updateIdea={updateIdea}
          />
        ))}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: '10px',
  },
  header: {
    display: 'flex',
    gap: '8px',
  },
  ideas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
});

export default App;
