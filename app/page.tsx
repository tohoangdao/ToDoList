'use client'
import { useState, useMemo } from 'react';
import TodoList from '../components/ToDoList';
import AddModal from '../components/AddModal';
import {Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button} from "@nextui-org/react";
import { Selection } from "@react-types/shared";



const Home = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [todos, setTodos] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  //const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["all"]));
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(["all"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const addTodo = (todo: string) => {
    setTodos([...todos, todo]);
    setCompleted([...completed, false]);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    const newCompleted = [...completed];
    newCompleted.splice(index, 1);
    setCompleted(newCompleted);
    console.log(completed);
  };

  const editTodo = (index: number, newTodo: string) => {
    const newTodos = [...todos];
    newTodos[index] = newTodo;
    setTodos(newTodos);
  };

  const toggleComplete = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const openAddModal = () => {
    setAddModal(true);
  }

  const toggleNightDay = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div>
      <div className={`${addModal ? `block` : `hidden`} fixed z-50 w-full h-full bg-[#1114]`}>
        <div className="relative top-[20%] flex justify-center items-center">
        {addModal && <AddModal setOpenAdd={setAddModal} addTodo={addTodo}/>}
        </div>
      </div>

      <div className={`${darkMode ? `bg-black` : `bg-white`} flex flex-col h-[100vh] items-center`}>
        <h1 className={`${darkMode ? `text-white` : `text-black`} text-center text-[26px] font-[500] leading-normal pt-10 pb-5`}>
          Todo List
        </h1>
        <div className='flex flex-row gap-4 justify-center items-center pb-8'>  {/*search bar*/}
          <div className={`${darkMode ? `border-white` : `border-[#6C63FF]`} h-[40px] w-[750px] rounded-[5px] border-2 border-[#6C63FF] flex justify-between items-center`}> 
              <input 
                className={`${darkMode ? `bg-black text-white` : `bg-white`} w-full ml-4 focus:outline-none`} 
                type="text" 
                placeholder="Search note.." 
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className='mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none" className={`stroke-current ${darkMode ? `fill-white text-white` : `fill-[#6C63FF] text-[#6C63FF]`}`}>
                  <path d="M20.7773 20.184L15.9056 15.312H15.8531C17.3547 13.5415 18.1136 11.2588 17.9709 8.94156C17.8282 6.62433 16.7951 4.45202 15.0876 2.87905C13.3801 1.30608 11.1306 0.454303 8.80958 0.501892C6.48855 0.549481 4.27583 1.49275 2.63427 3.13439C0.992706 4.77602 0.0494786 6.98885 0.00189181 9.30999C-0.045695 11.6311 0.806045 13.8808 2.37894 15.5883C3.95184 17.2958 6.12404 18.329 8.44117 18.4717C10.7583 18.6144 13.0408 17.8555 14.8113 16.3539C14.8113 16.3539 14.8113 16.3914 14.8113 16.4063L19.6831 21.2783C19.7527 21.3485 19.8356 21.4043 19.927 21.4424C20.0183 21.4804 20.1163 21.5 20.2152 21.5C20.3141 21.5 20.4121 21.4804 20.5034 21.4424C20.5948 21.4043 20.6777 21.3485 20.7473 21.2783C20.8242 21.2103 20.8862 21.1272 20.9296 21.0342C20.9731 20.9412 20.9969 20.8402 20.9997 20.7376C21.0025 20.635 20.9842 20.533 20.946 20.4377C20.9077 20.3425 20.8503 20.2561 20.7773 20.184ZM9.00276 16.9685C7.5204 16.9685 6.07133 16.5289 4.83879 15.7053C3.60625 14.8817 2.64561 13.7111 2.07833 12.3415C1.51106 10.9719 1.36263 9.46488 1.65183 8.01094C1.94102 6.55699 2.65485 5.22146 3.70303 4.17322C4.75122 3.12499 6.08669 2.41113 7.54057 2.12192C8.99445 1.83272 10.5014 1.98115 11.871 2.54845C13.2405 3.11575 14.411 4.07644 15.2346 5.30904C16.0581 6.54163 16.4977 7.99077 16.4977 9.4732C16.4977 10.4575 16.3038 11.4322 15.9272 12.3415C15.5505 13.2509 14.9985 14.0772 14.3025 14.7732C13.6065 15.4692 12.7803 16.0213 11.871 16.3979C10.9616 16.7746 9.98701 16.9685 9.00276 16.9685Z" className="stroke-current"/>
                </svg>
              </div>
          </div>
          <div className="bg-[#6C63FF]">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  className="flex flex-row justify-between w-[85px] uppercase text-white font-medium text-sm p-2.5"
                >
                  {selectedValue}
                  <img src="/dropDown.svg"></img>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                className='bg-white text-[#6C63FF] font-medium text-sm'
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="com">Complete</DropdownItem>
                <DropdownItem key="incom">Incomplete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <button className='justify-center' onClick={() => toggleNightDay()}>
            {darkMode? (
              <img src="day.svg"></img>
            ) : (
              <img src="night.svg"></img>
            )}
          </button>
        </div>
        <TodoList 
          todos={todos} 
          completed={completed} 
          toggleComplete={toggleComplete} 
          removeTodo={removeTodo} 
          editTodo={editTodo} 
          filter={selectedKeys} 
          darkMode={darkMode}
          search = {search}
        />
        <button onClick={openAddModal} className="absolute bottom-8 right-80 z-0">
          <img src="/add.svg"></img>
        </button>
      </div>
    </div>
  );
};

export default Home;

