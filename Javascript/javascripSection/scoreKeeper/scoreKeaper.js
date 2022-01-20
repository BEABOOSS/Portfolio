const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display")
};
const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display")
}

const winBy2 = document.querySelector("#winBy2") 
const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#playto");
let winningScore = parseInt(winningScoreSelect.value)
let selectorIndex = 0;
let isGameOver = false;



function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

function win2 (player, opponent) {
    if(player.score === opponent.score && player.score === winningScore -1){
        winningScore++;
        winningScoreSelect.selectedOptions[0].value = winningScore;
         winningScoreSelect.classList.add("overtime");
         winningScoreSelect.selectedOptions[0].innerText = `Tie BREAK TO ${winningScore}`;
    }
}


p1.button.addEventListener("click", function (){
    updateScores(p1,p2)
    win2(p1,p2);
})
p2.button.addEventListener("click", function (){
    updateScores(p2,p1)
    win2(p2,p1);
})

winningScoreSelect.addEventListener("change", function() {
    winningScore = parseInt(this.value);
    reset(this.selectedIndex);
})

resetButton.addEventListener("click", function() {
    reset(winningScoreSelect.selectedIndex);
});

function reset (index) {
    // isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
    for(let i=0; i<=6; i++){
        winningScoreSelect[i].value = 5 + i;
        winningScoreSelect[i].innerText = 5 + i;
    }
    winningScoreSelect.selectedIndex = index;
    winningScoreSelect.classList.remove("overtime");
    winningScoreSelect.blur();

    winningScore = parseInt(winningScoreSelect.value);

}


