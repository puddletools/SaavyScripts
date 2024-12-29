// getFOB.js
// Will query PKC unit to get the number of FOBs synced with target vehicle

function setup ()
{
    host.log("Get FOB Count");
    // set filter for all PKC IDs (7AA and 7A2)
    can.setFilter(0x7A0, 0x7F0, 0);
    can.sendFrame(0, 0x7A2, 8, [0x03, 0x22, 0xF4, 0x03, 0x55, 0x55, 0x55, 0x55]);
}

function gotCANFrame (bus, id, len, data)
{
    if (len == 8 && id == 0x7AA && data[0] == 0x04 && data[1] == 0x62 && data[2] == 0xF4 && data[3] == 0x03)
    {
        host.log("Got FOB result: " + data[4].toString(16));
    }
}