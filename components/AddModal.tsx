import React from "react";
import { useState } from "react";

interface AddModalProps  {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: (todo: string) => void;
};

function AddModal({ setOpenAdd, addTodo }: AddModalProps) {
    const [newToDo, setNewToDo] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newToDo) return;
      addTodo(newToDo);
      setNewToDo('');
      setOpenAdd(false);
    };
  return (
    <div className="w-[500px] h-72 flex flex-col space-between bg-white rounded-2xl pt-5">
      <h3 className="text-center pb-6 text-[24px] font-[500] leading-[24px]">
        NEW NOTE
      </h3>
      <form onSubmit={handleSubmit}>
          <input 
              className="p-4 ml-6 w-[440px] h-10 border-2 border-[#6C63FF] rounded-[5px]"
              type="text"
              placeholder="Input your note..."
              value={newToDo} 
              onChange={(e) => setNewToDo(e.target.value)}
          />
          <div className="flex justify-between flex-row w-[440px] ml-6 mt-28">
            <button className="bg-white rounded-[5px] border-2 border-[#6C63FF] px-6 py-3 text-[18px] font-medium leading-[18px] text-[#6C63FF]" onClick={() => {setOpenAdd(false);}}>CANCEL</button>
            <button 
              type="submit" 
              className="bg-[#6C63FF] rounded-[5px] px-6 py-3 text-[18px] font-medium leading-[18px] text-white">
              APPLY
            </button>
          </div>
      </form>
    </div>
  );
}

export default AddModal;

