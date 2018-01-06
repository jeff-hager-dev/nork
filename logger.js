module.exports = function(options){

  var outputGenerator = function(prefix){
    return function(){
      if(!options.debug){ return; }
      if(console){
        var args = Array.prototype.slice.call(arguments);
        var currentTimeStamp = (new Date()).toLocaleTimeString();
        args.unshift(currentTimeStamp, prefix);
        console.log.apply(null, args);
      }
    }
  };

  this.info = outputGenerator("INFO >> ");
  this.error = outputGenerator("ERROR >> ");
  this.warn = outputGenerator("WARNING >> ")
};
