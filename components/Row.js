import Cell from "./Cell";


function Row({cells, row, onSelect, selectedCells, completedCells}){


    function checkCells(cells, row, cellIndex){
        const arr = cells.filter((cell)=>{
            return cell.row == row && cell.cell == cellIndex
        })
        return arr.length !== 0
    }
    
    return <tr row={row}>
        {cells.map((letter, index)=>{
            return <Cell isSelected={checkCells(selectedCells, row,index)} isCompleted={checkCells(completedCells, row, index)} row={row} cell={index} key={Math.random()} letter={letter} onSelect={onSelect}/>
        })}
    </tr>
}

export default Row;