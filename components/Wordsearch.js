import styles from '../styles/Home.module.css'
import useWordSearch from '../hooks/useWordSearch';
import {useEffect} from 'react'
import Grid from './Wordsearch/Grid'
import WordsearchHeader from './Wordsearch/WordsearchHeader';
import WordsearchFooter from './Wordsearch/WordsearchFooter';

const gridSize = 10;

const fruits = ["APPLE", "BANANA", "MANGO", "KIWI", "ORANGE", "PEAR", "STRAWBERRY", "MELON", "GRAPE", "PINEAPPLE", "APRICOT", "ELDERBERRY", "DAMSON", "PLUM", "SULTANA", "BLUEBERRY", "GRAPEFRUIT", "KUMQUAT", "LIME", "LEMON", "RASPBERRY", "BLACKBERRY", "RHUBARB", "WATERMELON", "TOMATO"];
const vegetables = ["PEA", "CUCUMBER", "BROCCOLI", "AUBERGINE", "CARROT", "POTATO", "CHILI", "SPINACH", "LETTUCE", "MUSHROOM", "CABBAGE", "LEEK", "SWEETCORN", "PUMPKIN", "PARSNIP", "TURNIP", "RADISH", "CELERY", "ASPARAGUS", "PEPPER", "BEETROOT"];
const animals = ["LION", "TIGER", "CAT", "PARROT", "DOG", "RABBIT", "FOX", "RAT", "REINDEER", "BAT", "MOUSE", "BADGER", "MOLE", "HEDGEHOG", "MONKEY", "TOAD", "FROG", "DEER", "OTTER", "HORSE", "ZEBRA", "SHEEP", "CHICKEN", "OWL", "RACCOON", "MEERKAT", "CAMEL", "SQUIRREL"]

const wordList = [
  {name: "Fruits", words: fruits},
  {name: "Vegetables", words: vegetables}, 
  {name: "Animals", words:animals}
]


export default function Wordsearch(){

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
} = useWordSearch(
         gridSize, 
         wordList);

    // word retrieval list handling
    // grid generation/regeneration
    // cell/word handling


    useEffect(() => {
      setWordsRemaining(wordLocations)
    }, [grid]);




if(!loaded){
        return <div></div>
}
    return <div className={styles.main} >

    <WordsearchHeader chosenList={chosenList} handleSelectChange={handleDropdownChange}/>

    <Grid grid={grid} selectedCells={selectedCells} completedCells={completedCells} onSelect={handleCellSelected} />

    <WordsearchFooter wordLocations={wordLocations} wordsRemaining={wordsRemaining} onRegenerateGrid={handleRegenerateGrid}/>

        
  </div>
}