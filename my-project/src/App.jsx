import { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [text, settext] = useState("");
  const [todo, settodo] = useState([]);
  const [showfinised, setshowfinised] = useState(false)

  useEffect(() => {
    let todostring = localStorage.getItem("todo")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todo"))
      settodo(todos)
    }
  },[])
  

  const handleadd = () => {
    settodo([...todo, { id: uuidv4(), text, iscompleted: false }]);
    settext("");
    savetol();
  };

  const savetol = (params) => {
    localStorage.setItem("todo", JSON.stringify(todo))
    
  }
  const handlefinish = (e) => {
    setshowfinised(!showfinised)
    
  }
  
  

  const handleedit = (e, id) => {
    const itemToEdit = todo.find(item => item.id === id); // Find the item to edit
    if (itemToEdit) {
      settext(itemToEdit.text); // Set the item's text in the input field
      const updatedTodos = todo.filter(item => item.id !== id); // Remove the item from the list
      settodo(updatedTodos); // Update the todos state
    }
    savetol();
  };
  

  const handledel = (e, id) => {  
    console.log(`The id to delete is ${id}`);
    const newTodos = todo.filter(item => item.id !== id);
    settodo(newTodos);
    savetol();
  };

  const handlechange = (e) => {
    settext(e.target.value);
  };

  const handlecheck = (e) => {
    const id = e.target.name;
    console.log(`The id is ${id}`);
    const index = todo.findIndex(item => item.id === id);
    console.log(index);
    const newtodo = [...todo];
    newtodo[index].iscompleted = !newtodo[index].iscompleted;
    settodo(newtodo);
    console.log(newtodo, todo);
    savetol();
  };

  return (
    <>
      <Navbar />
      <div className="x-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-3xl'>itask-Manage your todo's at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add your Todo</h2>
          <input
            onChange={handlechange}
            value={text}
            type="text"
            placeholder="Add a New Task"
            className="w-full rounded-full px-5 py-1"
          />
          <button
            onClick={handleadd}
            disabled={text.length<=3}
            className="bg-slate-700 hover:bg-slate-900  disabled:bg-slate-500 text-white mx-7 py-1 p-3 rounded-md font-bold text-sm"
          >
            Add
          </button>
        </div>
        <input className='my-4' onChange={handlefinish} type="checkbox" checked= {showfinised} /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <h2 className="font-bold text-2xl">Your Todo's</h2>
        <div className="todos ">
          {todo.length===0&&<div className='my-5 ' >No Todo's</div>}
        
          {todo.map((item) => {
             return (showfinised || !item.iscompleted)&&<div key={item.id} className={"todo justify-between my-3 flex"}>
              <div className="flex gap-5">
              <input name={item.id} onChange={handlecheck} type="checkbox" />
              <div className={`${item.iscompleted ? "line-through" : ""} break-all max-w-[80%] whitespace-normal overflow-hidden`}>
                {item.text}</div>

              

              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={(e) => handleedit(e, item.id)}
                  className="bg-slate-700 hover:bg-slate-900 text-white mx-1 py-1 p-2 rounded-md font-bold text-sm"
                >
                 <FaEdit />
                </button>
                <button
                  onClick={(e) => handledel(e, item.id)}
                  className="bg-slate-700 hover:bg-slate-900 text-white mx-2 py-1 p-3 rounded-md font-bold text-sm"
                >
                 <AiFillDelete />
                </button>
              </div>
            </div>
})}
        </div>
      </div>
    </>
  );
}

export default App;



