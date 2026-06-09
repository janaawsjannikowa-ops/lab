// src/Lab4.jsx
import React, { Component } from 'react';
import './Lab4.css';

// ========== КОМПОНЕНТ ФОРМЫ ДОБАВЛЕНИЯ ==========
class ToDoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim()) {
      this.props.onAdd(inputValue.trim());
      this.setState({ inputValue: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Введите новую задачу..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          ➕ Добавить
        </button>
      </form>
    );
  }
}

// ========== КОМПОНЕНТ СПИСКА ЗАДАЧ ==========
class ToDoItems extends Component {
  render() {
    const { tasks, onToggle } = this.props;

    if (tasks.length === 0) {
      return (
        <div className="empty-tasks">
          <p>📭 Нет задач</p>
          <span>Добавьте задачи и нажмите "Показать список"</span>
        </div>
      );
    }

    return (
      <div className="tasks-list">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
            onClick={() => onToggle(task.id)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              onClick={(e) => e.stopPropagation()}
              className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
          </div>
        ))}
      </div>
    );
  }
}

// ========== КОМПОНЕНТ ФИЛЬТРАЦИИ ==========
class TodoFilter extends Component {
  render() {
    const { currentFilter, onFilterChange, stats } = this.props;

    return (
      <div className="filter-section">
        <button
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Все ({stats.total})
        </button>
        <button
          className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Активные ({stats.active})
        </button>
        <button
          className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Выполненные ({stats.completed})
        </button>
      </div>
    );
  }
}

// ========== ГЛАВНЫЙ КОМПОНЕНТ TO DO LIST ==========
class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTasks: [],      // Все добавленные задачи
      visibleTasks: [],  // Задачи для отображения
      currentFilter: 'all',
      showList: false    // Показывать список или нет
    };
  }

  // Добавление задачи
  addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    this.setState(prevState => ({
      allTasks: [newTask, ...prevState.allTasks]
    }));
  };

  // Переключение статуса задачи
  toggleTask = (id) => {
    this.setState(prevState => ({
      allTasks: prevState.allTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }), () => {
      if (this.state.showList) {
        this.updateVisibleTasks();
      }
    });
  };

  // Фильтрация задач
  filterTasks = (tasks, filter) => {
    switch(filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return [...tasks];
    }
  };

  // Обновление видимых задач
  updateVisibleTasks = () => {
    const { allTasks, currentFilter } = this.state;
    const filtered = this.filterTasks(allTasks, currentFilter);
    this.setState({ visibleTasks: filtered });
  };

  // Обработка кнопки Submit
  handleSubmit = () => {
    const { showList, allTasks, currentFilter } = this.state;
    
    if (!showList) {
      const filtered = this.filterTasks(allTasks, currentFilter);
      this.setState({
        visibleTasks: filtered,
        showList: true
      });
    } else {
      this.updateVisibleTasks();
    }
  };

  // Изменение фильтра
  handleFilterChange = (filter) => {
    this.setState({ currentFilter: filter }, () => {
      if (this.state.showList) {
        this.updateVisibleTasks();
      }
    });
  };

  // Получение статистики
  getStats = () => {
    const { allTasks } = this.state;
    return {
      total: allTasks.length,
      completed: allTasks.filter(t => t.completed).length,
      active: allTasks.filter(t => !t.completed).length
    };
  };

  render() {
    const { showList, visibleTasks, currentFilter } = this.state;
    const stats = this.getStats();

    return (
      <div className="todolist-app">
        <h2>📋 Список дел</h2>
        
        {/* Форма добавления */}
        <ToDoForm onAdd={this.addTask} />
        
        {/* Статистика */}
        <div className="stats">
          <div className="stat">📊 Всего: {stats.total}</div>
          <div className="stat">🔄 Активных: {stats.active}</div>
          <div className="stat">✅ Выполнено: {stats.completed}</div>
        </div>
        
        {/* Кнопка Submit */}
        <div className="submit-section">
          <button className="submit-btn" onClick={this.handleSubmit}>
            {showList ? '🔄 Обновить список' : '📋 Показать список'}
          </button>
        </div>
        
        {/* Фильтры и список задач */}
        {showList && (
          <div className="tasks-section">
            <TodoFilter
              currentFilter={currentFilter}
              onFilterChange={this.handleFilterChange}
              stats={stats}
            />
            
            <ToDoItems tasks={visibleTasks} onToggle={this.toggleTask} />
          </div>
        )}
      </div>
    );
  }
}

// ========== ГЛАВНЫЙ КОМПОНЕНТ ==========
class Lab4 extends Component {
  render() {
    return (
      <div className="lab4-container">
        <h2 className="lab4-title">🧪 Лабораторная работа №4</h2>
        <div className="task-card">
          <ToDoList />
        </div>
      </div>
    );
  }
}

export default Lab4;