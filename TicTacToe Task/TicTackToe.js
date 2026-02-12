let flag = true;
let gameOver = false;
let winCheck = Array(9).fill("");
let winner = "";

let winOptions =[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

for (let i =0; i <= 8;i++){   
    document.getElementById(i).addEventListener("click" , function() {
        if (gameOver) return;
        if (!this.textContent){
            if(flag == true){
                this.textContent = "X"
            }else{
                this.textContent = "O"
            }
            flag = !flag
            winCheck[i]=this.textContent;
            winner = checkWinner(winCheck);
            if(winner){
                gameOver = true;
                document.getElementById("winnerMessage").textContent = winner;
                const btn = playAgainBtn()
                btn.addEventListener("click", resetGame);
            }else if(winCheck.every(cell => cell !== "")){
                gameOver = true;
                document.getElementById("winnerMessage").textContent = "Draw!!"
                const btn = playAgainBtn()
                btn.addEventListener("click", resetGame);
            }
        }
    });
}
function playAgainBtn(){
    const btn = document.createElement("button");
    btn.textContent = "Play Again";
    document.getElementById("playAgain").appendChild(btn);
    return btn;
}

function resetGame(){
    flag = true;
    gameOver = false;
    winCheck = Array(9).fill("");
    winner = "";
    for (let i =0; i <= 8;i++){ 
        document.getElementById(i).innerHTML = "";
    }
    document.getElementById("winnerMessage").innerHTML = "";
    document.getElementById("playAgain").innerHTML = "";
}

function checkWinner(winCheck){
    for (const [a,b,c] of winOptions) { 
        if(winCheck[a] && winCheck[a] === winCheck[b] && winCheck[a] === winCheck[c]){
            return `The Winner is: ${winCheck[a]}!!`
        }
     }
}
