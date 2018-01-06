const { spawn } = require('child_process');
const repl = require('repl');
const readline = require('readline');

module.exports = function( options){

  let zorkWrapper = this;
  var recentGameOutput = '';
  var gameInstance = {};
  var userEvents = {};
  
  zorkWrapper.start = (events) => {
    userEvents = events;
    gameInstance = spawn('./zork',[], {cwd:'./lib/zork/'});
    userEvents.onStart(gameInstance.pid);
    gameInstance.stdout.on('data', (data) => {
      userEvents.gameOutput(`${data}`);
    });

    gameInstance.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    gameInstance.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  zorkWrapper.stop = () => {
    gameInstance.kill();
  };

  zorkWrapper.reset = () => {
    zorkWrapper.stop();
    zorkWrapper.start(userEvents);
  };

  zorkWrapper.GetLastOutput = () =>{
    return gameOutput
  };
  
  zorkWrapper.GetInstancePid = () => {
    return gameInstance.pid;
  };

  zorkWrapper.writeToProcess=(data)=>{
    if(!gameInstance){return;}
    gameInstance.stdin.write(`${data}\n`);
  };
}
