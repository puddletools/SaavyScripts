// getBootloader.js
// Will query PKC unit to get the current bootloader version

function setup ()
{
    host.log("Current Bootloader");
    // set filter for all PKC IDs (7AA and 7A2)
    can.setFilter(0x7A0, 0x7F0, 0);
    can.sendFrame(0, 0x7A2, 8, [0x03, 0x22, 0xF1, 0x83, 0x55, 0x55, 0x55, 0x55]);
}

function gotCANFrame (bus, id, len, data)
{
    if (len == 8 && id == 0x7AA && data[0] == 0x10 && data[1] == 0x10 && data[2] == 0x62 && data[3] == 0xF1 && data[4] == 0x83)
    {
        host.log("Part 1 Bootloader Version: " + hex_to_ascii(data[5].toString(16)) + hex_to_ascii(data[6].toString(16)) + hex_to_ascii(data[7].toString(16)));
        // send follow-up message to get rest of result
        can.sendFrame(0, 0x7A2, 8, [0x30, 0x0A, 0x0A, 0x55, 0x55, 0x55, 0x55, 0x55]);
    }
    elseif (len == 8 && id == 0x7AA && data[0] == 0x21) 
    {
        host.log("Part 2+ Bootloader Version: " + hex_to_ascii(data[1].toString(16)) + hex_to_ascii(data[2].toString(16)) + hex_to_ascii(data[3].toString(16)) + hex_to_ascii(data[4].toString(16)) + hex_to_ascii(data[5].toString(16)) + hex_to_ascii(data[6].toString(16)) + hex_to_ascii(data[7].toString(16)));
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