import { FormEvent, useState } from "react"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import { taskList } from "../../siteData/taskList"
import "./style.scss"

const AddEditTaskForm = ({ uniqueId, task, onOpen, buttonTitle }: any) => {
  const [title, setTitle] = useState(task.title || "")
  const [priority, setPriority] = useState(task.priority || "low")

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (task.id) {
      const taskRef = taskList.find((element) => element.id === task.id)
      if (taskRef) {
        taskRef.title = title
        taskRef.priority = priority
      }
    } else {
      taskList.push({ 
        id: uniqueId[0],
        title: title, 
        priority: priority, 
        status: "To Do", 
        progress: 0 
      })
      uniqueId[1](uniqueId[0] + 1)
    }

    onOpen(false)
  }

  return (
    <Modal>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close className="cp" onClick={() => onOpen(false)} />
          </div>
          <Input 
            label="Task" 
            placeholder="Type your task here..." 
            onChange={(e) => setTitle(e.target.value)} 
            name="title" 
            value={title} 
            autoFocus={true}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((level) => (
                <li 
                  key={level} 
                  className={`${level}${priority === level ? "-selected" : ""}`}
                  onClick={() => setPriority(level)}
                >
                  {level}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title={buttonTitle} disabled={title.trim().length === 0} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
