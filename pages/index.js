import Head from 'next/head'
import Image from 'next/image'
import Row from '../components/Row.js'
import useWordSearchGrid from '../hooks/useWordSearchGrid';
import {useRef, useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'


const gridCellCount = 100;
const gridColumnCount = 10;
const words = ["APPLE", "BANANA", "KIWI", "PINEAPPLE", "ORANGE", "MANGO", "STRAWBERRY", "PEAR", "CHERRY", "MELON"];


export default function Home() {

const {letters} = useWordSearchGrid(gridCellCount, gridColumnCount, words);

const selectedCellsRef = useRef([])
const [selectedCells, setSelectedCells] = useState([])
const [completedCells, setCompletedCells] = useState([])

function handleCellSelected(e,row,cell){

  const gridPos = {
    row,
    cell
  } 

  selectedCellsRef.current  = [...selectedCellsRef.current, gridPos]
  setSelectedCells(selectedCellsRef.current)
  if(selectedCellsRef.current.length >= 2){
    const selectedCells = validateCellSelection(selectedCellsRef.current)
    if(!selectedCells){
      setSelectedCells([])
      selectedCellsRef.current = []
      return;
    };
    const isWord = validateWordFromSelectedCells(selectedCells)
    console.log(isWord);
    if(isWord){
      console.log("word found")
      setCompletedCells((prev)=>{
        return [...prev, ...selectedCells]
      })
    }
    setSelectedCells(selectedCells)
    setTimeout(() => {
      setSelectedCells([])
    }, 100);
    selectedCellsRef.current = []

  }
}


function validateWordFromSelectedCells(cells){
  const word = cells.map((cell)=>{
    return cell.letter;
  }).join("")
  const reversedWord = word.split("").reverse().join("")
  console.log(word, reversedWord)
  if(!words.includes(word) || words.includes(reversedWord)) return false;
  return true;
}


function validateCellSelection(selection){
  const startPos = {
    row: selection[0].row, 
    cell: selection[0].cell}
  const endPos = {
    row: selection[1].row,
    cell: selection[1].cell}
  const vector = {
    row:endPos.row - startPos.row,
    cell:endPos.cell - startPos.cell
  }
  if(!getDirection(vector)){
    console.log("Invalid Selection")
    return;
  }
  const arr = getSelectedCells(((Math.max(Math.abs(vector.row), Math.abs(vector.cell))) + 1),startPos.row,startPos.cell,getDirection(vector))
  return arr
  
}

function getDirection(vector){

  if(vector.row === 0){
    if(vector.cell > 0) return "HORIZONTAL_POS"
    if(vector.cell < 0) return "HORIZONTAL_NEG"
  }
  if(vector.cell === 0){
    if(vector.row > 0) return "VERTICAL_POS"
    if(vector.row < 0) return "VERTICAL_NEG"
  }
  if(vector.row > 0){
    if(Math.abs(vector.row) !== Math.abs(vector.cell)) return;
    if(vector.cell > 0) return "DIAGONAL_DOWN_POS"
    if(vector.cell < 0) return "DIAGONAL_DOWN_NEG"
  }
  if(vector.row < 0){
    if(Math.abs(vector.row) !== Math.abs(vector.cell)) return;
    if(vector.cell > 0) return "DIAGONAL_UP_POS"
    if(vector.cell < 0) return "DIAGONAL_UP_NEG"
  }
  else {
    console.log("error")
    return
  }

}

function handleClick(){
  const cells = document.querySelectorAll(".cell");
  for(let i = 0; i < cells.length; i++){
    if(cells[i].textContent === "Z")
    cells[i].textContent = "";
  }
}

function getSelectedCells(count, row, cell, dir){

//Takes in the length required, and the position to start at, as well as the direction,
//Returns the total cells that will be selected.

  const cells = []
  switch(dir){
    case "HORIZONTAL_POS":
      for(let i = 0; i < count; i++){
        cells.push({
          letter: letters[row][cell+i],
          row: row,
          cell: cell+i
        })
      } 
      break;
      case "HORIZONTAL_NEG":
        for(let i = 0; i < count; i++){
          cells.push({
                      letter: letters[row][cell-i],
            row: row,
            cell: cell-i
          })
        } 
        break;
    case "VERTICAL_POS":
      for(let i = 0; i < count; i++){
        cells.push({
                    letter: letters[row+i][cell],
          row: row+i,
          cell: cell
        })
      } 
      break;
      case "VERTICAL_NEG":
        for(let i = 0; i < count; i++){
          cells.push({
                      letter: letters[row-i][cell],

            row: row-i,
            cell: cell
          })
        } 
        break;
    case "DIAGONAL_UP_NEG":
                    //Handle word placement if diagonal up left 
      for(let i = 0; i < count; i++){
        cells.push({
                    letter: letters[row-i][cell-i],
          row: row-i,
          cell: cell-i
        })
      } 
      break;
    case "DIAGONAL_UP_POS":
              //Handle word placement if diagonal up right 
              for(let i = 0; i < count; i++){
                cells.push({
                            letter: letters[row-i][cell+i],
      
                  row: row-i,
                  cell: cell+i
                })
              } 
              break;
  
      case "DIAGONAL_DOWN_NEG":
        //Handle word placement if diagonal down left 
        for(let i = 0; i < count; i++){
          cells.push({
                      letter: letters[row+i][cell-i],
            row: row+i,
            cell: cell-i
          })
        } 
        break;
      case "DIAGONAL_DOWN_POS":
        //Handle word placement if diagonal down right 
        for(let i = 0; i < count; i++){
          cells.push({
                      letter: letters[row+i][cell+i],

            row: row+i,
            cell: cell+i
          })
        } 
        break;
  }
  return cells
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>



        <div className={styles.grid}>
          <table className="box"> 
          <tbody>

          {letters.map((arr, index)=>{    

            return <Row key={Math.random()} selectedCells={selectedCells} completedCells={completedCells} cells={arr} row={index} onSelect={handleCellSelected}/>

          })}

          </tbody>
          </table>



        </div>

        <button onClick={handleClick}>Clicketh!</button>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
