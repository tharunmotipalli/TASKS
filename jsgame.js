const readline = require('readline').createInterface({ //npm install readline then use readline module in your program
    input: process.stdin,
    output: process.stdout,
  });
  console.log('--------------------------------------------------------------------------');
  console.log('PLAY GAME WITH THE SYSTEM "STONE","PAPER","SCISSORS"');
  console.log('--------------------------------------------------------------------------');
  const items=['stone','paper','scissor']; //system inputs
 
  var item = items[Math.floor(Math.random()*items.length)];// system chooses randomly
  readline.question(`type your input:`, input=> { //input from the user
    console.log(`your input ${input}!`);//conditions of win and lose 
    if(input!='stone'||'paper'||'scissor'){console.log('Error Type stone paper or scissor')}
     else if(input=='stone' && item=='stone'|| input=='paper' && item=='paper' || input=='scissor' && item=='scissor'){
          console.log('system:'+item);
          console.log('YOU DRAW WITH PLAYER');
  
      }else if(input=='stone' && item=='scissor'||input=='paper' && item=='stone'||input=='scissor' && item=='paper'){
          console.log('system:'+item);
                           //printing if you win the game
          console.log('You WIN THE GAME');
      }else if(input=='scissor' && item=='stone'||input=='stone' && item=='paper'||input=='paper' && item=='scissor'){
          console.log('system:'+item);
          
          console.log('YOU LOSE THE GAME');           ///printing if you lose the game
      }
      console.log('------------------------------------------------------------------------');
      readline.close();    
    });




  
