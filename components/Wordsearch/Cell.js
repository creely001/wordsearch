import {useState, useRef, useEffect } from 'react'

function Cell({letter, row, cell, onSelect, isSelected, isChecked, linethroughs}){


    function getStyle(){
        
        let style = ""

        if(isChecked){
            style = linethroughs
        }
        if(isSelected){
            style = "radial-gradient(circle, #76e4e797 28%, #76e4e797 50%, #fff 60%"
        }
        return style

    }
        

    return <td className={"cell"} style={{background: getStyle()}} row={row} cell={cell} onClick={(e)=>{
        onSelect(e, row, cell);
    }}>
        {letter}
    </td>
}

export default Cell;