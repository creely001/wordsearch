const usedWords = {current: [0, 1, 2]};

const wordsToInsert = {current: [{word: "A", index: 0}, {word: "B", index: 1}, {word: "C", index: 2}]}

function doStuff(){
    const unusedWords = wordsToInsert.current.map((word)=>{
        return word.index
    }).filter((word)=>{
        return !usedWords.current.includes(word)
    })
      
      console.log("res", unusedWords)
}

doStuff()

