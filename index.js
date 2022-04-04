const net = require('net');

const close_distance= 10; //[cm]
const medium_distance= 25; //[cm]
const far_distance= 40; //[cm]

var actual_distance= 0;

function responseForDistance(distance){
  if(distance < close_distance){
    return "RED_LED";
  } else if (distance < medium_distance){
    return "YELLOW_LED";
  } else {
    return "GREEN_LED";
  }
}


const server = net.createServer();


server.on("connection", (socket)=>{
    socket.setEncoding('utf8');
    socket.on("data", (data)=>{
        console.log("\nEl cliente " + socket.remoteAddress + ":" + socket.remotePort + "dice: " + data);
        if(data.toString() == "distance"){
          socket.write(responseForDistance(actual_distance));
          
        } else if(parseInt(data.toString()) >= 0){
          actual_distance = data;
          socket.write("received");
        }
        
    })

    socket.on('close', ()=>{
        console.log('Comunicación finalizada');
    })

    socket.on('error', (err)=>{
        console.log(err.message);
    })
})

server.listen(4000, '192.168.1.7' );