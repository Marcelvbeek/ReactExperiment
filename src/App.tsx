import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Experiment } from './lib/components/Experiment';
import { CookieProvider } from './lib/providers/examples/CookieProvider';
import { Variant } from './lib/components/Variant';
import { GtagProvider } from 'lib/providers/examples/GtagProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Experiment experimentFlag='homepage' experimentProvider={new CookieProvider()}>
          <Variant variantName="test">
            Test
          </Variant>
          <Variant variantName="control">
            Control
          </Variant>
        </Experiment>
      </header>
    </div>
  );
}

export default App;
