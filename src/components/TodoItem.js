import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TodoItem = ({ item, onDelete, onEdit, onToggle }) => {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.checkbox}>
        <Text style={[styles.todoText, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <Button title="Редактировать" onPress={() => onEdit(item)} />
        <Button title="Удалить" onPress={() => onDelete(item.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    flex: 1, // Позволяет тексту занимать оставшееся место
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttons: {
    flexDirection: 'row', // Расположить кнопки в строку
    alignItems: 'center',
    marginLeft: 10, // Отступ между текстом и кнопками
  },
});

export default TodoItem;