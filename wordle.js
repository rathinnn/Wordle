var rows = [];
var CurWord = [];
var WinningWord = ['o', 'u', 't', 'e', 'r'];
var done = document.getElementById("Done");
gameover = false;
for (var i = 0; i < 6; i++){
    var curRow = []
    for (var j = 0; j < 5; j++){
        var curid = 'r'+parseInt(i + 1)+'c'+parseInt(j + 1);
        console.log(curid);
        curRow[j] = document.getElementById(curid);
    }
    rows[i] = curRow;
}

var curCol = 0;
var curRow = 0;

function addToCell (key) {
    let cell = rows[curRow][curCol];
    cell.innerHTML = key.toUpperCase();
    CurWord.push(key)
    curCol += 1;
}

function check (key) {
    var curMap = {};
    var correct = 0;
    if(CurWord.length < 5){
        done.innerHTML = 'Please Enter 5 Letter Word';
        return;
    }
    var row = rows[curRow];
    for (var i = 0; i < 5; i++){
        if(curMap[WinningWord[i]]){
            curMap[WinningWord[i]] += 1;
        }
        else{
            curMap[WinningWord[i]] = 1;
        }

    }

    for (var i = 0; i < 5; i++){
        if(CurWord[i] == WinningWord[i]){
            row[i].style.backgroundColor = '#538d4e'
            correct += 1;
            curMap[CurWord[i]] -= 1;
        }

    }

    for (var i = 0; i < 5; i++){
        if(curMap[CurWord[i]]){
            var j = 0;
            if(CurWord[i] != WinningWord[i]){
                if(curMap[CurWord[i]] > 0){
                    row[i].style.backgroundColor = '#b59f3b';
                    curMap[CurWord[i]] -= 1;
                }
            }
        }

        else if(CurWord[i] != WinningWord[i]){
            row[i].style.backgroundColor = "#707070";
        }

    }

    curRow += 1;
    curCol = 0;


    CurWord = [];

    if(correct == 5){
        done.innerHTML = 'Correct </br> Number of attempts:' + parseInt(curRow) + '/6';
        gameover = true;
    }

    else if(curRow > 5){
        done.innerHTML = 'Correct word was ' + WinningWord.join("");
        gameover = true;
    }

    else{
        done.innerHTML = '';
    }
}

function removeFromCell (){
    let cell = rows[curRow][curCol - 1];
    cell.innerHTML = "";
    CurWord.pop();
    curCol -= 1;
    return;
}

document.addEventListener("keyup", (e) => {
    if(!gameover){
    let key = String(e.key).toLowerCase();
    if (curRow === 6) {
        return
    }
    if (key === "backspace") {
        if(curCol > 0){
            removeFromCell();
            return;
        }
        
        return;
    }

    if (key === "enter") {
        check()
        return
    }
    else if(key.length == 1){
        let alphabetCheck = key.match(/[a-z]/)

        if (alphabetCheck && alphabetCheck.length===1 && curCol < 5) {
            console.log(alphabetCheck);
            addToCell(key)
        }
    }
    }
})