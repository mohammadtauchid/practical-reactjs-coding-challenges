import { taskList } from "../../siteData/taskList"
import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

const DeleteModal = ({ task, onOpen }: any) => {
  const deleteTask = () => {
    taskList.splice(taskList.findIndex((element) => element.id === task.id), 1)
    onOpen(false)
  }

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={deleteTask} />
          <Button title="Cancel" outline onClick={() => onOpen(false)} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
