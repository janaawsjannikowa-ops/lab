// src/Lab1.jsx
import React from 'react';
import './Lab1.css';

const Lab1 = () => {
  
  // ЗАДАНИЕ 1: Сегодняшняя дата
  const Task1 = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return (
      <div className="task-card">
        <h3>📅 Задание 1: Сегодняшняя дата</h3>
        <div className="date-container">
          <div className="date-main">{formattedDate}</div>
        </div>
      </div>
    );
  };
  
  // ЗАДАНИЕ 2: Таблица акций
  const Task2 = () => {
    const stocksData = [
      { stock_name: "EFX", company_name: "Equifax Inc", price: 163.55, currency: "USD", change: "+9.03" },
      { stock_name: "IRM", company_name: "Iron Mountain Inc", price: 33.21, currency: "USD", change: "+1.42" },
      { stock_name: "NTAP", company_name: "NetApp Inc", price: 54.81, currency: "USD", change: "-6.01" },
      { stock_name: "CTL", company_name: "Centurylink Inc", price: 13.79, currency: "USD", change: "-1.37" }
    ];
    
    return (
      <div className="task-card">
        <h3>📊 Задание 2: Фондовая биржа</h3>
        <table className="stocks-table">
          <thead>
            <tr><th>Тикер</th><th>Компания</th><th>Цена</th><th>Изменение</th></tr>
          </thead>
          <tbody>
            {stocksData.map((stock, i) => (
              <tr key={i}>
                <td><strong>{stock.stock_name}</strong></td>
                <td>{stock.company_name}</td>
                <td>{stock.price} {stock.currency}</td>
                <td style={{ color: parseFloat(stock.change) > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                  {parseFloat(stock.change) > 0 ? '▲' : '▼'} {stock.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  // ЗАДАНИЕ 3: Шахматная доска с нотациями со всех сторон
  const Task3 = () => {
    // Создание доски 8x8
    const renderBoard = () => {
      const board = [];
      for (let row = 0; row < 8; row++) {
        const cells = [];
        for (let col = 0; col < 8; col++) {
          const isBlack = (row + col) % 2 === 1;
          cells.push(<div key={col} className={`cell ${isBlack ? 'black' : 'white'}`} />);
        }
        board.push(<div key={row} className="row">{cells}</div>);
      }
      return board;
    };

    // Левая нотация (цифры)
    const leftNotation = () => {
      const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
      return (
        <div className="left-notation">
          {numbers.map(num => <div key={num} className="num">{num}</div>)}
        </div>
      );
    };

    // Правая нотация (цифры)
    const rightNotation = () => {
      const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
      return (
        <div className="right-notation">
          {numbers.map(num => <div key={num} className="num">{num}</div>)}
        </div>
      );
    };

    // Верхняя нотация (буквы)
    const topNotation = () => {
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      return (
        <div className="top-notation">
          <div className="corner"></div>
          {letters.map(letter => <div key={letter} className="letter">{letter}</div>)}
          <div className="corner"></div>
        </div>
      );
    };

    // Нижняя нотация (буквы)
    const bottomNotation = () => {
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      return (
        <div className="bottom-notation">
          <div className="corner"></div>
          {letters.map(letter => <div key={letter} className="letter">{letter}</div>)}
          <div className="corner"></div>
        </div>
      );
    };

    return (
      <div className="task-card">
        <h3>♟️ Задание 3: Шахматная доска</h3>
        
        <div className="chess-full">
          {topNotation()}
          <div className="chess-middle">
            {leftNotation()}
            <div className="board">{renderBoard()}</div>
            {rightNotation()}
          </div>
          {bottomNotation()}
        </div>
      </div>
    );
  };
  
  return (
    <div className="lab1-container">
      <h2>Лабораторная работа №1</h2>
      <Task1 />
      <Task2 />
      <Task3 />
    </div>
  );
};

export default Lab1;