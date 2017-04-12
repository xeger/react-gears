import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Note } from '../src';
import { boolean, text } from '@kadira/storybook-addon-knobs';

storiesOf('Note', module)
  .addWithInfo('Live example', () => (
    <Note
      date={new Date()}
      deleted={boolean('deleted', false)}
      edited={boolean('edited', false)}
      editing={boolean('editing', false)}
      from={text('from', 'Gary Thomas')}
      text={text('text', 'Goodbye Cruel World')}
      onCancel={() => alert('Cancel')}
      onChange={() => console.log('Change')}
      onDelete={note => alert('Delete: ' + JSON.stringify(note))}
      onEdit={note => alert('Edit: ' + JSON.stringify(note))}
      onSave={() => alert('Save')}
      onUndelete={note => alert('onUndelete: ' + JSON.stringify(note))}
    />
  ))
  .addWithInfo('with children', () => (
    <Note
      date={new Date()}
      deleted={boolean('deleted', false)}
      edited={boolean('edited', false)}
      editing={boolean('editing', false)}
      from={text('from', 'Aaron Panchal')}
      text={text('text', 'Goodbye cruel world...  I\'m off to join the circus.')}
      onCancel={() => alert('Cancel')}
      onChange={() => console.log('Change')}
      onDelete={note => alert('Delete: ' + JSON.stringify(note))}
      onEdit={note => alert('Edit: ' + JSON.stringify(note))}
      onSave={() => alert('Save')}
      onUndelete={note => alert('onUndelete: ' + JSON.stringify(note))}
    >
      <img src="http://lorempixel.com/200/100/sports/" />
    </Note>
  ));
