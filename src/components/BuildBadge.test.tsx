import { render, screen } from '@testing-library/react';
import BuildBadge from './BuildBadge';

describe('BuildBadge', () => {
  it('displays the formatted build time', () => {
    // Setup
    const expected = new Date(__BUILD_TIME__).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short',
    });

    // Act
    render(<BuildBadge />);

    // Assert
    expect(screen.getByText(`built ${expected}`)).toBeInTheDocument();
  });

  it('has the raw ISO timestamp as a title for tooltips', () => {
    // Act
    render(<BuildBadge />);

    // Assert
    expect(screen.getByTitle(__BUILD_TIME__)).toBeInTheDocument();
  });
});
