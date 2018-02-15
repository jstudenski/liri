
function logo() {

  // get random color
  var color1 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  var color2 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  var color3 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  var color4 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  // create logo
  return(
    color1+' ___ '+color2+'      ___ '+color3+' ________ '+color4+' ___  '+ '\n' +    
    color1+'|\\  \\  '+color2+'   |\\  \\'+color3+'|\\   __  \\'+color4+'|\\  \\ '+ '\n' +    
    color1+'\\ \\  \\ '+color2+'   \\ \\  \\'+color3+' \\  \\|\\  \\ '+color4+'\\  \\  '+ '\n' +  
    color1+' \\ \\  \\ '+color2+'   \\ \\  \\'+color3+' \\   _  _\\ '+color4+'\\  \\  '+ '\n' + 
    color1+'  \\ \\  \\____'+color2+'\\ \\  \\ '+color3+'\\  \\\\  \\'+color4+'\\ \\  \\ '+ '\n' + 
    color1+'   \\ \\_______\\'+color2+' \\__\\ '+color3+'\\__\\\\ _\\'+color4+'\\ \\__\\ '+ '\n' + 
    color1+'    \\|_______|'+color2+'\\|__|'+color3+'\\|__|\\|__|'+color4+'\\|__|'+'\x1b[0m');
};

module.exports = logo;


// module.exports = {

// }