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
        host.log("Got FOB result: " + hex_to_ascii(data[4].toString(16)));
    }
}

function hex_to_ascii(str1) {
    // Convert the input hexadecimal string to a regular string
    var hex = str1.toString();
    // Initialize an empty string to store the resulting ASCII characters
    var str = '';
    // Iterate through the hexadecimal string, processing two characters at a time
    for (var n = 0; n < hex.length; n += 2) {
        // Extract two characters from the hexadecimal string and convert them to their ASCII equivalent
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    // Return the resulting ASCII string
    return str;
}