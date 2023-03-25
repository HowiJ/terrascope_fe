/** @format */

import type { TIdea } from './Ideas';

import React, { useEffect, useState, useMemo } from 'react';
import Ideas from './Ideas';
import Tile from './Tile';
import Sorter, { Sorting, sorter } from './Sorter';
import { StyleSheet, css } from 'aphrodite';
import CreateButton from './CreateButton';

function App(_: {}): React.ReactElement {
  const [ideas, setIdeas] = useState<TIdea[]>([]);
  const [sorting, setSorting] = useState<Sorting>(Sorting.CREATED_DATE_ASC);

  function fetchIdeas() {
    Ideas.fetchAll().then(data => setIdeas(data));
  }
  function updateIdea({ id, title, body }: TIdea): void {
    Ideas.update({ id, title, body }).then(() => fetchIdeas());
  }
  function onCreate() {
    Ideas.insert().then(() => fetchIdeas());
  }
  function deleteIdea(id: number): void {
    Ideas.delete(id).then(() => fetchIdeas());
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

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
