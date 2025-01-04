// resetDTC.js
// Will clear out DTC (Trouble Codes)

function setup ()
{
    host.log("Clear Trouble Codes...");
    // set filter for all PKC IDs (7AA and 7A2)
    can.setFilter(0x7A0, 0x7F0, 0);
    can.sendFrame(0, 0x7DF, 8, [0x04, 0x14, 0xFF, 0xFF, 0xFF, 0xCC, 0xCC, 0xCC]);
}

function gotCANFrame (bus, id, len, data)
{
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