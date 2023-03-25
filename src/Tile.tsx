/** @format */

import type { FormEvent, ReactElement } from 'react';
import type { TIdea } from './Ideas';

import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Trash from './Trash';
import CharCount from './CharCount';

const MAX_CHAR_COUNT = 140;
const DIFF_TO_SHOW = 15;

type Props = Readonly<{
  deleteIdea: (id: number) => void;
  idea: TIdea;
  updateIdea: (idea: TIdea) => void;
}>;

function Tile({ deleteIdea, idea, updateIdea }: Props): ReactElement {
  const [title, setTitle] = useState(idea.title);
  const [body, setBody] = useState(idea.body);

  function onBlur(): void {
    if (title !== idea.title || body !== idea.body) {
      updateIdea({ ...idea, title, body });
    }
  }

  function onDelete(): void {
    deleteIdea(idea.id);
  }

  return (
    <div className={css(styles.main)}>
      <Trash onClick={onDelete} />
      <div className={css(styles.title)}>
        <input
          className={css(styles.titleInput)}
          maxLength={21}
          onBlur={onBlur}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
          placeholder="Idea..."
          value={title}
          autoFocus={true}
        />
      </div>
      <div className={css(styles.body)}>
        <textarea
          className={css(styles.bodyTextarea)}
          maxLength={140}
          onBlur={onBlur}
          onChange={(e: FormEvent<HTMLTextAreaElement>) =>
            setBody(e.currentTarget.value)
          }
          placeholder="Enter your idea..."
          value={body}
        />
      </div>
      {MAX_CHAR_COUNT - body.length <= DIFF_TO_SHOW && (
        <CharCount charCount={body.length} maxCount={MAX_CHAR_COUNT} />
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  main: {
    ':hover :first-child': {
      display: 'inline',
    },
    backgroundColor: '#7F9488',
    borderRadius: '4px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    position: 'relative',
    width: '150px',
  },
  title: {
    borderBottom: '2px solid white',
    padding: '4px 10px',
  },
  titleInput: {
    background: 'none',
    border: 0,
    borderColor: 'light grey',
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '12px',
    height: '100%',
    overflow: 'visible',
    width: '100%',
  },
  body: {
    flex: '1 1 auto',
    fontSize: '11px',
    padding: '4px 4px 8px 4px',
    display: 'flex',
  },
  bodyTextarea: {
    background: 'none',
    border: 0,
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '10px',
    height: '100%',
    outlineColor: 'lightgray',
    resize: 'none',
    width: '100%',
  },
});

export default Tile;
