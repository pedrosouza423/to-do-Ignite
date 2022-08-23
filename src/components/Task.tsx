import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps{
    id: string;
    comment: string;
    isCompleted?: boolean;
    onDeleteTask: (id: string) => void;
    onCompleteTask: (id: string) => void;
}

export const Task = ({id, comment, isCompleted, onDeleteTask, onCompleteTask}: TaskProps) => {

    function handleDeleteTask() {
        onDeleteTask(id)
    }

    function handleCompleteTask() {
      onCompleteTask(id)
    }
  return (
    <div className={styles.tasks}>
        <input
          type="checkbox"
          id={`${id}`}
          checked={isCompleted}
          onChange={() => handleCompleteTask()} 
        />

        <label 
          htmlFor={`${id}`}
          className={isCompleted ? styles.isCompleted : styles.content}>
            {comment}
        </label>
        
        <button className={styles.trashBtn}>
          <Trash size={24} onClick={handleDeleteTask} />
        </button>
    </div>
  )
}
