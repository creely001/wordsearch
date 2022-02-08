import Cell from "./Cell";


function Row({cells, row, onSelect, selectedCells}){

    function checkSelected(row, cellIndex){
        const arr = selectedCells.filter((cell)=>{
            return cell.row == row && cell.cell == cellIndex
        })
        return arr.length !== 0
    }
    
    return <tr row={row}>
        {cells.map((letter, index)=>{
            return <Cell isSelected={checkSelected(row,index)} row={row} cell={index} key={Math.random()} letter={letter} onSelect={onSelect}/>
        })}
    </tr>
}

export default Row;