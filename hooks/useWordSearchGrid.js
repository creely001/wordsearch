import { useState, useEffect, useRef } from 'react';

export default function useWordSearchGrid(gridSize, wordList){

const chosenList = useRef(wordList[0])

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    // TODO: Set min/max grid size cap here...

const maxWords = gridSize;
const numCells = gridSize * gridSize;
const maxChars = Math.floor((numCells/100)*70) //% of total cells in grid
const maxWordLength = gridSize;


function handleSelectChange(value){
  chosenList.current = wordList.find((list)=>{
    return list.name === value
  })
  handleRegenerateGrid()
}

function shuffleArray(arr){

return arr.sort(() => Math.random() - 0.5);

}

function getWords(){

  const shuffledWordList = shuffleArray(chosenList.current.words);
  const wordsToBeInserted = []
  let i = 0;
  while(wordsToBeInserted.length < maxWords){
    const word = shuffledWordList[i]
    if (!wordsToBeInserted.includes(word) && word.length <= maxWordLength){
      wordsToBeInserted.push(word);
    }
    i++;
  }
  if(wordsToBeInserted.join("").length <= maxChars) return wordsToBeInserted;
  return getWords();

}

const words = useRef(getWords())

const chars = words.current.join("").length;

const [grid, setGrid] = useState([]);
const wordsToInsert = useRef(words.current.map((word, index)=>{
  return {
    word,
    index
  }
}))
const wordLocations = useRef([])
const usedWords = useRef([])

const selectedCellsRef = useRef([]) 
const [selectedCells, setSelectedCells] = useState([])
const [completedCells, setCompletedCells] = useState([])
const [wordsRemaining, setWordsRemaining] = useState(wordLocations);
const [loaded, setLoaded] = useState(false)


function handleRegenerateGrid(){
  setLoaded(false)
  regenerateGrid();
  setSelectedCells([])
  setCompletedCells([])
  setWordsRemaining([])
  words.current = getWords();

}

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
    if(isWord){
      setCompletedCells((prev)=>{
        return [...prev, ...selectedCells]
      })

    }
    setSelectedCells(selectedCells)
    setTimeout(() => {
      setSelectedCells([])
    }, 200);
    selectedCellsRef.current = []

  }
}



function validateWordFromSelectedCells(cells){
  const words = wordLocations.current.map((word)=>{
    return word.insertedWord
  })
  const lettersSelected = cells.map((cell)=>{
    return cell.letter;
  }).join("")
  const reversedLetters = lettersSelected.split("").reverse().join("")

  if(!words.includes(lettersSelected)){

    if(!words.includes(reversedLetters)){
      return false;
    }

  } 


  // check word is "complete" and not just part of another word e.g apple in pineapple should return false.
    // Each word should have an object attached corresponding to its id coordinates in the grid

    
    const selectedStartPos = cells[0]


      // return true

      //does wordLocations have a word that matches the selectedLetters
      const foundWord = wordLocations.current.find((word)=>{
        return word.insertedWord === lettersSelected || word.insertedWord === reversedLetters
      })
      if(!foundWord) return false


      // does the found word have a row and cell that match start pos?
      if(foundWord.row !== selectedStartPos.row && foundWord.cell !== selectedStartPos.cell) return false


      // does the selectedstartpos direction match the found word's direction?
      if(selectedStartPos.direction !== foundWord.dir) return false

      

  //Finally, remove the found word from the words remaining
  setWordsRemaining((prev)=>{
    return prev.filter((prevWord)=>{
      return prevWord.id !== foundWord.id
    })
  })

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
    return
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
  direction: dir,          
          letter: grid[row][cell+i],
          row: row,
          cell: cell+i
        })
      } 
      break;
      case "HORIZONTAL_NEG":
        for(let i = 0; i < count; i++){
          cells.push({
            direction: dir,
            letter: grid[row][cell-i],
            row: row,
            cell: cell-i
          })
        } 
        break;
    case "VERTICAL_POS":
      for(let i = 0; i < count; i++){
        cells.push({
          direction: dir,
          letter: grid[row+i][cell],
          row: row+i,
          cell: cell
        })
      } 
      break;
      case "VERTICAL_NEG":
        for(let i = 0; i < count; i++){
          cells.push({
            direction: dir,
            letter: grid[row-i][cell],
            row: row-i,
            cell: cell
          })
        } 
        break;
    case "DIAGONAL_UP_NEG":
                    //Handle word placement if diagonal up left 
      for(let i = 0; i < count; i++){
        cells.push({
          direction: dir,
          letter: grid[row-i][cell-i],
          row: row-i,
          cell: cell-i
        })
      } 
      break;
    case "DIAGONAL_UP_POS":
              //Handle word placement if diagonal up right 
              for(let i = 0; i < count; i++){
                cells.push({
                  direction: dir,
                  letter: grid[row-i][cell+i],
                  row: row-i,
                  cell: cell+i
                })
              } 
              break;
  
      case "DIAGONAL_DOWN_NEG":
        //Handle word placement if diagonal down left 
        for(let i = 0; i < count; i++){
          cells.push({
            direction: dir,
            letter: grid[row+i][cell-i],
            row: row+i,
            cell: cell-i
          })
        } 
        break;
      case "DIAGONAL_DOWN_POS":
        //Handle word placement if diagonal down right 
        for(let i = 0; i < count; i++){
          cells.push({
              direction: dir,
            letter: grid[row+i][cell+i],
            row: row+i,
            cell: cell+i
          })
        } 
        break;
  }
  return cells
  }


