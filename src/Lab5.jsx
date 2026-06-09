// src/Lab5.jsx
import React, { Component } from 'react';
import './Lab5.css';

// ========== КОМПОНЕНТ ФОРМЫ КОНТАКТА ==========
class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        gender: '',
        message: ''
      },
      errors: {},
      isSubmitted: false
    };
  }

  // Валидация формы
  validateForm = () => {
    const { formData } = this.state;
    const errors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      errors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
    } else if (formData.name.length > 50) {
      errors.name = 'Имя не должно превышать 50 символов';
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Введите корректный email адрес (example@mail.com)';
    }

    // Валидация пола
    if (!formData.gender) {
      errors.gender = 'Выберите ваш пол';
    }

    // Валидация сообщения
    if (!formData.message.trim()) {
      errors.message = 'Сообщение обязательно для заполнения';
    } else if (formData.message.length < 10) {
      errors.message = 'Сообщение должно содержать минимум 10 символов';
    } else if (formData.message.length > 500) {
      errors.message = 'Сообщение не должно превышать 500 символов';
    }

    return errors;
  };

  // Обработчик изменения полей
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  };

  // Обработчик отправки формы
  handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = this.validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Если ошибок нет, отправляем данные
      this.props.onSubmitSuccess(this.state.formData);
      
      // Очищаем форму
      this.setState({
        formData: {
          name: '',
          email: '',
          gender: '',
          message: ''
        },
        errors: {},
        isSubmitted: true
      });
      
      // Сбрасываем статус отправки через 3 секунды
      setTimeout(() => {
        this.setState({ isSubmitted: false });
      }, 3000);
    } else {
      // Если есть ошибки, отображаем их
      this.setState({ errors });
    }
  };

  // Очистка формы
  handleClear = () => {
    this.setState({
      formData: {
        name: '',
        email: '',
        gender: '',
        message: ''
      },
      errors: {},
      isSubmitted: false
    });
  };

  render() {
    const { formData, errors, isSubmitted } = this.state;
    
    return (
      <div className="contact-form-container">
        <h3>📝 Форма обратной связи</h3>
        
        {isSubmitted && (
          <div className="success-message">
            ✅ Форма успешно отправлена! Данные добавлены в таблицу.
          </div>
        )}
        
        <form onSubmit={this.handleSubmit}>
          {/* Поле Имя */}
          <div className="form-group">
            <label htmlFor="name">
              Имя <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={this.handleChange}
              placeholder="Введите ваше имя"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          {/* Поле Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
              placeholder="example@mail.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          {/* Радиокнопки для выбора пола */}
          <div className="form-group">
            <label>
              Пол <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={this.handleChange}
                />
                <span className="radio-custom"></span>
                👨 Мужской
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={this.handleChange}
                />
                <span className="radio-custom"></span>
                👩 Женский
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={this.handleChange}
                />
                <span className="radio-custom"></span>
                🌈 Другой
              </label>
            </div>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
          
          {/* Поле Сообщение */}
          <div className="form-group">
            <label htmlFor="message">
              Сообщение <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={this.handleChange}
              placeholder="Введите ваше сообщение (минимум 10 символов)"
              rows="5"
              className={errors.message ? 'error' : ''}
            />
            <div className="char-counter">
              {formData.message.length}/500 символов
            </div>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          
          {/* Кнопки */}
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              ✉️ Отправить
            </button>
            <button type="button" className="clear-btn" onClick={this.handleClear}>
              🗑️ Очистить
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// ========== КОМПОНЕНТ ТАБЛИЦЫ КОНТАКТОВ ==========
class ContactsTable extends Component {
  render() {
    const { contacts } = this.props;
    
    if (contacts.length === 0) {
      return (
        <div className="empty-table">
          <span className="empty-icon">📋</span>
          <p>Нет отправленных контактов</p>
          <span>Заполните форму и нажмите "Отправить"</span>
        </div>
      );
    }
    
    return (
      <div className="table-wrapper">
        <table className="contacts-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Пол</th>
              <th>Сообщение</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>
                  <strong>{contact.name}</strong>
                </td>
                <td>
                  <a href={`mailto:${contact.email}`} className="email-link">
                    {contact.email}
                  </a>
                </td>
                <td>
                  <span className="gender-badge">
                    {contact.gender === 'male' && '👨 Мужской'}
                    {contact.gender === 'female' && '👩 Женский'}
                    {contact.gender === 'other' && '🌈 Другой'}
                  </span>
                </td>
                <td className="message-cell">{contact.message}</td>
                <td className="date-cell">{contact.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// ========== ГЛАВНЫЙ КОМПОНЕНТ ЛАБОРАТОРНОЙ РАБОТЫ №5 ==========
class Lab5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  // Добавление нового контакта
  addContact = (contactData) => {
    const newContact = {
      id: Date.now(),
      ...contactData,
      date: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts]
    }));
  };

  render() {
    const { contacts } = this.state;
    
    return (
      <div className="lab5-container">
        <h2 className="lab5-title">🧪 Лабораторная работа №5</h2>
        
        {/* Задание 1: Форма контакта */}
        <div className="task-card">
          <ContactForm onSubmitSuccess={this.addContact} />
        </div>
        
        {/* Таблица с контактами */}
        <div className="task-card">
          <h3>📊 Отправленные сообщения</h3>
          <ContactsTable contacts={contacts} />
        </div>
      </div>
    );
  }
}

export default Lab5;