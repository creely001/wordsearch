import styles from '../styles/Home.module.css'
import useWordSearch from '../hooks/useWordSearch';
import {useEffect, useState} from 'react'
import Grid from './Wordsearch/Grid'
import WordsearchHeader from './Wordsearch/WordsearchHeader';
import WordsearchFooter from './Wordsearch/WordsearchFooter';

<<<<<<< HEAD
const fruits = ["APPLE", "BANANA", "MANGO", "KIWI", "ORANGE", "PEAR", "STRAWBERRY", "MELON", "GRAPE", "PINEAPPLE", "APRICOT", "ELDERBERRY", "DAMSON", "PLUM", "SULTANA", "BLUEBERRY", "GRAPEFRUIT", "KUMQUAT", "LIME", "LEMON", "RASPBERRY", "BLACKBERRY", "RHUBARB", "WATERMELON", "TOMATO"];
const vegetables = ["PEA", "CUCUMBER", "BROCCOLI", "AUBERGINE", "CARROT", "POTATO", "CHILI", "SPINACH", "LETTUCE", "MUSHROOM", "CABBAGE", "LEEK", "SWEETCORN", "PUMPKIN", "PARSNIP", "TURNIP", "RADISH", "CELERY", "ASPARAGUS", "PEPPER", "BEETROOT"];
const animals = ["LION", "TIGER", "CAT", "PARROT", "DOG", "RABBIT", "FOX", "RAT", "REINDEER", "BAT", "MOUSE", "BADGER", "MOLE", "HEDGEHOG", "MONKEY", "TOAD", "FROG", "DEER", "OTTER", "HORSE", "ZEBRA", "SHEEP", "CHICKEN", "OWL", "RACCOON", "MEERKAT", "CAMEL", "SQUIRREL"]
const euroCountries = ["GERMANY", "GREECE", "CYPRUS", "ITALY", "IRELAND", "ENGLAND", "SCOTLAND", "WALES", "AUSTRIA", "BELARUS", "BULGARIA", "CROATIA", "FINLAND", "FRANCE", "SWITZERLAND", "NETHERLANDS", "SWEDEN", "DENMARK", "SPAIN", "PORTUGAL", "HUNGARY", "POLAND", "TURKEY", "BELGIUM", "BOSNIA", "LITHUANIA", "SERBIA", "ROMANIA", "UKRAINE", "MONTENEGRO", "MALTA", "MACEDONIA", "SLOVENIA", "SLOVAKIA", "NORWAY"]
const empires = ["BRITISH", "MONGOL", "RUSSIAN", "QING", "SPANISH", "FRENCH", "ABBASID", "UMAYYAD", "YUAN", "MING", "ACHAEMENID", "ROMAN", "OTTOMAN", "BYZANTINE", "PORTUGUESE", "CARTHAGINIAN", "EGYPTIAN", "ASSYRIAN", "HOLYROMAN", "SELEUCID", "SELJUQ", "TIMURID", "MUGHAL", "AZTEC", "JAPAN", "FRANKISH"]
const constellations = ["ANDROMEDA", "ANTLIA", "AQUARIUS", "ARIES", "CAELUM", "CAPRICORNUS", "CANCER", "CARINA", "CETUS", "CEPHEUS", "CORVUS", "DRACO", "DORADO", "ERIDANUS", "HERCULES", "DELPHINUS", "LYRA", "LYNX", "MUSCA", "NORMA", "ORION", "LEO", "PEGASUS", "PHOENIX", "PISCES", "SAGITTARIUS", "SERPENS", "SCUTUM", "TUCANA", "TRIANGULUM", "VIRGO", "VELA"];



=======

