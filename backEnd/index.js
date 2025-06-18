const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connectMDB } = require("./connection");

const  userRouter  = require("./router/userRouter");
const surfingRouter = require("./router/surfingRouter");
const prdRouter = require("./router/prdRouter");
const adminRouter = require("./router/adminRouter");


const { isLogin } = require("./middelware/isLogin");
const { isAdmin } = require("./middelware/isAdmin");

//connection
connectMDB(process.env.mongoURL);

// Enabling frontend backend communications
//app.use(cors()); // allows all origins
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

app.options('*', cors({
    origin: allowedOrigin,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//Routs
app.use("/", userRouter);
app.use("/product", prdRouter);

//routers
app.use("/admin", isAdmin, adminRouter);
app.use("/surfing" , isLogin , surfingRouter);


//server
app.listen(PORT, ()=>{console.log("Node JS Server Started _ _ _ ")});
