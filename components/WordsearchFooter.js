export default function WordsearchFooter({wordLocations, wordsRemaining, onRegenerateGrid}){
    return     <> 
    <div className="words">
    {wordLocations.map((word, index)=>{
      return <h4 key={index} style={!wordsRemaining.find(remainingWord => remainingWord.id === word.id) ? {"textDecoration": "line-through", "textDecorationThickness": "3px"} : {}}>{word.insertedWord}</h4>
    })}
    </div>
    {wordsRemaining.length === 0 ? <p>All words found!</p> : <p></p>}
    <button onClick={()=>{onRegenerateGrid()}}>Restart</button>
    </>

}