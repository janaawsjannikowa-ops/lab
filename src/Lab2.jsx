// src/Lab2.jsx
import React, { Component } from 'react';
import './Lab2.css';

// ========== ЗАДАНИЕ 1: Компонент-класс Clock ==========
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    // Обновляем время каждую секунду
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    // Очищаем таймер при размонтировании
    clearInterval(this.timer);
  }

  // Получение времени с учетом часового пояса
  getTimeInTimezone = () => {
    const { time } = this.state;
    const { timezone = this.getUserTimezone() } = this.props;
    
    // Парсим часовой пояс (например, '+3:00' или '-4:00')
    let offsetHours = 0;
    let offsetMinutes = 0;
    
    if (timezone) {
      const match = timezone.match(/([+-])(\d+):?(\d+)?/);
      if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        offsetHours = parseInt(match[2]) * sign;
        offsetMinutes = (parseInt(match[3]) || 0) * sign;
      }
    }
    
    // Получаем UTC время и добавляем смещение
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const newTime = new Date(utc + (offsetHours * 3600000) + (offsetMinutes * 60000));
    
    return newTime;
  };

  // Получение часового пояса пользователя
  getUserTimezone = () => {
    const offset = -new Date().getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  // Форматирование времени
  formatTime = () => {
    const { format = '24' } = this.props;
    const currentTime = this.getTimeInTimezone();
    
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    if (format === '12') {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Получение названия часового пояса
  getTimezoneName = () => {
    const { timezone } = this.props;
    const timezones = {
      '+3:00': 'Минск',
      '+4:00': 'Дубай',
      '+1:00': 'Берлин',
      '-5:00': 'Нью-Йорк',
      '+8:00': 'Пекин',
      '+9:00': 'Токио'
    };
    return timezones[timezone] || (timezone === this.getUserTimezone() ? 'Местное' : timezone);
  };

  render() {
    const { format = '24' } = this.props;
    
    return (
      <div className="clock">
        <div className="clock-time">{this.formatTime()}</div>
        <div className="clock-info">
          <span>Формат: {format}ч</span>
          <span>Часовой пояс: {this.getTimezoneName()}</span>
        </div>
      </div>
    );
  }
}

// ========== ЗАДАНИЕ 2: Компонент выбора профессии ==========
class ProfessionSelector extends Component {
  professions = [
    { id: 'developer', name: 'Разработчик', icon: '💻' },
    { id: 'designer', name: 'Дизайнер', icon: '🎨' },
    { id: 'manager', name: 'Менеджер', icon: '📊' },
    { id: 'marketer', name: 'Маркетолог', icon: '📈' },
    { id: 'teacher', name: 'Преподаватель', icon: '📚' }
  ];

  render() {
    const { selectedProfession, onSelect } = this.props;
    
    return (
      <div className="profession-selector">
        <h3>Выберите профессию:</h3>
        <div className="profession-buttons">
          {this.professions.map(prof => (
            <button
              key={prof.id}
              className={`prof-btn ${selectedProfession === prof.id ? 'active' : ''}`}
              onClick={() => onSelect(prof.id)}
            >
              <span className="prof-icon">{prof.icon}</span>
              <span className="prof-name">{prof.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

// ========== Компонент меню для профессий ==========
class JobMenu extends Component {
  // Меню для разных профессий
  getMenuItems = () => {
    const { profession } = this.props;
    
    const menus = {
      developer: [
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '📖' },
        { name: 'LeetCode', url: 'https://leetcode.com', icon: '⚡' },
        { name: 'CodePen', url: 'https://codepen.io', icon: '✏️' },
        { name: 'Dev.to', url: 'https://dev.to', icon: '💬' },
        { name: 'GitLab', url: 'https://gitlab.com', icon: '🦊' },
        { name: 'Docker Hub', url: 'https://hub.docker.com', icon: '🐳' },
        { name: 'NPM', url: 'https://www.npmjs.com', icon: '📦' }
      ],
      designer: [
        { name: 'Figma', url: 'https://figma.com', icon: '🎨' },
        { name: 'Behance', url: 'https://behance.net', icon: '✨' },
        { name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' },
        { name: 'Adobe Color', url: 'https://color.adobe.com', icon: '🎨' },
        { name: 'Pinterest', url: 'https://pinterest.com', icon: '📌' },
        { name: 'Canva', url: 'https://canva.com', icon: '🖼️' },
        { name: 'Unsplash', url: 'https://unsplash.com', icon: '📷' },
        { name: 'FontAwesome', url: 'https://fontawesome.com', icon: '🔤' }
      ],
      manager: [
        { name: 'Trello', url: 'https://trello.com', icon: '📋' },
        { name: 'Asana', url: 'https://asana.com', icon: '✅' },
        { name: 'Jira', url: 'https://www.atlassian.com/software/jira', icon: '🐙' },
        { name: 'Slack', url: 'https://slack.com', icon: '💬' },
        { name: 'Zoom', url: 'https://zoom.us', icon: '🎥' },
        { name: 'Google Drive', url: 'https://drive.google.com', icon: '☁️' },
        { name: 'Notion', url: 'https://notion.so', icon: '📓' },
        { name: 'Miro', url: 'https://miro.com', icon: '🎯' }
      ],
      marketer: [
        { name: 'Google Analytics', url: 'https://analytics.google.com', icon: '📊' },
        { name: 'Facebook Ads', url: 'https://ads.facebook.com', icon: '📱' },
        { name: 'Mailchimp', url: 'https://mailchimp.com', icon: '📧' },
        { name: 'SEMrush', url: 'https://semrush.com', icon: '🔍' },
        { name: 'Hootsuite', url: 'https://hootsuite.com', icon: '🦉' },
        { name: 'Canva', url: 'https://canva.com', icon: '🎨' },
        { name: 'Buffer', url: 'https://buffer.com', icon: '📱' },
        { name: 'HubSpot', url: 'https://hubspot.com', icon: '🎯' }
      ],
      teacher: [
        { name: 'Google Classroom', url: 'https://classroom.google.com', icon: '📚' },
        { name: 'Coursera', url: 'https://coursera.org', icon: '🎓' },
        { name: 'Udemy', url: 'https://udemy.com', icon: '📖' },
        { name: 'Khan Academy', url: 'https://khanacademy.org', icon: '📐' },
        { name: 'Duolingo', url: 'https://duolingo.com', icon: '🌎' },
        { name: 'Moodle', url: 'https://moodle.org', icon: '💻' },
        { name: 'Quizlet', url: 'https://quizlet.com', icon: '📝' },
        { name: 'Edmodo', url: 'https://edmodo.com', icon: '👥' }
      ]
    };
    
    return menus[profession] || menus.developer;
  };

  render() {
    const { profession } = this.props;
    const menuItems = this.getMenuItems();
    
    const professionNames = {
      developer: 'Разработчика',
      designer: 'Дизайнера',
      manager: 'Менеджера',
      marketer: 'Маркетолога',
      teacher: 'Преподавателя'
    };
    
    return (
      <div className="job-menu">
        <h3>🔗 Полезные ссылки для {professionNames[profession]}</h3>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-name">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

// ========== ГЛАВНЫЙ КОМПОНЕНТ ЛАБОРАТОРНОЙ РАБОТЫ №2 ==========
class Lab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfession: 'developer'
    };
  }

  handleProfessionChange = (profession) => {
    this.setState({ selectedProfession: profession });
  };

  render() {
    const { selectedProfession } = this.state;
    
    return (
      <div className="lab2-container">
        <h2 className="lab2-title">🧪 Лабораторная работа №2</h2>
        
        {/* ЗАДАНИЕ 1: Часы */}
        <div className="task-card">
          <h3>⏰ Задание 1: Часы с часовыми поясами</h3>
          <div className="clocks-container">
            <div className="clock-item">
              <h4>Минск (UTC+3)</h4>
              <Clock format="24" timezone="+3:00" />
            </div>
            <div className="clock-item">
              <h4>Нью-Йорк (UTC-5)</h4>
              <Clock format="12" timezone="-5:00" />
            </div>
            <div className="clock-item">
              <h4>Местное время</h4>
              <Clock format="24" />
            </div>
            <div className="clock-item">
              <h4>Токио (UTC+9, 12ч)</h4>
              <Clock format="12" timezone="+9:00" />
            </div>
          </div>
        </div>
        
        {/* ЗАДАНИЕ 2: Меню для профессий */}
        <div className="task-card">
          <h3>💼 Задание 2: Полезные ссылки для профессий</h3>
          <ProfessionSelector 
            selectedProfession={selectedProfession}
            onSelect={this.handleProfessionChange}
          />
          <JobMenu profession={selectedProfession} />
        </div>
      </div>
    );
  }
}

export default Lab2;