// here request UID from browser & local map
// if found return success else failed

const { getUID } = require("../services/UIDcenter");

async function isLogin(req,res,next)
{
    const UIDCookie = req.cookies?.UID;
   // console.log("Cookie : "+UIDCookie);
    const UIDuserMap = getUID(UIDCookie);
   // console.log("Map UID : "+UIDuserMap)
    if(!UIDuserMap){
        console.log("Access Denied by isLogin middleware")
        res.status(401).json({ error: "Access Denied Login To Proceed _ _ _" }); 
    }else{
        next();
    }
}

module.exports = {
    isLogin
}
