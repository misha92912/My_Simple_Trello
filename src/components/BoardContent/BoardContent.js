import './BoardContent.scss';
import Column from '../Column/Column';
import { initData } from '../../actions/initData';
import { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../utilities/dragDrop';
import { v4 as uuidv4 } from 'uuid';

const BoardContent = () => {

    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    const [isShowAddList, setIsShowAddList] = useState(false);
    const inputRef = useRef(null);
    const [valueInput, setValueInput] = useState('');

    useEffect(() => {
        if (isShowAddList === true && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isShowAddList])

    useEffect(() => {
        const boardInitData = JSON.parse(localStorage.getItem('boards-345-54-4352')) 
                              || initData.boards.find(item => item.id === 'board-1')
        if(boardInitData){
            setBoard(boardInitData)

            boardInitData.columns.sort((a,b) => 
                boardInitData.columnOrder.indexOf(a.id)
                 - boardInitData.columnOrder.indexOf(b.id) 
            )
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
        }
    }, [])

    const saveBoardToLocatStorage = (newColumns) => {
        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map(column => column.id);
        newBoard.columns = newColumns;

        setBoard(newBoard);
        localStorage.setItem('boards-345-54-4352', JSON.stringify(newBoard))
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        setColumns(newColumns);
        saveBoardToLocatStorage(newColumns);
    }

    const onCardDrop = (dropResult, columnId) => {
        if (dropResult.removeIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns];

            let currentColumn = newColumns.find(column => column.id === columnId);
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id);

            setColumns(newColumns);
            saveBoardToLocatStorage(newColumns);
        }
    }

    if(_.isEmpty(board)){
        return (
            <>
                <div className="not-found">Board not found</div>
            </>
        )
    }


    const handleAddList = () => {
        if (!valueInput){
            if (inputRef && inputRef.current)
                inputRef.current.focus();
            return
        }

        const _columns = _.cloneDeep(columns);
        _columns.push({
            id: uuidv4(),
            boardId: board.id,
            title: valueInput,
            cards: []
        });
        setColumns(_columns);
        saveBoardToLocatStorage(_columns);
        setValueInput('');
        inputRef.current.focus();
    }

    const onUpdateColumn = (newColumn) => {
        const columnIdUpdate = newColumn.id;
        let ncols = [...columns];
        let index = ncols.findIndex(item => item.id === columnIdUpdate)
        if (newColumn._destroy) {
            ncols.splice(index, 1);

        } else {
            ncols[index] = newColumn;
        }

        setColumns(ncols);
        saveBoardToLocatStorage(ncols);
    }

    return (
       <>
            <div className='board-columns'>
                <Container 
                    orientation = 'horizontal'
                    onDrop={onColumnDrop}
                    getChildPayload={index => columns[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                >
                    {columns && columns.length > 0 && columns.map((column, index) => {
                        return (
                            <Draggable key={column.id}>
                                <Column 
                                    column={column}
                                    onCardDrop={onCardDrop}
                                    onUpdateColumn={onUpdateColumn}
                                />
                            </Draggable>
                        )
                    })}
                </Container>
                    {isShowAddList === false ?
                        <div className='add-new-column' onClick={()=> setIsShowAddList(true)}>
                            <i className='fa fa-plus icon'></i> Add another column
                        </div>
                        :
                        <div className="content-add-column">
                            <input 
                                type="text"
                                className="form-control"
                                ref={inputRef}
                                value={valueInput}
                                onChange={(event) => setValueInput(event.target.value)}
                            />
                            <div className='group-btn'>
                                <button className='btn btn-success'
                                    onClick = {() => handleAddList()} 
                                    >Add List</button>
                                <i className='fa fa-times icon' 
                                   onClick={() => setIsShowAddList(false)}></i> 
                            </div>
                        </div>
                    }
                
          </div>
       </>
    )
}

export default BoardContent
