import { useState, useEffect, useRef } from 'react';

export default function useWordSearchGrid(numCells, columnCount, words){




const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const maxWords = Math.floor(numCells / 10);
const maxChars = Math.floor(numCells/100*60)
const chars = words.join("").length;


const [letters, setLetters] = useState([]);
const usedWords = useRef([])

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



function findWordInsertLocation(wordToInsert){
const insertionPositions = letters.map((row, rowIndex)=>{
  return row.map((cell, cellIndex)=>{
    return {
      row: rowIndex,
      cell: cellIndex,
      directions:{
        // Only properties that evaluate to true will be returned.
        //spread operator is like a shorthand of Object.assign and have lower precedence than the && operator. It ignore value without property (boolean, null, undefined, number), and add all properties of the object after the ... in place. remember the && operator return the right value if true, or false otherwise. so if someCondition is true, {b : 5} will be passed to the ... operator, resulting in adding the property b to a with value 5. is someCondition is false, false will be passed to the ... operator. resulting in nothing added.
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "HORIZONTAL_POS" ) && {HORIZONTAL_POS: true}),
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "HORIZONTAL_NEG" ) && {HORIZONTAL_NEG: true}),
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "VERTICAL_POS" ) && {VERTICAL_POS:true}), 
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "VERTICAL_NEG" ) && {VERTICAL_NEG: true}), 
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "DIAGONAL_UP_POS" ) && {DIAGONAL_UP_POS: true}),
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "DIAGONAL_UP_NEG" ) && {DIAGONAL_UP_NEG: true}),
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "DIAGONAL_DOWN_POS" ) && {DIAGONAL_DOWN_POS: true}),
        ...(validateWordInsertion(wordToInsert, rowIndex, cellIndex, "DIAGONAL_DOWN_NEG" ) && {DIAGONAL_DOWN_NEG: true})
      }
    }
    
  }).filter((cell)=>{
    return Object.keys(cell.directions).length
  })
  

}).filter((row)=>{
return row.length > 0
})

//console.log("Grid insertion locations for word:", wordToInsert, insertionPositions)

if(insertionPositions.length === 0) return null;

const row = insertionPositions[Math.floor(Math.random() * insertionPositions.length)]
const cell = row[Math.floor(Math.random() * row.length)]
const directions = Object.keys(cell.directions);
const dir = directions[Math.floor(Math.random() * directions.length)]
return {
row: cell.row,
cell: cell.cell,
dir
}
}

useEffect(() => {


if(chars > maxChars) {
  console.log(`Too many characters in combined words. Maximum is ${maxChars}, current is ${chars}.`)
  return;
}
if(words.length > maxWords){
  console.log(`Too many words to add. Maximum is ${maxWords}, current is ${words.length}.`);
  return;
}

initWord();

}, [letters]);

function regenerateGrid(){
usedWords.current = []
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
}

function getNextWord(){

const unusedWords = words.filter((word)=>{
  return !usedWords.current.includes(word)
})
usedWords.current = [...usedWords.current, unusedWords[0]]
if(unusedWords.length === 0) return null
return unusedWords[0]

}

function addRandomLetters(){

  const isGridFull = letters.map((row)=>{
    return row.filter((cell)=>{
      return cell === ""
    })
  })

  console.log(isGridFull)
  if(isGridFull.length === 0) return true

 setLetters((prev) => {
  return prev.map((row)=>{
    return row.map((cell)=>{
      return cell || getRandomLetter()
    })
  })
 }) 
}

function getRandomLetter(){
  return alphabet[Math.floor(Math.random()*alphabet.length)];
  }

function initWord(){


    const wordToInsert = getNextWord();
    if(wordToInsert === null) {
      console.log("All words added.")
  
      console.log(addRandomLetters());
      if(addRandomLetters()) return;
    };

    //Handle automatic generation of the grid. 
      // Once a word is chosen, loop through every available cell.
      // On each iteration, run checks in each direction to validate/invalidate word placement.
      // Return this as an object with each directional boolean as a prop.
      // Finally, choose a random object from this list and a (true) direction to be used as the insertion position of the word.
      // If the returned list has no available spaces, but the word passed the pre-generation validation checks, clear all words, and restart the generation process   from the beginning.
    
      
      // Return the coordinates for the word to be inserted, as well as a direction.
      if(findWordInsertLocation(wordToInsert) === null) {
        console.log("Generating grid...")
        regenerateGrid();
        return
      }
      const {row, cell, dir} = findWordInsertLocation(wordToInsert);
  
      
    insertWord(wordToInsert, row, cell, dir)


}

function insertWord(wordToInsert, row, cell, dir){

switch(dir){
  case "HORIZONTAL_POS":
      //Handle word placement if horizontal  

      
      for(let i = 0; i < wordToInsert.length; i++){
      setLetters((prev)=>{
        return ([...prev.slice(0,row), [...prev[row].slice(0,cell+i), wordToInsert[i], ...prev[row].slice(cell+1+i)], ...prev.slice(row+1)])
      })
    }

    break;
  case "HORIZONTAL_NEG":
      //Handle word placement if horizontal  

      for(let i = 0; i < wordToInsert.length; i++){
      setLetters((prev)=>{
        return ([...prev.slice(0,row), [...prev[row].slice(0,cell-i), wordToInsert[i], ...prev[row].slice(cell+1-i)], ...prev.slice(row+1)])
      })
    }

    break;


  case "VERTICAL_POS":
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
      //Slice each row and replace one cell for every letter. Decrement row, decrement cell.
      for(let i = 0; i < wordToInsert.length; i++){
        setLetters((prev)=>{
     
          return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell-i), wordToInsert[i], ...prev[row-i].slice(cell+1-i)], ...prev.slice(row+1-i)])

      })
      }

    break;

  case "DIAGONAL_UP_POS":
      //Handle word placement if diagonal up right
        //Slice each row and replace one cell for every letter. Decrement row, increment cell.
        for(let i = 0; i < wordToInsert.length; i++){
          setLetters((prev)=>{
       
            return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell+i), wordToInsert[i], ...prev[row-i].slice(cell+1+i)], ...prev.slice(row+1-i)])

        })
        }

      break;

    case "DIAGONAL_DOWN_NEG":
      //Handle word placement if diagonal down left 
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

function validateWordInsertion(word, row, cell, dir){

if(!checkWordFits(word, row, cell, dir)) return false;

const cellsToFill = getCellsToBeReplaced(word, row, cell, dir);

let validated = true;
let lettersOverwritten = 0;
cellsToFill.forEach((item)=>{

  if(!isCellEmpty(item)){

    if(!isCellSame(item)){
      validated = false;
    }
    else{
      lettersOverwritten++;
      if(lettersOverwritten >= word.length){
        validated = false;
      }
    }


  }


  

})
return validated;
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
return cells
}

function isCellEmpty(cell){

return letters[cell.row][cell.cell] === "" ? true : false;
}

function isCellSame(cell){
return letters[cell.row][cell.cell] === cell.letter ? true : false;
}

console.log(letters)

return {letters}

}