import Cell from "./Cell";


function Row({cells, row, randomLetter, onSelect}){
    
    
    return <tr row={row}>
        {cells.map((letter, index)=>{
            return <Cell cell={index} key={Math.random()} letter={letter || randomLetter()} onSelect={onSelect}/>
        })}
    </tr>
}

export default Row;