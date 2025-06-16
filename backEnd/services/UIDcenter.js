const UID_Map = new Map();

function setUID(UID,user)
{
    UID_Map.set(UID,user);
}

function getUID(UID)
{
    return UID_Map.get(UID);
}

module.exports = {
    setUID,
    getUID,
    UID_Map
}