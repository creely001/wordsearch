import Row from './Row'
import styles from '../styles/Home.module.css'

export default function Grid({grid, selectedCells, completedCells, onSelect}){

    return  <div className={styles.grid}>
    <table className="box"> 
    <tbody>

    {grid.map((arr, index)=>{    

      return <Row key={Math.random()} selectedCells={selectedCells} completedCells={completedCells} cells={arr} row={index} onSelect={onSelect}/>

    })}

    </tbody>
    </table>



</div>
}