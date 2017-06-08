import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from './Button';

storiesOf('Button')
  .add('default button', () => <Button label="The Button" onClick={action('onClick')} />);
