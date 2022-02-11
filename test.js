const usedWords = {current: [0, 1, 2]};

const wordsToInsert = {current: [{word: "A", index: 0}, {word: "B", index: 1}, {word: "C", index: 2}]}

function doStuff(){
    const wordsToBeInserted = []
    while(wordsToBeInserted.length < 10){
      wordsToBeInserted.push("Test")
    }
    console.log(wordsToBeInserted)
}

doStuff()

