// src/App.jsx
import React, { useState } from 'react';
import Lab1 from './Lab1';
import Lab2 from './Lab2';
import Lab3 from './Lab3';
import Lab4 from './Lab4';
import Lab5 from './Lab5';
import './App.css';

function App() {
  const [activeLab, setActiveLab] = useState(5);

  const renderLab = () => {
    switch(activeLab) {
      case 1:
        return <Lab1 />;
      case 2:
        return <Lab2 />;
      case 3:
        return <Lab3 />;
      case 4:
        return <Lab4 />;
      case 5:
        return <Lab5 />;
      default:
        return <Lab5 />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Лабораторные работы по React</h1>
        <nav className="lab-nav">
          <button 
            className={`nav-btn ${activeLab === 1 ? 'active' : ''}`}
            onClick={() => setActiveLab(1)}
          >
            Лабораторная №1
          </button>
          <button 
            className={`nav-btn ${activeLab === 2 ? 'active' : ''}`}
            onClick={() => setActiveLab(2)}
          >
            Лабораторная №2
          </button>
          <button 
            className={`nav-btn ${activeLab === 3 ? 'active' : ''}`}
            onClick={() => setActiveLab(3)}
          >
            Лабораторная №3
          </button>
          <button 
            className={`nav-btn ${activeLab === 4 ? 'active' : ''}`}
            onClick={() => setActiveLab(4)}
          >
            Лабораторная №4
          </button>
          <button 
            className={`nav-btn ${activeLab === 5 ? 'active' : ''}`}
            onClick={() => setActiveLab(5)}
          >
            Лабораторная №5
          </button>
        </nav>
      </header>
      <main className="app-main">
        {renderLab()}
      </main>
    </div>
  );
}

export default App;
