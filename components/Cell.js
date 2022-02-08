import {useState, useRef, useEffect } from 'react'

function Cell({letter, row, cell, onSelect, isSelected, completedDir}){

    console.log(completedDir)

    const [directions, setDirections] = useState([])
    const [selected, setSelected] = useState(isSelected)
    const styles = useRef({
        background: ""
    })
    
    useEffect(() => {
      setDirections(completedDir)
    }, []);


    const lineDirs = {
         HORIZONTAL_POS: "linear-gradient(0deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         HORIZONTAL_NEG: "linear-gradient(0deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         VERTICAL_POS: "linear-gradient(90deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         VERTICAL_NEG: "linear-gradient(90deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         DIAGONAL_UP_NEG: "linear-gradient(45deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         DIAGONAL_UP_POS: "linear-gradient(135deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         DIAGONAL_DOWN_NEG: "linear-gradient(135deg, transparent 47%, red 47%, red 53%, transparent 53%) 0",
         DIAGONAL_DOWN_POS: "linear-gradient(45deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
    }



    const style = () => {
        if(selected){
            return {"backgroundColor": "blue"}
        }
        if(completedDir){

                switch(completedDir[0]){
                    case "HORIZONTAL_POS":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(0deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                      case "HORIZONTAL_NEG":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(0deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                    case "VERTICAL_POS":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(90deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                      case "VERTICAL_NEG":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(90deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                    case "DIAGONAL_UP_NEG":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(45deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                    case "DIAGONAL_UP_POS":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(135deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                      case "DIAGONAL_DOWN_NEG":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(135deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
                      case "DIAGONAL_DOWN_POS":
                        styles.current = {
                            ...styles.current,
                            background: styles.current.background + "linear-gradient(45deg, transparent 47%, red 47%, red 53%, transparent 53%) 0"
                        }
                        return styles.current;
            }
            

        }


    }

    return <td className={"cell"} style={style()} row={row} cell={cell} onClick={(e)=>{
        onSelect(e, row, cell);
    }}>
        {letter}
    </td>
}

export default Cell;