import Head from 'next/head'
import Image from 'next/image'
import Row from '../components/Row.js'
import useWordSearchGrid from '../hooks/useWordSearchGrid';
import {useRef, useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'

const gridCellCount = 100;
const gridColumnCount = 10;

const maxWords = Math.floor(gridCellCount / 10);
const maxChars = Math.floor(gridCellCount/100*60)


const wordList = ["APPLE", "BANANA", "MANGO", "KIWI", "ORANGE", "PEAR", "STRAWBERRY", "MELON", "GRAPE", "PINEAPPLE", "APRICOT", "ELDERBERRY", "DAMSON", "PLUM", "SULTANA", "BLUEBERRY", "GRAPEFRUIT", "KUMQUAT", "LIME", "LEMON", "RASPBERRY", "BLACKBERRY", "RHUBARB", "WATERMELON", "TOMATO"];



export default function Home() {

const {letters, wordLocations, wordsRemaining, setWordsRemaining, selectedCells, completedCells, onCellSelected, regenerateGrid, loaded} = useWordSearchGrid(gridCellCount, gridColumnCount, wordList);

useEffect(() => {
  
  setWordsRemaining(wordLocations)

}, [letters]);


if(!loaded){
  return <div></div>
}
  return (
    <div className={styles.container}>
      <Head>
        <title>Wordsearch</title>
        <meta name="description" content="Wordsearch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>



        <div className={styles.grid}>
          <table className="box"> 
          <tbody>

          {letters.map((arr, index)=>{    

            return <Row key={Math.random()} selectedCells={selectedCells} completedCells={completedCells} cells={arr} row={index} onSelect={onCellSelected}/>

          })}

          </tbody>
          </table>




        </div>
        <div className="words">
            {wordLocations.map((word, index)=>{
              return <h4 key={index} style={!wordsRemaining.find(remainingWord => remainingWord.id === word.id) ? {"textDecoration": "line-through", "textDecorationThickness": "3px"} : {}}>{word.insertedWord}</h4>
            })}
          </div>

          {wordsRemaining.length === 0 ? <p>All words found!</p> : <p></p>}
        <button onClick={()=>{
          regenerateGrid();
        }}>Restart</button>

      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
