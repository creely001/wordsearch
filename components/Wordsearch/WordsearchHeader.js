
import Dropdown from "./Dropdown"

export default function WordsearchHeader({chosenList, handleSelectChange}){
    return     <div className="header">
    <h1>{chosenList.current.name}</h1>
    <Dropdown onSelectChange={handleSelectChange} selected={chosenList.current.name}/>
</div>
}