import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div>
    <h1>Welcome to HearthStone</h1>
    <button>
      <Link to="/game/new">New game</Link>
    </button>
  </div>
);
