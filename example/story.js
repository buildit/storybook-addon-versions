import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from './Button';

storiesOf('Button')
  .add('default button', () => <Button label="The Button" onClick={action('onClick')} />)
  .add('multiple buttons', () => (
    <div>
      <Button label="Button 1" onClick={action('onClick')} />
      <Button label="Button 2" onClick={action('onClick')} />
      <Button label="Button 3" onClick={action('onClick')} />
    </div>
  ));
