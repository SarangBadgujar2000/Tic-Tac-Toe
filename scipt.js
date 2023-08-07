const grid=document.querySelectorAll(".box")
let move=new Audio("ting.mp3")
let gameOverAudio=new Audio("gameover.mp3")
let turn="X"
let count=0;
console.log(grid)
// Accessing the first element (index 0) from the NodeList
// const firstElement = grid[0].innerHTML;
// console.log(firstElement);

// Alternatively, you can use the item() method
// const secondElement = grid.item(1).innerHTML; // Note that the index starts from 0
// console.log(secondElement);


//function to change turn 
const changeTurn=()=>{
    return turn==="X"?"O":"X";
}
//function to check win
const checkWin=()=>{
    const wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let foundWin=false;
    wins.forEach(function(val){
        let firstElement=grid.item(val[0]).innerHTML
        let secondElement=grid.item(val[1]).innerHTML
        let thirdElement=grid.item(val[2]).innerHTML
        
        if(firstElement!=="" && secondElement!=="" && thirdElement!=="" && firstElement===secondElement && firstElement===thirdElement){
            foundWin=true;
        }
        
    })
    //console.log("Is Win? ", foundWin); // Log the foundWin value
    return foundWin;

}


//game logic
grid.forEach(function(val){
    val.addEventListener("click",function(e){
        val.innerText=turn
        turn=changeTurn()
        move.play()
        count++;
        if(count>=5 && checkWin()){
            console.log(count)
            console.log("Game Over! Total Moves: ", count); // Log the total moves when the game is over
            gameOverAudio.play()
        }
        
    })
})

const clrbtn=document.getElementById("clearbtn")
clrbtn.addEventListener("click",()=>{
    grid.forEach(function(val){
        val.innerHTML=""
    })    
})