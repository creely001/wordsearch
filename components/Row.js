import Cell from "./Cell";


function Row({cells, row, onSelect, selectedCells, completedCells}){


    function isCellSelected(cells, row, cellIndex){
        const arr = cells.filter((cell)=>{
            return cell.row == row && cell.cell == cellIndex
        })
        return arr.length !== 0
    }

    function getCellCompletedDirection(cells, row, cellIndex){
        if(!isCellSelected(cells, row, cellIndex)) return
        
        return cells.filter((cell)=>{
            return cell.row == row && cell.cell == cellIndex
        }).map((item)=>{
            return item.direction 
        })
    }
    
    return <tr row={row}>
        {cells.map((letter, index)=>{
            return <Cell isSelected={isCellSelected(selectedCells, row,index)} completedDir={getCellCompletedDirection(completedCells, row, index)} row={row} cell={index} key={Math.random()} letter={letter} onSelect={onSelect}/>
        })}
    </tr>
}

export default Row;