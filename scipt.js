const grid=document.querySelector(".grid-container")
const gridAll=document.querySelectorAll(".box")

let move=new Audio("ting.mp3")
let gameOverAudio=new Audio("gameover.mp3")
let turn="X"
let count=0;

// Accessing the first element (index 0) from the NodeList
// const firstElement = grid[0].innerHTML;
// console.log(firstElement);

// Alternatively, you can use the item() method
// const secondElement = grid.item(1).innerHTML; // Note that the index starts from 0
// console.log(secondElement);

const player1=document.getElementById("player-1-StatusMsg");
const player2=document.getElementById("player-2-StatusMsg");
const draw=document.getElementById("Draw")



//function to change turn 
const changeTurn=()=>{
    if(turn==="X"){
        player2.innerHTML="It's Your Turn";
        player1.innerHTML="";
        return "O";
    }else{
        player1.innerHTML="It's Your Turn";
        player2.innerHTML="";
        return "X"
    }
    
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
        let firstElement=gridAll.item(val[0]).innerHTML
        let secondElement=gridAll.item(val[1]).innerHTML
        let thirdElement=gridAll.item(val[2]).innerHTML
        
        if(firstElement!=="" && secondElement!=="" && thirdElement!=="" && firstElement===secondElement && firstElement===thirdElement){
            gridAll.item(val[0]).style.backgroundColor="red";
            gridAll.item(val[1]).style.backgroundColor="red";
            gridAll.item(val[2]).style.backgroundColor="red";
            foundWin=true;
        }
        
    })
    //console.log("Is Win? ", foundWin); // Log the foundWin value
    return foundWin;

}


//game logic
let gameIsOver=false;
grid.addEventListener("click",function(event){
    const box=event.target
    if(!gameIsOver && box.classList.contains("box") && box.innerHTML===""){
        box.innerText=turn
        turn=changeTurn()
        move.play()
        count++;
        if(count>=5 && checkWin()){
            gameIsOver=true;
            if(turn==="X"){
                player2.style.color="Green"
                player1.style.color="Brown"
                player2.style.animation="blink 1s infinite"
                player2.innerHTML="Congratulation!! You win the Game";
                player1.innerHTML="Better Luck Next Time";
            }else{
                player1.style.color="Green"
                player2.style.color="Brown"
                player1.style.animation="blink 1s infinite"
                player1.innerHTML="Congratulation!! You win the Game";
                player2.innerHTML="Better Luck Next Time";
            }
            console.log("Game Over! Total Moves: ", count); // Log the total moves when the game is over
            gameOverAudio.play()
        }
        if(count==9 && checkWin()==false){
            gameIsOver=true;
            draw.style.color=" purple"
            draw.innerHTML="Match Draw";
            player1.innerHTML="";
            player2.innerHTML="";
            gameOverAudio.play()
        }
    }
})


//Reset Button Logic
const clrbtn=document.getElementById("clearbtn")
clrbtn.addEventListener("click",()=>{
    count=0;
    gameIsOver=false;
    player1.innerHTML="Start From You"
    player2.innerHTML="";
    player2.style.color="Black"
    player1.style.color="Black"
    player2.style.animation="none"
    player1.style.animation="none"
    draw.innerHTML=""
    turn="X"
    gridAll.forEach(function(val){
        val.innerHTML=""
        val.style.backgroundColor="aliceblue";
    })    
})