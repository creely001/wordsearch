import {useState} from 'react'

function Cell({letter, row, cell, onSelect, isSelected, isCompleted}){


    const [selected, setSelected] = useState(isSelected)
    const [completed, setCompleted] = useState(isCompleted)

    const style = () => {
        if(isCompleted){
            console.log("his")
            return {"backgroundColor": "green"}
        }
        if(selected){
            console.log("hi")
            return {"backgroundColor": "blue"}
        }

    }

    return <td className={"cell"} style={style()} row={row} cell={cell} onClick={(e)=>{
        onSelect(e, row, cell);
    }}>
        {letter}
    </td>
}

export default Cell;