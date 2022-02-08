const obj = {
    background: "some stuff"
}

function addString(){
    return {
        ...obj,
        background: "hi"
    }
}

for(let i = 0; i < 4; i++){
    console.log(addString())
}