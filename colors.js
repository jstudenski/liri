function color(color, text) {
  var value = "";
  switch (color) {
    case 'red':
      value = 124;
      break;
    case 'blue':
      value = 26;  
      break;
    case 'orange':
      value = 208;  
      break; 
    case 'green':
      value = 76;  
      break; 
    case 'yellow':
      value = 220;
      break;
    case 'pink':
      value = 219;
      break;
    default:
    console.log("Color is undefined!");
  }
  console.log("\x1b[38;5;"+value+"m"+text+"\x1b[0m")
}

module.exports = color;