import React from 'react'
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import List from "./List";

export default function Lists({ todoData, setTodoData }) {


    const handleEnd = (result) => {
        console.log(result)

        // 목적지가 없을 경우 함수 종료
        if(!result.destination) return

        // 불변성을 지키기 위해 생성 (원본 데이터를 변경하는 메서드: splice, push)
        const newTodoData = [...todoData]

        const [reorderedItem] = newTodoData.splice(result.source.index, 1)

        newTodoData.splice(result.destination.index, 0, reorderedItem)
        setTodoData(newTodoData)
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <List
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
