//here its checked that upcoming user is admin or not
//providing some administrative privilage

const { getUID } = require("../services/UIDcenter");

async function isAdmin(req,res,next){

    const cookie = req.cookies?.UID;
    const user = getUID(cookie);

    if(!user){
        console.log("Privilaged Accese Only");
        res.json({result:"Privilaged Accese Only"})
    }else{
        if(user.email === "admin999@admin.com" && user.password === "999"){
            next();
        }else{
            console.log("Privilaged Accese Only");
            res.json({result:"Privilaged Accese Only"})
        }
    }
}

module.exports = {
    isAdmin
}