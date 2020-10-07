import React, {useState, useRef } from 'react';

type formElement = React.FormEvent<HTMLFormElement>;
interface Itask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Itask[]>([]);

  const handleSubmit = (e: formElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();

  }
  const addTask = (name: string) => {
    const newTasks: Itask[] = [...tasks, { name, done: false }]
    setTasks(newTasks);
  }
  const ToggleDoneTask= (i:number)=>{
    const newTasks:Itask[]=[...tasks];
    newTasks[i].done=!newTasks[i].done;
    setTasks(newTasks);
  }
  const removeTask=(i:number)=>{
    const newTasks:Itask[]=[...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }
  const taskInput=useRef<HTMLInputElement>(null);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md offset-md-2">
          <div className="card">
            <div className="card-body">
             <form onSubmit={handleSubmit}>
              <input type="text"
               onChange={e =>
               setNewTask(e.target.value)} 
               value={newTask} 
               className="form-control"
               ref={taskInput}
               autoFocus/>
                <button className="btn btn-success btn-block mt-2">
                  Save
                </button>
          </form> 
          </div>
        </div>
        {tasks.map((t: Itask, i: number) => (
        <div className="card card-body mt-2" key={i}>
          <h2 style={{textDecoration: t.done ? 'line-through' : ''}}>{t.name}</h2>
          <div>
              <button className='btn btn-success' onClick={()=>ToggleDoneTask(i)}>
                {t.done ? '✔':'✗'}
              </button>
              <button className='btn btn-danger' onClick={()=>removeTask(i)}>
                🗑
                </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
 
      
  )}
    
  


export default App;