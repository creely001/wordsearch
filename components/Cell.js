import {useState, useRef, useEffect } from 'react'

function Cell({letter, row, cell, onSelect, isSelected, isChecked, linethroughs}){

    const [linethrough, setLinethrough] = useState(linethroughs)
    const [styling, setStyling] = useState({
        background: getStyle()
    })

    
    useEffect(() => {


    }, []);

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


            //     switch(completedDir[0]){
            //         case "HORIZONTAL_POS":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(0deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //           case "HORIZONTAL_NEG":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(0deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //         case "VERTICAL_POS":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(90deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //           case "VERTICAL_NEG":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(90deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //         case "DIAGONAL_UP_NEG":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(45deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //         case "DIAGONAL_UP_POS":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(135deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //           case "DIAGONAL_DOWN_NEG":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(135deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            //           case "DIAGONAL_DOWN_POS":
            //             styles.current = {
            //                 ...styles.current,
            //                 background: styles.current.background + "linear-gradient(45deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
            //             }
            //             return styles.current;
            // }
        

    return <td className={"cell"} style={styling} row={row} cell={cell} onClick={(e)=>{
        onSelect(e, row, cell);
    }}>
        {letter}
    </td>
}

export default Cell;