const fruits = ["APPLE", "BANANA", "MANGO", "KIWI", "ORANGE", "PEAR", "STRAWBERRY", "MELON", "GRAPE", "PINEAPPLE", "APRICOT", "ELDERBERRY", "DAMSON", "PLUM", "SULTANA", "BLUEBERRY", "GRAPEFRUIT", "KUMQUAT", "LIME", "LEMON", "RASPBERRY", "BLACKBERRY", "RHUBARB", "WATERMELON", "TOMATO"];
const vegetables = ["PEA", "CUCUMBER", "BROCCOLI", "AUBERGINE", "CARROT", "POTATO", "CHILI", "SPINACH", "LETTUCE", "MUSHROOM", "CABBAGE", "LEEK", "SWEETCORN", "PUMPKIN", "PARSNIP", "TURNIP", "RADISH", "CELERY", "ASPARAGUS", "PEPPER", "BEETROOT"];
const animals = ["LION", "TIGER", "CAT", "PARROT", "DOG", "RABBIT", "FOX", "RAT", "REINDEER", "BAT", "MOUSE", "BADGER", "MOLE", "HEDGEHOG", "MONKEY", "TOAD", "FROG", "DEER", "OTTER", "HORSE", "ZEBRA", "SHEEP", "CHICKEN", "OWL", "RACCOON", "MEERKAT", "CAMEL", "SQUIRREL"]
const euroCities = ["GERMANY", "GREECE", "CYPRUS", "ITALY", "IRELAND", "ENGLAND", "SCOTLAND", "WALES", "AUSTRIA", "BELARUS", "BULGARIA", "CROATIA", "FINLAND", "FRANCE", "SWITZERLAND", "NETHERLANDS", "SWEDEN", "DENMARK", "SPAIN", "PORTUGAL", "HUNGARY", "POLAND", "TURKEY", "BELGIUM", "BOSNIA", "LITHUANIA", "SERBIA", "ROMANIA", "UKRAINE", "MONTENEGRO", "MALTA", "MACEDONIA", "SLOVENIA", "SLOVAKIA", "NORWAY"]
const empires = ["BRITISH", "MONGOL", "RUSSIAN", "QING", "SPANISH", "FRENCH", "ABBASID", "UMAYYAD", "YUAN", "MING", "ACHAEMENID", "ROMAN", "OTTOMAN", "BYZANTINE", "PORTUGUESE", "CARTHAGINIAN", "EGYPTIAN", "ASSYRIAN", "HOLYROMAN", "SELEUCID", "SELJUQ", "TIMURIDS", "MUGHAL", "AZTEC", "JAPAN", "FRANKS"]
const constellations = ["ANDROMEDA", "ANTLIA", "AQUARIUS", "ARIES", "CAELUM", "CAPRICORNUS", "CANCER", "CARINA", "CETUS", "CEPHEUS", "CORVUS", "DRACO", "DORADO", "ERIDANUS", "HERCULES", "DELPHINUS", "LYRA", "LYNX", "MUSCA", "NORMA", "ORION", "LEO", "PEGASUS", "PHOENIX", "PISCES", "SAGITTARIUS", "SERPENS", "SCUTUM", "TUCANA", "TRIANGULUM", "VIRGO", "VELA"];

>>>>>>> a1959b1b7657cb7cf94297915ca3a9f45a20671c
const wordList = [
  {id:1, name: "Fruits", words: fruits},
  {id:2, name: "Vegetables", words: vegetables}, 
  {id:3, name: "Animals", words:animals},
<<<<<<< HEAD
  {id:4, name: "European Countries", words:euroCountries},
=======
  {id:4, name: "European Cities", words:euroCities},
>>>>>>> a1959b1b7657cb7cf94297915ca3a9f45a20671c
  {id:5, name: "Empires", words: empires},
  {id:6, name: "Constellations", words:constellations}
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
    }, [grid]);




if(!loaded){
        return <div></div>
}
    return <div>

    <WordsearchHeader chosenList={chosenList} wordListOptions={wordList} handleWordListSelection={handleDropdownChange} incrementGridSize={incrementGridSize} decrementGridSize={decrementGridSize} gridSizeDisplay={gridSize}/>

    <Grid grid={grid} selectedCells={selectedCells} completedCells={completedCells} onSelect={handleCellSelected} />

    <WordsearchFooter wordLocations={wordLocations} wordsRemaining={wordsRemaining} onRegenerateGrid={handleRegenerateGrid}/>

        
  </div>
}