$(function() {
    let turn = "X";
    
    let moves = 0;
    var resetGame = function() {
        // reset the board itself
        $( "div.box" ).text(" ");
        $( "div.box" ).removeClass("X");
        $( "div.box" ).removeClass("O");
    
        // reset the variables that track game progress
        turn = "X";   
        moves = 0;
      }

    function getGrid() {
        let arr = []
        $('div.game-board').children('').each(function () {
            arr.push(this.html); // "this" is the current element in the loop
        });
        
    };
   
    function changeTurn() {
        if (turn === "X") {
          turn = "O";
          $('#uxturn').html(turn);
        } else {
          turn = "X";
          $('#uxturn').html(turn);

        }
      };


      function checkThree($firstBox, $secondBox, $thirdBox) {
        var firstBoxOwner = $firstBox,
             secondBoxOwner = $secondBox,
             thirdBoxOwner = $thirdBox;
     
         if ((firstBoxOwner === secondBoxOwner) && (secondBoxOwner === thirdBoxOwner)){
           if (firstBoxOwner === "X"){
             return "X";
           } else if (firstBoxOwner === "O"){
             return "O";
           }
         }
         
         return null;
       };

       function diagonalWinner() {
        // the eq method is how we "index into" a jQuery collection!
        var leftDownDiag = checkThree($("div.box").eq(0).html(), $("div.box").eq(4).html(), $("div.box").eq(8).html());
        var rightUpDiag = checkThree($("div.box").eq(2).html(), $("div.box").eq(4).html(), $("div.box").eq(6).html());
        return leftDownDiag || rightUpDiag;
      };

      function columnWinner() {
        var leftCol = checkThree($("div.box").eq(0).html(), $("div.box").eq(3).html(), $("div.box").eq(6).html());
        var middleCol = checkThree($("div.box").eq(1).html(), $("div.box").eq(4).html(), $("div.box").eq(7).html());
        var rightCol = checkThree($("div.box").eq(2).html(), $("div.box").eq(5).html(), $("div.box").eq(8).html());
    
        // using the || trick again
        return leftCol || (middleCol || rightCol);
      };

      function rowWinner() {
        var topRow = checkThree($("div.box").eq(0).html(), $("div.box").eq(1).html(), $("div.box").eq(2).html());
        var middleRow = checkThree($("div.box").eq(3).html(), $("div.box").eq(4).html(), $("div.box").eq(5).html());
        var bottomRow = checkThree($("div.box").eq(6).html(), $("div.box").eq(7).html(), $("div.box").eq(8).html());
    
        return topRow || (middleRow || bottomRow);
      };

      function getWinner() {
        return diagonalWinner() || (rowWinner() || columnWinner());
      };
    
      $( ".box" ).on("click", function() {
        $( this ).html( turn );
        $( this ).addClass(turn);

        moves += 1;
      
        // check for a winner 
        var winner = getWinner();
        if (winner) {
          // there is a winner! 
          // alert the win and reset the game
          alert("Player " + winner + " won!");
          resetGame();
        } else if (moves < 9) {
          // there is no winner, yet, 
          // but since fewer than 9 moves have been made, 
          // there are empty spaces left.  on to the next turn!
          changeTurn();
        } else {
          // there is no winner, and there are no empty spaces
          // alert the result and reset the game
          alert("Neither player won!");
          resetGame();
        }
      });
})





