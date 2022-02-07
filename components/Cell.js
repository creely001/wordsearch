function Cell({letter, cell, onSelect}){
    return <td className={"cell"} cell={cell} onClick={onSelect}>
        {letter}
    </td>
}

export default Cell;