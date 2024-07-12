import React from 'react';
import TodoItem from './ToDoItem';

interface TodoListProps {
  todos: string[];
  completed: boolean[];
  filter: Set<string>;
  removeTodo: (index: number) => void;
  editTodo: (index: number, newTodo: string) => void;
  toggleComplete: (index: number) => void;  
  darkMode: boolean;  
  search: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, completed ,removeTodo, editTodo, toggleComplete, filter, darkMode, search }) => {
  const searchToDo = todos.filter((todo) => todo.toLowerCase().includes(search));

  const filteredTodos = searchToDo.filter((_, index) => {
    if (filter.has('com') && completed[index]) {
      return true;
    }
    if (filter.has('incom') && !completed[index]) {
      return true;
    }
    if (filter.has('all')) {
      return true;
    }
    return filter.size === 0;
  });

  return ( 
    <div className='flex flex-col gap-4'>
      {!search? filteredTodos.map((todo, index) => (
          <>
            <TodoItem
              key={index}
              index={index}
              completed={completed[index]} 
              todo={todo}
              removeTodo={removeTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
              darkMode={darkMode}
              search={search} 
            />
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#6C63FF' }}/>
          </>    
      )):<></>}
      {search? todos.filter((todos) => todos.toLowerCase().includes(search)).map((todo, index) => 
          <>
            <TodoItem
              key={index}
              index={index}
              completed={completed[index]} 
              todo={todo}
              removeTodo={removeTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
              darkMode={darkMode}
              search={search} 
            />
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#6C63FF' }}/>
          </>  
      ):<></>}
      { /*todos.length === 0 && (<img src='/emptyDay.svg'></img>) */}
      {darkMode ?
       (todos.length === 0 && 
        <div>
          <img src='/emptyNight.svg' /> 
          <p className="text-white text-center text-[20px]">Empty..</p>
        </div>) 
       : 
       (todos.length === 0 && 
        <div>
          <img src='/emptyDay.svg' /> 
          <p className="text-center text-[20px]">Empty..</p>
        </div>) }
    </div>
  );
};

export default TodoList;