const usedWords = {current: [0, 1, 2]};

const wordsToInsert = {current: [{word: "A", index: 0}, {word: "B", index: 1}, {word: "C", index: 2}]}

function doStuff(){
  const gridSize = 20;
  const maxWords = (Math.floor((gridSize+1 * Math.log(3)*gridSize) / 2 + (1*gridSize/2) - 5 ))
  console.log(maxWords)
}

doStuff()

