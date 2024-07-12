import React, { useState } from 'react';

interface TodoItemProps {
  todo: string;
  index: number;
  completed: boolean;
  removeTodo: (index: number) => void;
  editTodo: (index: number, newTodo: string) => void;
  toggleComplete: (index: number) => void;  
  darkMode: boolean;
  search: string;
}



const TodoItem: React.FC<TodoItemProps> = ({ todo, index, completed, removeTodo, editTodo, toggleComplete, darkMode, search }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>('');
  const handleEdits = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, newTodo);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input 
            className={`${darkMode ? `text-white bg-black` : `text-black`} w-[440px] pl-4 text-[20px] focus:outline-none`}
            type="text" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
          />
          <button className={`${darkMode ? `text-white bg-black` : `text-black`}`} onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <div className='w-[500px] flex flex-row items-center'>
          <input 
            type="checkbox" 
            className='completedBox' 
            checked={completed} 
            onClick= {() =>{toggleComplete(index)}}
          >
          </input>
          <span 
            className={` ${darkMode ? `${completed ? `line-through text-[#FFFFFF80]` : `no-underline text-white`}` : 
                                      `${completed ? `line-through text-[#25252580]` : `no-underline`}`}  pl-4 w-[440px] text-[20px]`}>
            {todo}
          </span>
          <button className="w-[18px] h-[18px] mr-[10px] hover:fill-[#6C63FF]" onClick={handleEdits}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" className="stroke-current text-gray-400 hover:text-[#6C63FF]">
              <path d="M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" className="stroke-current"/>
            </svg>
          </button>
          <button className='w-[18px] h-[18px]' onClick={() => {removeTodo(index)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-current text-gray-400 hover:text-[#E50000]">
              <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD" className="stroke-current"/>
              <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round" className="stroke-current"/>
              <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD" className="stroke-current"/>
              <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" className="stroke-current"/>
              <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" className="stroke-current"/>
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default TodoItem;
