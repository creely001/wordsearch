
import {useRef, useState} from 'react';


export default function useWordSearchWords(wordList, gridSize, handleRegenerateGrid){

    // const maxWords = Math.floor(((gridSize/100) * 50) + gridSize/4);
    const maxWords = gridSize - 3
    const numCells = gridSize * gridSize;
    const maxChars = Math.floor((numCells/100)*70) //% of total cells in grid
    const maxWordLength = gridSize;
    

    const chosenList = useRef(wordList[0])

    function handleDropdownChange(value){
        chosenList.current = wordList.find((list)=>{
          return list.name === value
        })
        words.current = getWords();
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
        
        //const words = useRef(getWords())
        const [words, setWords] = useState(getWords())

        function regenerateWords(){
            setWords(getWords())
        }

        const chars = words.join("").length;

        if(chars > maxChars) {
            console.log(`Too many characters in combined words. Maximum is ${maxChars}, current is ${chars}.`)
            return;
          }
          if(words.length > maxWords){
            console.log(`Too many words to add. Maximum is ${maxWords}, current is ${words.length}.`);
            return;
          }

    return {handleDropdownChange, chosenList, words, regenerateWords}
}