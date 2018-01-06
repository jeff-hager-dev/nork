module.exports = function(options){

  var outputGenerator = function(prefix){
    return function(){
      if(!options.debug){ return; }
      if(console){
        console.log(prefix, Array.prototype.slice.call(arguments) );
      }
    }
  };

  this.info = outputGenerator("INFO >> ");
  this.error = outputGenerator("ERROR >> ")
};
