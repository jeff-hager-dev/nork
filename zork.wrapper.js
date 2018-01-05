const { spawn } = require('child_process');
const repl = require('repl');
const readline = require('readline');

module.exports = function( options){
  let zorkWrapper = this;
  zorkWrapper.recentGameOutput = '';

  zorkWrapper.start = (events) => {
    var zorkGame = spawn('./zork',[], {cwd:'./lib/zork/'});

    console.log("Zork PID: ", zorkGame.pid);

    zorkGame.stdout.on('data', (data) => {
      zorkWrapper.recentGameOutput = `#############################${data}##############################`;
      events.gameOutput(zorkWrapper.recentGameOutput);
    });

    zorkGame.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    zorkGame.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    zorkWrapper.GameInstance = zorkGame;
  }

  zorkWrapper.stop = () => {};

  zorkWrapper.reset = () => {};

  zorkWrapper.writeToProcess=(data)=>{
    events.gameOutput('Writing data');
    /*if(zorkWrapper.GameInstance){return;}
    zorkWrapper.GameInstance.stdin.write(`${data}\n`);
    child.stdin.end();
    */
  };
}
