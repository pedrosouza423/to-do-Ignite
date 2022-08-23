import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'
import styles from './App.module.css'
import {FormEvent, useState } from 'react'
import { Task } from './components/Task'
import { v4 as uuidv4 } from 'uuid';
import {ITask} from './types/task'
import clipboard from './assets/Clipboard-TODO.svg'

function App() {
  const [description, setDescription] = useState('')
  const [taskList, setTaskList] = useState<ITask[]>([])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    if (!taskList) return;

    const taskId = uuidv4().toString();
    const newTask = {id:taskId, comment: description, isCompleted: false}

    setTaskList( oldState => [...oldState, newTask])

    setDescription('')
  }

  function deleteTask(id:string) {
    const newTaskWithoutDeletedOne = taskList.filter(task => {
      return task.id !== id;
    })
    setTaskList(newTaskWithoutDeletedOne)
  }

  function completeTask(id: string){
    const editTask = taskList.map(task => task.id === id ? {
      ...task,
      isCompleted: !task.isCompleted
    } : task )

    setTaskList(editTask)
  }

  const completedTasks = taskList.filter((task) => task.isCompleted).length;
  

  return (
    <div className={styles.app}>
      <Header />

      <main>
        <form onSubmit={handleCreateNewTask} className={styles.newTasksForm}>
          <input 
            type="text" 
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit">Criar <PlusCircle size={16}/></button>
        </form>
      </main>

      <div className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.created}>
            <div>
              <p>Tarefas criadas</p>
            </div>
            <div>
             <span>{taskList.length}</span>
            </div>
          </div>

          <div className={styles.done}>
            <div>
              <p>Concluídas</p>
            </div>
            <div>
             <span>{completedTasks} de {taskList.length}</span>
            </div>
          </div>
        </div>
        {taskList.length > 0 ? (
          <div className={styles.taskList}>
          {taskList.map( task => {
            return (
              <Task
                key={uuidv4()} 
                id={task.id}
                comment={task.comment} 
                isCompleted={task.isCompleted}
                onCompleteTask={completeTask}
                onDeleteTask={deleteTask}
              />
            )
          })}
        </div>
        ) : (
          <div className={styles.noTasks}>
            <img src={clipboard} />
            <p><strong>Você ainda não tem tarefas cadastradas </strong><br/>
              Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default App
