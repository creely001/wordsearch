
import {useEffect} from 'react'

function Dropdown({onSelectChange, selected}){

function handleSelect(e){
    onSelectChange(e.target.value);
}

console.log(selected)



return <select defaultValue={selected} onChange={handleSelect}>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Animals">Animals</option>
    </select>
}

export default Dropdown;