function findWordInsertLocation(wordToInsert){

// Iterate through every cell in the grid and return a list of valid locations for the word to instantiate in, as well as its direction.
const insertionPositions = grid.map((row, rowIndex)=>{
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
wordsToInsert.current = words.current.map((word, index)=>{
  return {
    word,
    index
  }
})

  initWord();



}, [grid]);

function regenerateGrid(){
wordLocations.current = []
usedWords.current = []
setGrid(()=>{
        
  const entireGrid = [];
  let gridRow = [];
  for(let i = 0; i < numCells; i++){

    gridRow.push("")
    if(gridRow.length === gridSize) 
    {
      entireGrid.push(gridRow);
      gridRow = [];
    }

  }
  
  return entireGrid;
})


}

function getNextWord(){

const unusedWordIndexArr = wordsToInsert.current.map((word)=>{
  return word.index
}).filter((wordIndex)=>{
  return !usedWords.current.includes(wordIndex)
})
if(unusedWordIndexArr.length === 0) return null
usedWords.current = [...usedWords.current, unusedWordIndexArr[0]]

return {
  id: unusedWordIndexArr[0],
  wordToInsert: wordsToInsert.current[unusedWordIndexArr[0]].word
}

}

function addRandomLetters(){

  const remainingCells = grid.map((row)=>{
    return row.filter((cell)=>{
      return cell === ""
    })
  }).filter((row)=>{
    return row.length !== 0;
  })

  if(remainingCells.length === 0){
    setLoaded(true)
    return null
  }

 setGrid((prev) => {
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


    const word = getNextWord();


    if(word === null) {
      //After all words have been added, fill remaining cells with random letters
      console.log("All words added.")

      return addRandomLetters() === null ? addRandomLetters() : null

    };

    const wordToInsert = word.wordToInsert;
    const id = word.id



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
    const insertedWord = {
     id, insertedWord: wordToInsert, row, cell, dir
    }
    wordLocations.current = [...wordLocations.current, insertedWord]

}


function insertWord(wordToInsert, row, cell, dir){



switch(dir){
  case "HORIZONTAL_POS":
      //Handle word placement if horizontal  

      
      for(let i = 0; i < wordToInsert.length; i++){
      setGrid((prev)=>{
        return ([...prev.slice(0,row), [...prev[row].slice(0,cell+i), wordToInsert[i], ...prev[row].slice(cell+1+i)], ...prev.slice(row+1)])
      })
    }

    break;
  case "HORIZONTAL_NEG":
      //Handle word placement if horizontal  

      for(let i = 0; i < wordToInsert.length; i++){
      setGrid((prev)=>{
        return ([...prev.slice(0,row), [...prev[row].slice(0,cell-i), wordToInsert[i], ...prev[row].slice(cell+1-i)], ...prev.slice(row+1)])
      })
    }

    break;


  case "VERTICAL_POS":
      //Place letters vertically
      //Slice each row and replace one cell for every letter.
      for(let i = 0; i < wordToInsert.length; i++){
        setGrid((prev)=>{
     
          return ([...prev.slice(0,row+i), [...prev[row+i].slice(0,cell), wordToInsert[i], ...prev[row+i].slice(cell+1)], ...prev.slice(row+1+i)])

      })
      }
    break;
    case "VERTICAL_NEG":
      //Handle word placement if vertical  
      //Place letters vertically
      //Slice each row and replace one cell for every letter.
      for(let i = 0; i < wordToInsert.length; i++){
        setGrid((prev)=>{
     
          return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell), wordToInsert[i], ...prev[row-i].slice(cell+1)], ...prev.slice(row+1-i)])

      })
      }
    break;
  case "DIAGONAL_UP_NEG":
      //Handle word placement if diagonal up left 
      //Slice each row and replace one cell for every letter. Decrement row, decrement cell.
      for(let i = 0; i < wordToInsert.length; i++){
        setGrid((prev)=>{
     
          return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell-i), wordToInsert[i], ...prev[row-i].slice(cell+1-i)], ...prev.slice(row+1-i)])

      })
      }

    break;

  case "DIAGONAL_UP_POS":
      //Handle word placement if diagonal up right
        //Slice each row and replace one cell for every letter. Decrement row, increment cell.
        for(let i = 0; i < wordToInsert.length; i++){
          setGrid((prev)=>{
       
            return ([...prev.slice(0,row-i), [...prev[row-i].slice(0,cell+i), wordToInsert[i], ...prev[row-i].slice(cell+1+i)], ...prev.slice(row+1-i)])

        })
        }

      break;

    case "DIAGONAL_DOWN_NEG":
      //Handle word placement if diagonal down left 
      //Place letters diagonally right
      //Slice each row and replace one cell for every letter. Increment both cell and row.
      for(let i = 0; i < wordToInsert.length; i++){
        setGrid((prev)=>{
     
          return ([...prev.slice(0,row+i), [...prev[row+i].slice(0,cell-i), wordToInsert[i], ...prev[row+i].slice(cell+1-i)], ...prev.slice(row+1+i)])

      })
      }

    break;
    case "DIAGONAL_DOWN_POS":
      //Handle word placement if diagonal down right 
      //Place letters diagonally right
      //Slice each row and replace one cell for every letter. Increment both cell and row.
      for(let i = 0; i < wordToInsert.length; i++){
        setGrid((prev)=>{
     
          return ([...prev.slice(0,row+i), [...prev[row+i].slice(0,cell+i), wordToInsert[i], ...prev[row+i].slice(cell+1+i)], ...prev.slice(row+1+i)])

      })
      }

    break;
}

}



function checkWordFits(word, row, cell, dir){

const rowCount = grid.length; //The amount of rows in the grid..
const rowLength = grid[row].length; //How many cells this row has..
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
      if(lettersOverwritten >= word.length-1){
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

return grid[cell.row][cell.cell] === "" ? true : false;
}

function isCellSame(cell){
return grid[cell.row][cell.cell] === cell.letter ? true : false;
}




return {grid, wordLocations: wordLocations.current, wordsRemaining, setWordsRemaining, selectedCells, completedCells, onCellSelected: handleCellSelected, regenerateGrid: handleRegenerateGrid, handleSelectChange, chosenList, loaded}


}