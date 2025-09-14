let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_btn");
let newGame = document.querySelector("#newBtn");
let msgW = document.querySelector("#winMsg");
let msgCon = document.querySelector(".messageContainer");
let turnO = true;
let count = 0;
const WinPatterns =[
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
];
const resetGame=()=>{
    turnO = true;
    enableBoxes();
    for(let box of boxes){
        box.innerHTML="";
    }
   msgCon.classList.add("hide");
    count = 0;
};
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerHTML="O";
            turnO=false;
        }else{
            box.innerHTML="X";
            turnO=true;
        }
        box.disabled = true; //ekbar ey click kora jabe
        count++;
        let winnerFound = CheckWinner();
        if(!winnerFound && count===9){
            msgW.innerHTML="Nooooo Draw Draw";
            msgCon.classList.remove("hide");
        }
    })
    if(count>=8){
        console.log("Draw");
    }

});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
    }
};
const showWinner=(winner)=>{
    msgW.innerText =`Congratulations! Winner is ${winner}`;
    msgCon.classList.remove("hide");
    disableBoxes();
};
const CheckWinner= () =>{
    for(let pattern of WinPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1!="" && pos2 !="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                console.log("Winner");
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};
newGame.addEventListener("click",resetGame);
reset_btn.addEventListener("click",resetGame);
