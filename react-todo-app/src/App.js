import React, {useState, useCallback} from "react"
import "./App.css"
import Lists from "./components/Lists"
import Form from "./components/Form"

const initialTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : []

export default function App(){
    const [value, setValue] = useState('')
    const [todoData, setTodoData] = useState(initialTodoData)

    const handleClick = useCallback((id) => {
        let newTodoData = todoData.filter(data => data.id !== id)
        setTodoData(newTodoData)
        localStorage.setItem('todoData', JSON.stringify(newTodoData))
    },[todoData])

    const handleSubmit = (e) => {
        e.preventDefault()

        //새로운 할일 데이터
        let newTodo = {
            id: Date.now(),
            title: value,
            completed: false
        }

        //원래 있던 할 일에 새로운 할 일 더해주기
        setTodoData(prev => [...prev, newTodo])
        localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]))

        //입력란에 있던 글씨 초기화
        setValue('')
    }

    const handleRemoveClick = () => {
        setTodoData([])
        localStorage.setItem('todoData', JSON.stringify([]))
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
            <div className="w-full p-6 m-4 bg-white rounded shado md:w-3/4 md:max-w-lg w lg:w-3/4 lg:max-w-lg">
                <div className="flex justify-between mb-3">
                    <h1>할 일 목록</h1>
                    <button onClick={handleRemoveClick}>Delete all</button>
                </div>
                <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick}/>

                <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
            </div>
        </div>
    )
}
