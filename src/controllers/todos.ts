import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

interface ITodoPostReqBody {
  text: string;
}

interface ITodoPatchReqParams {
  id: string;
}

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as ITodoPostReqBody).text;

  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ 
    message: 'Created the todo.',
    createdTodo: newTodo,
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({
    todos: TODOS
  });
};

export const updateTodo: RequestHandler<ITodoPatchReqParams> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as ITodoPostReqBody).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Cound not find the todo!')
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(200).json({
    message: `Todo ${todoId} was updated`,
    updatedTodo: TODOS[todoIndex]
  });
};

export const deleteTodo: RequestHandler<ITodoPatchReqParams> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Cound not find the todo!')
  }

  TODOS.splice(todoIndex, 1);

  res.status(200).json({
    message: `Todo ${todoId} was deleted`,
  });
};