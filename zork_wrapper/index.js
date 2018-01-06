const { spawn } = require('child_process');
const repl = require('repl');
const readline = require('readline');

module.exports = function(options){

  let zorkWrapper = this;
  let recentGameOutput = '';
  let gameInstance = {};
  let userEvents = {};
  
  zorkWrapper.start = (events) => {
    userEvents = events;
    gameInstance = spawn('./zork',[], {cwd:'./zork_wrapper/lib/zork/'});
    userEvents.onStart(gameInstance.pid);
    gameInstance.stdout.on('data', (data) => {
      userEvents.gameOutput(`${data}`);
    });

    gameInstance.stderr.on('data', (data) => {
      userEvents.gameError(`${data}`);
    });

    gameInstance.on('close', (code) => {
      userEvents.gameClose(`child process exited with code ${code}`);
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
