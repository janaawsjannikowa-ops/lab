// src/Lab3.jsx
import React, { Component } from 'react';
import './Lab3.css';

// ========== ЗАДАНИЕ 1: Форма с валидацией email ==========
class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      messageType: '' // 'success' или 'error'
    };
  }

  // Валидация email
  validateEmail = (email) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Обработчик изменения поля ввода
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
      message: '',
      messageType: ''
    });
  };

  // Обработчик отправки формы
  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;

    if (!email) {
      this.setState({
        message: 'Пожалуйста, введите email адрес',
        messageType: 'error'
      });
      return;
    }

    if (this.validateEmail(email)) {
      this.setState({
        message: `✅ Письмо успешно отправлено на ${email}!`,
        messageType: 'success',
        email: ''
      });
    } else {
      this.setState({
        message: '❌ Ошибка: Введите корректный email адрес (пример: name@domain.com)',
        messageType: 'error'
      });
    }
  };

  render() {
    const { email, message, messageType } = this.state;

    return (
      <div className="email-form-container">
        <h3>📧 Отправить сообщение</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email адрес:</label>
            <input
              type="email"
              value={email}
              onChange={this.handleEmailChange}
              placeholder="example@mail.com"
              className={messageType === 'error' ? 'error-input' : ''}
            />
          </div>
          <button type="submit" className="submit-btn">
            Отправить
          </button>
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    );
  }
}

// ========== ЗАДАНИЕ 2: Каталог товаров с сортировкой ==========
class ProductCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: 'Ноутбук Lenovo', price: 45000, quantity: 5 },
        { id: 2, name: 'Мышь Logitech', price: 1500, quantity: 12 },
        { id: 3, name: 'Клавиатура Razer', price: 8500, quantity: 0 },
        { id: 4, name: 'Монитор Samsung', price: 25000, quantity: 2 },
        { id: 5, name: 'Наушники Sony', price: 12000, quantity: 0 },
        { id: 6, name: 'Веб-камера Logitech', price: 5500, quantity: 8 },
        { id: 7, name: 'SSD диск 1TB', price: 7500, quantity: 3 },
        { id: 8, name: 'Внешний HDD 2TB', price: 8500, quantity: 1 },
        { id: 9, name: 'USB флешка 64GB', price: 1200, quantity: 15 },
        { id: 10, name: 'Чехол для ноутбука', price: 2500, quantity: 4 }
      ],
      sortField: 'id',      // Поле для сортировки
      sortDirection: 'asc'   // Направление сортировки: 'asc' или 'desc'
    };
  }

  // Функция сортировки
  sortProducts = (field) => {
    this.setState(prevState => {
      const newDirection = prevState.sortField === field && prevState.sortDirection === 'asc' 
        ? 'desc' 
        : 'asc';
      
      return {
        sortField: field,
        sortDirection: newDirection
      };
    });
  };

  // Получение отсортированных товаров
  getSortedProducts = () => {
    const { products, sortField, sortDirection } = this.state;
    const sorted = [...products];
    
    sorted.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      // Для строк сравниваем в нижнем регистре
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  };

  // Получение цвета для строки
  getRowColor = (quantity) => {
    if (quantity === 0) return 'zero-stock';
    if (quantity < 3) return 'low-stock';
    return '';
  };

  // Подсчет общей стоимости
  calculateTotal = () => {
    const { products } = this.state;
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    return { totalQuantity, totalValue };
  };

  render() {
    const sortedProducts = this.getSortedProducts();
    const { sortField, sortDirection } = this.state;
    const { totalQuantity, totalValue } = this.calculateTotal();
    
    // Иконки для сортировки
    const getSortIcon = (field) => {
      if (sortField !== field) return '↕️';
      return sortDirection === 'asc' ? '↑' : '↓';
    };

    return (
      <div className="product-catalog">
        <h3>🛒 Каталог товаров</h3>
        
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th onClick={() => this.sortProducts('id')} className="sortable">
                  № {getSortIcon('id')}
                </th>
                <th onClick={() => this.sortProducts('name')} className="sortable">
                  Название товара {getSortIcon('name')}
                </th>
                <th onClick={() => this.sortProducts('price')} className="sortable">
                  Цена (₽) {getSortIcon('price')}
                </th>
                <th onClick={() => this.sortProducts('quantity')} className="sortable">
                  Количество {getSortIcon('quantity')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product, index) => (
                <tr 
                  key={product.id} 
                  className={this.getRowColor(product.quantity)}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} ₽</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="summary">
          <div className="summary-card">
            <span className="summary-label">📦 Общее количество товаров:</span>
            <span className="summary-value">{totalQuantity} шт.</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">💰 Общая стоимость:</span>
            <span className="summary-value">{totalValue.toLocaleString()} ₽</span>
          </div>
        </div>
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color low-stock"></div>
            <span>Количество менее 3 (желтый)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color zero-stock"></div>
            <span>Нулевое количество (красный)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color normal"></div>
            <span>В наличии</span>
          </div>
        </div>
      </div>
    );
  }
}

// ========== ГЛАВНЫЙ КОМПОНЕНТ ЛАБОРАТОРНОЙ РАБОТЫ №3 ==========
class Lab3 extends Component {
  render() {
    return (
      <div className="lab3-container">
        <h2 className="lab3-title">🧪 Лабораторная работа №3</h2>
        
        {/* ЗАДАНИЕ 1: Форма email */}
        <div className="task-card">
          <EmailForm />
        </div>
        
        {/* ЗАДАНИЕ 2: Каталог товаров */}
        <div className="task-card">
          <ProductCatalog />
        </div>
      </div>
    );
  }
}

export default Lab3;