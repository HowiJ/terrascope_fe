/** @format */

import type { TIdea } from './Ideas';

import React, { useEffect, useState } from 'react';
import Ideas from './Ideas';
import Tile from './Tile';
import { StyleSheet, css } from 'aphrodite';
import CreateButton from './CreateButton';

function App(_: {}): React.ReactElement {
  const [ideas, setIdeas] = useState<TIdea[]>([]);

  function fetchIdeas() {
    Ideas.fetchAll().then(data => setIdeas(data));
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

  function updateIdea({ id, title, body }: TIdea): void {
    Ideas.update({ id, title, body });
  }

  function onCreate() {
    Ideas.insert().then(() => fetchIdeas());
  }

  return (
    <div className={css(styles.main)}>
      <CreateButton onClick={onCreate} />
      <div className={css(styles.ideas)}>
        {ideas.map(idea => (
          <Tile key={idea.id} idea={idea} updateIdea={updateIdea} />
        ))}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: '10px',
  },
  ideas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
});

export default App;
