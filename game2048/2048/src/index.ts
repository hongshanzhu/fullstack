import {Server} from './server'

new Server().getServer().listen(3000,()=>{
    console.log("Server running at localhost:3000");
});
