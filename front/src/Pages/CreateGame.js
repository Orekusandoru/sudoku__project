
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// const initial = [
//     [2, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, 7, 2, -1, -1, -1, 8],
//     [-1, -1, -1, 6, -1, 8, -1, -1, -1],
//     [5, 8, -1, -1, -1, -1, -1, -1, 4],
//     [-1, 2, -1, 8, 9, 5, -1, 1, -1],
//     [6, -1, -1, -1, -1, -1, -1, 8, 9],
//     [-1, -1, -1, 5, -1, 7, -1, -1, -1],
//     [1, -1, -1, -1, 8, 4, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, 7]
// ]
// const initial2 = [
//     [-1, 5, -1, 9, -1, -1, -1, -1, -1],
//     [8, -1, -1, -1, 4, -1, 3, -1, 7],
//     [-1, -1, -1, 2, 8, -1, 1, 9, -1],
//     [5, 3, 8, 6, -1, 7, 9, 4, -1],
//     [-1, 2, -1, 3, -1, 1, -1, -1, -1],
//     [1, -1, 9, 8, -1, 4, 6, 2, 3],
//     [9, -1, 7, 4, -1, -1, -1, -1, -1],
//     [-1, 4, 5, -1, -1, -1, 2, -1, 9],
//     [-1, -1, -1, -1, 3, -1, -1, 7, -1]
// ]
// const initial3 = [
//     [-1, -1, -1, -1, -1, -1, 1, -1, -1],
//     [-1, 4, 1, -1, -1, -1, -1, 5, -1],
//     [8, -1, -1, -1, 3, 1, -1, 4, -1],
//     [-1, -1, 2, -1, -1, -1, -1, -1, -1],
//     [-1, -1, 6, -1, 2, -1, 3, -1, -1],
//     [-1, -1, -1, -1, -1, -1, 9, -1, -1],
//     [-1, 1, -1, 3, 4, -1, -1, -1, 7],
//     [-1, 6, -1, -1, -1, -1, 4, 8, -1],
//     [-1, -1, 9, -1, -1, -1, -1, -1, -1]
// ]
// let sudokuArr = []

// sudokuArr = Rand();


// function Rand() {
//     const grids = [initial, initial2, initial3];
//     const randomIndex = Math.floor(Math.random() * grids.length);
//     const sudokuArr = grids[randomIndex];
//     return sudokuArr;
// }

const generateSudokuBoard = () => {
    const solvedBoard = Array(9).fill().map(() => Array(9).fill(0));

    const isValidPlacement = (board, row, col, num) => {

        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    };

    const solveSudoku = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (solvedBoard[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValidPlacement(solvedBoard, row, col, num)) {
                            solvedBoard[row][col] = num;
                            if (solveSudoku()) {
                                return true;
                            } else {
                                solvedBoard[row][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    solveSudoku();

    const board = solvedBoard.map(row => [...row]);

    const emptyCells = 45;
    let count = 0;

    while (count < emptyCells) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {
            board[row][col] = -1;
            count++;
        }
    }

    return board;
};


export default function CreateGame() {

    const [initial] = useState(generateSudokuBoard());
    const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));
    const [isSolving, setIsSolving] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();

    function redirectHome() {
        setRedirect(true);
    }
    useEffect(() => {
        if (redirect) {
            navigate('/');
            setCounter(counter + 1);
        }

    }, [redirect, navigate]);




    function getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function onInputChange(ev, row, col) {
        var val = parseInt(ev.target.value) || -1, grid = getDeepCopy(sudokuArr);
        if (val === -1 || val >= 1 && val <= 9) {
            grid[row][col] = val;
        }

        setSudokuArr(grid);
    }


    function checkRow(grid, row, num) {
        return grid[row].indexOf(num) === -1;
    }
    function checkCol(grid, col, num) {
        return grid.map(row => row[col]).indexOf(num) === -1;
    }



    function checkBox(grid, row, col, num) {

        let boxArr = [],
            rowStart = row - (row % 3),
            colStart = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boxArr.push(grid[rowStart + i][colStart + j])
            }
        }
        return boxArr.indexOf(num) === -1;
    }



    function checkValid(grid, row, col, num) {
        if (checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)) {
            return true;
        }
        return false;
    }

    function getNext(row, col) {
        return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
    }

    function solver(grid, row = 0, col = 0) {

        if (grid[row][col] !== -1) {

            let isLast = row >= 8 && col >= 8;
            if (!isLast) {
                let [newRow, newCol] = getNext(row, col);
                return solver(grid, newRow, newCol);
            }
        }
        for (let num = 1; num <= 9; num++) {
            if (checkValid(grid, row, col, num)) {
                grid[row][col] = num;
                let [newRow, newCol] = getNext(row, col);

                if (!newRow && !newCol) {
                    return true;
                }

                if (solver(grid, newRow, newCol)) {
                    return true;
                }
            }
        }
        grid[row][col] = -1;
        return false;
    }

    function compareSudokus(currentSudoku, solvedSudoku) {
        let res = {
            isComplete: true,
            isSolveble: true
        }

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
                    if (currentSudoku[i][j] !== -1) {
                        res.isSolveble = false
                    }
                    res.isComplete = false;

                }
            }

        }
        return res;
    }

    async function checkSudoku(ev) {
        let sudoku = getDeepCopy(initial);
        solver(sudoku)
        let compare = compareSudokus(sudokuArr, sudoku)
        if (compare.isComplete) {
            ev.preventDefault();
            const response =  await fetch('http://localhost:4000/createStats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            alert("You solved sudoku");
        } else if (compare.isSolveble) {
            alert("Sudoku is still unsolved, keep trying");
        } else {
            alert("Try again, you entered an incorrect number");
        }


    }
    const solveSudoku = () => {

        let sudoku = getDeepCopy(initial);

        solver(sudoku);
        setSudokuArr(sudoku);

        setIsSolving(true);
        alert("You solved Sudoku by algorithm, it will not be counted in your statistics");

    }


    const resetSudoku = () => {

        let sudoku = getDeepCopy(initial);
        setSudokuArr(sudoku);

    }

    return (
        <div className="App">
            <div className="App-header">
                <h3>Sudoku solver</h3>
                <table className="sudoku">
                    <tbody>
                        {

                            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                                return <tr key={rIndex} className={(row + 1) % 3 === 0 ? 'bBorder' : ''}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                                        return <td key={rIndex + cIndex} className={(col + 1) % 3 === 0 ? 'rBorder' : ''} >
                                            <input onChange={(ev) => onInputChange(ev, row, col)}
                                                value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]}
                                                className="cellInput"
                                                disabled={initial[row][col] !== -1} />

                                        </td>

                                    })}

                                </tr>
                            })
                        }

                    </tbody>
                </table>
                <div className="buttonContainer">
                    {!isSolving && (<button className="checkButton" onClick={checkSudoku}>Check</button>)}
                    {!isSolving && (<button className="solveButton" onClick={solveSudoku}>Solve</button>)}
                    {!isSolving && (<button className="resetButton" onClick={resetSudoku}>Reset</button>)}
                    {isSolving && (<button className="homeButton" onClick={redirectHome}>Home</button>)}
                </div>
            </div>
        </div>
    );
}


