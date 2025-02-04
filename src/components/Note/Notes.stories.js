import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import Note from './Note';
import Notes from './Notes';

const moreNotes = [
  {
    id: 1,
    date: new Date(),
    from: 'Aaron Panchal',
    text: 'Hello World as well!',
  },
  {
    id: 2,
    date: new Date(),
    from: 'Gary Thomas',
    text: 'Goodbye Cruel World',
  },
];

export default {
  title: 'Notes',
  component: Notes,
};

export const WithNotesProp = () => {
  const notes = [
    {
      id: 0,
      date: new Date(),
      deleted: boolean('deleted', false),
      edited: boolean('edited', false),
      editing: boolean('editing', false),
      saving: boolean('saving', false),
      from: 'Gary Thomas',
      text: 'Hello World',
    },
    ...moreNotes,
  ];

  return (
    <Notes
      notes={notes}
      onCancel={action('onCancel')}
      onChange={action('onChange')}
      onDelete={action('onDelete')}
      onEdit={action('onEdit')}
      onSave={action('onSave')}
      onUndelete={action('onUndelete')}
    />
  );
};

export const WithChildren = () => {
  const notes = [
    {
      date: new Date(),
      deleted: boolean('deleted', false),
      edited: boolean('edited', false),
      editing: boolean('editing', false),
      saving: boolean('saving', false),
      from: 'Gary Thomas',
      text: 'Hello World',
    },
    ...moreNotes,
  ];

  return (
    <Notes>
      {notes.map((note) => (
        <Note
          note={note}
          onCancel={action('onCancel')}
          onChange={action('onChange')}
          onDelete={action('onDelete')}
          onEdit={action('onEdit')}
          onSave={action('onSave')}
          onUndelete={action('onUndelete')}
          saving={note.saving}
        />
      ))}
    </Notes>
  );
};
