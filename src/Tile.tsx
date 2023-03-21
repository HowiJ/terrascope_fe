/** @format */

import type { FormEvent } from 'react';
import type { TIdea } from './Ideas';

import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

type Props = Readonly<{
  idea: TIdea;
  updateIdea: (idea: TIdea) => void;
}>;

function Tile({ idea, updateIdea }: Props): React.ReactElement {
  const [title, setTitle] = useState(idea.title);
  const [body, setBody] = useState(idea.body);

  function onBlur(): void {
    if (title !== idea.title || body !== idea.body) {
      updateIdea({ ...idea, title, body });
    }
  }

  return (
    <div className={css(styles.main)}>
      <div className={css(styles.title)}>
        <input
          className={css(styles.titleInput)}
          onBlur={() => onBlur()}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
          placeholder="Idea..."
          value={title}
        />
      </div>
      <div className={css(styles.body)}>
        <textarea
          className={css(styles.bodyTextarea)}
          maxLength={140}
          onBlur={() => onBlur()}
          onChange={(e: FormEvent<HTMLTextAreaElement>) =>
            setBody(e.currentTarget.value)
          }
          placeholder="Enter your idea..."
          value={body}
        />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#7F9488',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    width: '150px',
  },
  title: {
    borderBottom: '2px solid white',
    padding: '10px',
  },
  titleInput: {
    width: '100%',
    height: '100%',
    border: 0,
    background: 'none',
    color: 'white',
    fontFamily: 'inherit',
    fontSize: 'inherit',
  },
  body: {
    flex: '1 1 auto',
    fontSize: '10px',
    padding: '10px',
  },
  bodyTextarea: {
    background: 'none',
    border: 0,
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '10px',
    height: '100%',
    overflow: 'hidden',
    resize: 'none',
    width: '100%',
  },
});

export default Tile;