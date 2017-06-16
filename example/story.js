import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button')
  .add('default button', () => <Button label="The Button" />);
