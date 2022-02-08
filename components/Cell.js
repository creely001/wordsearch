import {useState} from 'react'

function Cell({letter, row, cell, onSelect, isSelected}){

    const [selected, setSelected] = useState(isSelected)


    return <td className={"cell"} style={selected ? {"backgroundColor": "blue"} : {}} row={row} cell={cell} onClick={(e)=>{
        setSelected((prev)=>{
            return !prev
        });
        onSelect(e, row, cell);
    }}>
        {letter}
    </td>
}

export default Cell;