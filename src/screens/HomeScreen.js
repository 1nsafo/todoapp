import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from '../components/TodoList';

const HomeScreen = () => {
  const [text, setText] = useState(''); 
  const [todos, setTodos] = useState([]);
  // создаем состояние, будет  хранить ID задачи которую мы редактируем
  const [editingTodoId, setEditingTodoId] = useState(null); 
  useEffect(() => {
    const loadTodos = async () => {               //Определяем асинхронную функцию
      try {
        const storedTodos = await AsyncStorage.getItem('todos');          
        if (storedTodos) {                                                 
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error(error);
      }
    }; 

    loadTodos();                                                           
  }, []);

// Определяем асинхронную функцию 
  const saveTodos = async (newTodos) => {
    try {
// Сохраняем новые задачи в хранилище
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos)); 
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = () => {
    if (text.trim()) {                                                        
      if (editingTodoId) {
        const updatedTodos = todos.map(todo =>                                 
          todo.id === editingTodoId ? { ...todo, text } : todo                
        );
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
        setEditingTodoId(null);                                               // Сбрасываем ID редактируемой задачи
      } else {
        const newTodo = { id: Date.now(), text, completed: false }; // добавлено поле completed
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
      }
      setText('');
    } else {
      Alert.alert("Ошибка", "Задача не может быть пустой!");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);   // исключаем id которое совпадает 
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const editTodo = (todo) => {
    setText(todo.text);
    setEditingTodoId(todo.id);г
  };

  // Функция для переключения статуса выполнения задачи
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo  // Если ID совпадает, меняем статус, иначе оставляем задачу без изменений.
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите задачу"
        value={text}
        onChangeText={setText}
      />
      <Button title={editingTodoId ? "Сохранить" : "Добавить"} onPress={addTodo} />
      <TodoList 
        todos={todos} 
        onDelete={deleteTodo} 
        onEdit={editTodo} 
        onToggle={toggleCompletion} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default HomeScreen;