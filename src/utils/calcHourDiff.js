/* eslint-disable */

function removeColon(s)
{
    if (s.length == 4)
        s= s.replace(":", "");
     
    if (s.length == 5)
        s= s.replace(":", "");
     
    return parseInt(s);
}
 
// Main function which finds difference
export function diff( s1,  s2)
{
 
    // change string (eg. 2:21 --> 221, 00:23 --> 23)
     let time1 = removeColon(s1);
    
     let time2 = removeColon(s2);
     
 
    // difference between hours
     let hourDiff = parseInt(time2 / 100 - time1 / 100 - 1);
 
    // difference between minutes
     let minDiff = parseInt(time2 % 100 + (60 - time1 % 100));
 
    if (minDiff >= 60) {
        hourDiff++;
        minDiff = minDiff - 60;
    }
  
    const res = hourDiff + Math.floor(minDiff/60);

    return res;
}