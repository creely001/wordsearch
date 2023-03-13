import useWordSearch from '../hooks/useWordSearch';
import {useEffect, useState} from 'react'
import Grid from './Wordsearch/Grid'
import WordsearchHeader from './Wordsearch/WordsearchHeader';
import WordsearchFooter from './Wordsearch/WordsearchFooter';
import styles from './wordsearch.module.css'

const cyber = ["APPLE", "BANANA", "MANGO", "KIWI", "ORANGE", "PEAR", "STRAWBERRY", "MELON", "GRAPE", "PINEAPPLE", "APRICOT", "ELDERBERRY", "DAMSON", "PLUM", "SULTANA", "BLUEBERRY", "GRAPEFRUIT", "KUMQUAT", "LIME", "LEMON", "RASPBERRY", "BLACKBERRY", "RHUBARB", "WATERMELON", "TOMATO"];


const wordList = [
  {id:1, name: "Fruits", words: cyber},
]

export default function Wordsearch(){


  const minGridSize = 6;
  const maxGridSize = 20;

    
    const [gridSize, setGridSize] = useState(10)

    function incrementGridSize(){
        setGridSize(Math.min(Math.max(gridSize + 1, minGridSize), maxGridSize))
    }
    
    function decrementGridSize(){
      setGridSize(Math.min(Math.max(gridSize - 1, minGridSize), maxGridSize))
    }

    const {
      handleDropdownChange, 
      chosenList,

       grid,
       handleRegenerateGrid, 
       wordLocations, 

       wordsRemaining, 
       setWordsRemaining, 

       selectedCells, 
       completedCells, 
       handleCellSelected, 

       loaded
} = useWordSearch(gridSize, wordList);


    useEffect(() => {
      setWordsRemaining(wordLocations)
    }, [grid, setWordsRemaining, wordLocations]);




if(!loaded){
        return <div></div>
}
    return <div className={styles.mainContainer}>

    <WordsearchHeader chosenList={chosenList} wordListOptions={wordList} handleWordListSelection={handleDropdownChange} incrementGridSize={incrementGridSize} decrementGridSize={decrementGridSize} gridSizeDisplay={gridSize}/>

    <Grid grid={grid} selectedCells={selectedCells} completedCells={completedCells} onSelect={handleCellSelected} />

    <WordsearchFooter wordLocations={wordLocations} wordsRemaining={wordsRemaining} onRegenerateGrid={handleRegenerateGrid}/>

        
  </div>
}