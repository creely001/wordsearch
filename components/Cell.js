import {useState} from 'react'

function Cell({letter, row, cell, onSelect, isSelected, isCompleted}){


    const [selected, setSelected] = useState(isSelected)
    const [completed, setCompleted] = useState(isCompleted)

    const style = () => {
        if(selected){
            return {"backgroundColor": "blue"}
        }
        if(isCompleted){
            return {"backgroundColor": "green"}
        }


    }

    return <td className={"cell"} style={style()} row={row} cell={cell} onClick={(e)=>{
        onSelect(e, row, cell);
    }}>
        {letter}
    </td>
}

export default Cell;