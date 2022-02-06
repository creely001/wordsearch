import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {


  const numCells = 100;
  const columnCount = 10;
  const words = ["APPLE", "BANANA"];
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const [letters, setLetters] = useState([]);
  const [rows, setRows] = useState({})

  useEffect(() => {


    setLetters(()=>{
      
      const bigArr = [];
      let arr = [];
      for(let i = 0; i < numCells; i++){

        //arr.push(alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase())
        arr.push("")
        if(arr.length === columnCount) 
        {
        bigArr.push(arr);
        arr = [];
        }

      }
      return bigArr;
    })
  

  }, []);


  
  function getDirection(){
    const directions = ["HORIZONTAL_POS", "HORIZONTAL_NEG", "VERTICAL_POS", "VERTICAL_NEG", "DIAGONAL_UP_POS", "DIAGONAL_UP_NEG", "DIAGONAL_DOWN_POS", "DIAGONAL_DOWN_NEG"];
    const dir = directions[Math.floor(Math.random()*directions.length)];
    return dir
  }

function findWordInsertLocation(){

  const rowIndex = Math.floor(Math.random() * letters.length)
  const row = letters[rowIndex]
  const cellIndex = Math.floor(Math.random() * row.length)
  return {
    row: rowIndex,
    cell: cellIndex
  };
}

function handleClick(){
  const {row, cell} = findWordInsertLocation();
  const wordToInsert = getWord();
  const dir = getDirection();

  switch(dir){
    case "HORIZONTAL_POS":
        //Handle word placement if horizontal  

        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Place letters
        for(let i = 0; i < wordToInsert.length; i++){
        setLetters((prev)=>{
          console.log(wordToInsert[i])
          return ([...prev.slice(0,row), [...prev[row].slice(0,cell+i), wordToInsert[i], ...prev[row].slice(cell+1+i)], ...prev.slice(row+1)])
        })
      }

      break;
    case "HORIZONTAL_NEG":
        //Handle word placement if horizontal  

        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Place letters
        for(let i = 0; i < wordToInsert.length; i++){
        setLetters((prev)=>{
          return ([...prev.slice(0,row), [...prev[row].slice(0,cell-i), wordToInsert[i], ...prev[row].slice(cell+1-i)], ...prev.slice(row+1)])
        })
      }

      break;


    case "VERTICAL_POS":
        //Handle word placement if vertical  
        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.     
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Place letters vertically
        //Slice each row and replace one cell for every letter.
        for(let i = 0; i < wordToInsert.length; i++){
          setLetters((prev)=>{
       
            return ([...prev.slice(0,row+i), [...prev[row+i].slice(0,cell), wordToInsert[i], ...prev[row+i].slice(cell+1)], ...prev.slice(row+1+i)])

        })
        }
      break;
      case "VERTICAL_NEG":
        //Handle word placement if vertical  
        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.     
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Place letters vertically
        //Slice each row and replace one cell for every letter.
        for(let i = 0; i < wordToInsert.length; i++){
          setLetters((prev)=>{
       
            return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell), wordToInsert[i], ...prev[row-i].slice(cell+1)], ...prev.slice(row+1-i)])

        })
        }
      break;
    case "DIAGONAL_UP_NEG":
        //Handle word placement if diagonal up left 

        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.     
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Slice each row and replace one cell for every letter. Decrement row, decrement cell.
        for(let i = 0; i < wordToInsert.length; i++){
          setLetters((prev)=>{
       
            return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell-i), wordToInsert[i], ...prev[row-i].slice(cell+1-i)], ...prev.slice(row+1-i)])

        })
        }

      break;

    case "DIAGONAL_UP_POS":
        //Handle word placement if diagonal up right

          if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.     
          if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.
  
          //Slice each row and replace one cell for every letter. Decrement row, increment cell.
          for(let i = 0; i < wordToInsert.length; i++){
            setLetters((prev)=>{
         
              return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell+i), wordToInsert[i], ...prev[row-i].slice(cell+1+i)], ...prev.slice(row+1-i)])
  
          })
          }
  
        break;


      break;
      case "DIAGONAL_DOWN_NEG":
        //Handle word placement if diagonal down left 
        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.     
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Place letters diagonally right
        //Slice each row and replace one cell for every letter. Increment both cell and row.
        for(let i = 0; i < wordToInsert.length; i++){
          setLetters((prev)=>{
       
            return ([...prev.slice(0,row+i), [...prev[row+i].slice(0,cell-i), wordToInsert[i], ...prev[row+i].slice(cell+1-i)], ...prev.slice(row+1+i)])

        })
        }

      break;
      case "DIAGONAL_DOWN_POS":
        //Handle word placement if diagonal down right 
        if(!checkWordFits(wordToInsert, row, cell, dir)) return; //Check if the word can be contained in the grid.     
        if(!validateCellPlacement(wordToInsert, row, cell, dir)) return; //Check if the word will replace any other letters in the grid.

        //Place letters diagonally right
        //Slice each row and replace one cell for every letter. Increment both cell and row.
        for(let i = 0; i < wordToInsert.length; i++){
          setLetters((prev)=>{
       
            return ([...prev.slice(0,row+i), [...prev[row+i].slice(0,cell+i), wordToInsert[i], ...prev[row+i].slice(cell+1+i)], ...prev.slice(row+1+i)])

        })
        }

      break;
  }
  
 
}

