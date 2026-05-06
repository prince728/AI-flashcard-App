const app =  require('./src/app');
const connectDB =  require('./src/Database/ConnectDB')
const port =process.env.PORT ||5000

connectDB();

app.listen(port, ()=>{
    console.log(`app is listening on port : http://localhost:${port}` )
})

