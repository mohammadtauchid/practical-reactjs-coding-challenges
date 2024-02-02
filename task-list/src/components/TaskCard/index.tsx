import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { taskList } from "../../siteData/taskList"
import { useState } from "react"

const TaskCard = ({ task, onEdit, onDelete }: any) => {
  const [state, updateState] = useState(true)
  let { id, title, priority, status, progress } = task

  const statusList = [
    "To Do",
    "In Progress",
    "Done"
  ]

  const changeStatus = () => {
    const index = (statusList.findIndex((element) => element === status) + 1) % statusList.length
    
    const taskRef = taskList.find((element) => element.id === id)
    if (taskRef) {
      taskRef.status = statusList[index]
      taskRef.progress = index * (100 / (statusList.length - 1))
      
      updateState(!state)
    }
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={changeStatus}>{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={onEdit} />
        <DeleteIcon className="cp" onClick={onDelete} />
      </div>
    </div>
  )
}

export default TaskCard
