import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Component from './Component';

storiesOf('Button')
  .add('default button', () => <Button label="The Button" />);

storiesOf('Component')
  .add('some component', () => <Component />);
