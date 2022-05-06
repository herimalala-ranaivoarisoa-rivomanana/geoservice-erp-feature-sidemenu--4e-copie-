import React from 'react';
import { render } from '@testing-library/react';
import {
  Home,
  HomeWording
} from '../index';

test('renders without crashing', () => {
  const { baseElement } = render(<Home wording={HomeWording} />);
  expect(baseElement).toBeDefined();
});
