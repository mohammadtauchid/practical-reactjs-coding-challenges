import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState<Boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false)
  const [selectedTask, setSelectedTask] = useState({} as any)
  const [uniqueId, setUniqueId] = useState(taskList.length + 1)

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button 
            title="Add Task" 
            icon={<Add />} 
            onClick={() => {
              setSelectedTask({})
              setShowAddEditModal(true)
            }} 
          />
        </div>
        <div className="task-container">
          {taskList.length > 0 ? taskList
            .sort((a, b) => b.id - a.id)
            .map((task) => (
              <TaskCard 
                task={task} 
                key={task.id} 
                onEdit={
                  () => {
                  setShowAddEditModal(true)
                  setSelectedTask(task)
                }} 
                onDelete={
                  () => {
                    setShowDeleteModal(true)
                    setSelectedTask(task)
                  }
                }
              />
            )
          ) : "Task empty..."}
        </div>
      </div>
      {showAddEditModal && 
        <AddEditTaskForm 
          onOpen={setShowAddEditModal} 
          task={selectedTask} 
          uniqueId={[uniqueId, setUniqueId]}
          buttonTitle={selectedTask.id ? "Edit" : "Add"}
      />}
      {showDeleteModal && 
        <DeleteModal 
          onOpen={setShowDeleteModal}
          task={selectedTask} 
      />}
    </div>
  )
}

export default App
