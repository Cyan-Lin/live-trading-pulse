import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './index';

describe('App', () => {
  it('renders the dashboard architecture shell', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /live trading pulse/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /domain layout/i,
      }),
    ).toBeInTheDocument();
  });
});
