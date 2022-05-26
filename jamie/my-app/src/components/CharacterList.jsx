import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? "lightgreen" : "lightgrey",
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    display: "flex",
    justifyContent: "center",
    padding: grid,
    width: "100%",
    fontWeight: "normal",
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const CharacterList = ({ characters, setCharacters, inProgress }) => {
    const onDragEnd = (result) => {
        if (
            !result.destination ||
            result.destination.index === result.source.index
        ) {
            return;
        }
        const newCharacters = reorder(
            characters,
            result.source.index,
            result.destination.index
        );
        setCharacters(newCharacters);
    };

    return (
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
            Choose character order:
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(
                                snapshot.isDraggingOver,
                                characters.length
                            )}
                            {...provided.droppableProps}
                        >
                            {characters.map((character, index) => (
                                <Draggable
                                    key={character}
                                    draggableId={character}
                                    index={index}
                                    isDragDisabled={inProgress}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {character}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default CharacterList;
