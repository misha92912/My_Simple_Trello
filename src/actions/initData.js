export const initData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1','column-2','column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do',
                    cardOrder: ['card-1','card-2','card-3','card-4','card-5','card-6','card-7'],
                    cards: [
                        {
                            id: 'card-1', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Try to replace "To do" and "Doing"',
                            image: null
                        },
                        {
                            id: 'card-2', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Push "+Add another card"',
                            image: null
                        },
                        {
                            id: 'card-3', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Try to replace CARDS upper/lower',
                            image: null
                        },
                        {
                            id: 'card-4', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Add another COLUMN',
                            image: null
                        },
                        {
                            id: 'card-5', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Card 1 for replace',
                            image: null
                        },
                        {
                            id: 'card-6', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Card 3 for replace',
                            image: null
                        },
                        {
                            id: 'card-7', 
                            boardId: 'board',
                            columnId: 'column-1',
                            title: 'Card 2 for replace',
                            image: null
                        },
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Doing',
                    cardOrder: ['card-8','card-9','card-10'],
                    cards: [
                        {
                            id: 'card-8', 
                            boardId: 'board',
                            columnId: 'column-2',
                            title: 'Reading...',
                            image: null
                        },
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done',
                    cardOrder: ['card-11','card-12','card-13'],
                    cards: [
                        {
                            id: 'card-11', 
                            boardId: 'board',
                            columnId: 'column-3',
                            title: 'When all task in Done - remove this column by tapping on "..." on top',
                            image: null
                        },
                    ]
                },
            ]
        }
    ]
}