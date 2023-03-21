/** @format */

import type { TIdea } from './Ideas';

import React, { useEffect, useState } from 'react';
import Ideas from './Ideas';
import Tile from './Tile';
import { StyleSheet, css } from 'aphrodite';

function App(_: {}): React.ReactElement {
  const [ideas, setIdeas] = useState<TIdea[]>([]);

  useEffect(() => {
    Ideas.fetchAll().then((data) => setIdeas(data));
  }, []);

  function updateIdea({ id, title, body }: TIdea): void {
    Ideas.update({ id, title, body });
  }

  return (
    <div className={css(styles.main)}>
      {ideas.map((idea) => (
        <Tile key={idea.id} idea={idea} updateIdea={updateIdea} />
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '10px',
  },
});

export default App;