function getWord(){
  let word = words[Math.floor(Math.random() * words.length)];
  if(Math.random() >= 0.5) {
    word = word.split("").reverse().join("");
  }
  return word;
}

function checkWordFits(word, row, cell, dir){

  const rowCount = letters.length; //The amount of rows in the grid..
  const rowLength = letters[row].length; //How many cells this row has..
  let sum;

  switch(dir){
    case "HORIZONTAL_POS":
        //Handle word placement if horizontal  

      
        // Add the length of the word to the cell index, if the word "fits", the sum will be <= the rowLength.
      
        sum = word.length + cell
      
        return sum <= rowLength ? true : false;
    case "HORIZONTAL_NEG":
        //Handle word placement if horizontal  

      
        // Subtract the length of the word from the cell index, if the word "fits", the sum will be >= 0.
      
        sum = cell - word.length
      
        return sum >= 0 ? true : false;
    case "VERTICAL_POS":
        //Handle word placement if vertical  

      
        // Add the length of the word to the row index, if the word "fits", the sum will be <= the rowCount.
      
        sum = word.length + row
      
        return sum <= rowCount ? true : false;

        case "VERTICAL_NEG":
          //Handle word placement if vertical  
  
        
          // Subtract the length of the word from the row index, if the word "fits", the sum will be >= 0.
        
          sum = row - word.length;
        
          return sum >= 0 ? true : false;
  
    case "DIAGONAL_UP_NEG":
        //Handle word placement if diagonal up left 

        // Subtract length of word from row. Must be >= 0. Subtract word length from cell, must be >= 0.

        sum = row - word.length;
        if(sum >= 0){
          sum = cell - word.length;
          if(sum >= 0){
            return true
          }
        }
        return false

      break;
    case "DIAGONAL_UP_POS":
        //Handle word placement if diagonal up right

          // Subtract length of word from row. Must be >= 0. Add word length to cell, must be <= row length.

          sum = row - word.length;
          if(sum >= 0){
            sum = word.length + cell;
            if(sum <= rowLength){
              return true
            }
          }
          return false

        

        case "DIAGONAL_DOWN_NEG":
          //Handle word placement if diagonal down left 
          // Subtract length of word from the cell. Must be >= 0. Add word length to row, must be <= total rows.

            sum = cell - word.length;
            if(sum >= 0){
              sum = row + word.length;
              if(sum <= rowCount){
                return true
              }
            }
            return false

        case "DIAGONAL_DOWN_POS":
          //Handle word placement if diagonal down right 
          // Add length of word to both the row index and the cell index, sum must be <= both.

          sum = word.length + cell
          if(sum <= rowLength){
            sum = word.length + row;
            if(sum <= rowCount){
              return true
            }
          }
          return false
  }

}

function validateCellPlacement(word, row, cell, dir){
  const cellsToFill = getCellsToBeReplaced(word, row, cell, dir);
  let allCellsEmpty = true;
  cellsToFill.forEach((item)=>{
    if(!isCellEmpty(item)){
      allCellsEmpty = false;
    }
  })
  return allCellsEmpty;
}

function getCellsToBeReplaced(word, row, cell, dir){

  const cells = []
  switch(dir){
    case "HORIZONTAL_POS":
      for(let i = 0; i < word.length; i++){
        cells.push({
          letter: word[i],
          row: row,
          cell: cell+i
        })
      } 
      break;
      case "HORIZONTAL_NEG":
        for(let i = 0; i < word.length; i++){
          cells.push({
            letter: word[i],
            row: row,
            cell: cell-i
          })
        } 
        break;
    case "VERTICAL_POS":
      for(let i = 0; i < word.length; i++){
        cells.push({
          letter: word[i],
          row: row+i,
          cell: cell
        })
      } 
      break;
      case "VERTICAL_NEG":
        for(let i = 0; i < word.length; i++){
          cells.push({
            letter: word[i],
            row: row-i,
            cell: cell
          })
        } 
        break;
    case "DIAGONAL_UP_NEG":
                    //Handle word placement if diagonal up left 
      for(let i = 0; i < word.length; i++){
        cells.push({
          letter: word[i],
          row: row-i,
          cell: cell-i
        })
      } 
      break;
    case "DIAGONAL_UP_POS":
              //Handle word placement if diagonal up right 
              for(let i = 0; i < word.length; i++){
                cells.push({
                  letter: word[i],
                  row: row-i,
                  cell: cell+i
                })
              } 
              break;

      case "DIAGONAL_DOWN_NEG":
        //Handle word placement if diagonal down left 
        for(let i = 0; i < word.length; i++){
          cells.push({
            letter: word[i],
            row: row+i,
            cell: cell-i
          })
        } 
        break;

      break;
      case "DIAGONAL_DOWN_POS":
        //Handle word placement if diagonal down right 
        for(let i = 0; i < word.length; i++){
          cells.push({
            letter: word[i],
            row: row+i,
            cell: cell+i
          })
        } 
        break;
  }

  console.log("Cells to be replaced..", cells, word, dir, cell, row)


  return cells
}



//Reusable

function isCellEmpty(cell){
  return letters[cell.row][cell.cell] === "" || letters[cell.row][cell.cell] === cell.letter ? true : false;
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
          return <tr row={index} key={Math.random()}>

          {arr.map((letter, index)=>{
          return <td cell={index} key={Math.random()}>{letter}</td>
           })}
                </tr>
          })}

          </tbody>
          </table>
        </div>

        <button onClick={handleClick}>Start</button>

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
