import { boolean, select, text } from '@storybook/addon-knobs';
import { action, storiesOf } from '@storybook/react';
import React from 'react';
import { Input } from 'reactstrap';

import {
  AddressInput,
  HasManyFields,
  HasManyFieldsAdd,
  HasManyFieldsRow
} from '../src';

const items = [
  {
    address1: '50 Castilian Dr.',
    city: 'Goleta',
    state: 'CA',
    postal: '93117',
    countryCode: 'US'
  }
];

storiesOf('HasManyFields', module)
  .addWithInfo('Row Wrapper', () =>
    <HasManyFieldsRow
      onDelete={action('onDelete')}
      disabled={boolean('disabled', false)}
      disabledReason={text('disabledReason')}
      disabledReasonPlacement={select('placement', ['top', 'left', 'bottom', 'right'], 'top')}
    >
      <Input
        defaultValue="I can put an input (or whatever else) inside a HasManyFieldsRow"
      />
    </HasManyFieldsRow>
  )
  .addWithInfo('Add Item Button', () =>
    <HasManyFieldsAdd onClick={action('onClick')}>
      Button Label Content
    </HasManyFieldsAdd>
  )
  .addWithInfo('Full Example', () =>
    <HasManyFields
      defaultValue={items}
      template={AddressInput}
      blank={{ countryCode: 'US' }}
      label="Add an Address"
      disabled={boolean('disabled', false)}
      onAdd={action('hasManyFields onAdd')}
      onRemove={action('hasManyFields onRemove')}
      onUpdate={action('hasManyFields onUpdate')}
      onChange={action('hasManyFields onChange')}
    />
  );
