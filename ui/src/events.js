import { createPublicClient,parseAbiItem,webSocket } from "viem";
import { hardhat, hoodi } from "viem/chains";

const client=createPublicClient({
    chain:hoodi,
    transport:webSocket("wss://eth-hoodi.g.alchemy.com/v2/zK8MrePp0fyzAiUPD9yBY")
})

console.log("Listening for events");

client.watchEvent({
    address:"0x16b120d10a0585e4D01906dF45053b07E2B97E81", //contract address
    event:parseAbiItem('event Issued(string indexed, uint256, string)' ),

    onLogs:(logs)=>{
        console.log(" ");
        // console.log('Course:',logs[0].args.course);
        // console.log("Id:",logs[0].args.id);
        // console.log("Grade:",logs[0].args.grade);
        
        console.log('Course:',logs[0].args[0]);
        console.log("Id:",logs[0].args[1]);
        console.log("Grade:",logs[0].args[2]);
        console.log("Raw Log:",logs);   
        
    }
})