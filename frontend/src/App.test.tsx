import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from 'App';

describe("App test", () => {
  test('renders main page', () => {
    render(<App />);
    const linkElement = screen.getByText(/Is It Prime\?/);
    expect(linkElement).toBeDefined();
  });
});
