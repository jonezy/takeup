
/*
 * -----------------
 * MINI Paceman
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 *
 * COSY IMAGE SERVICE
 *
 */
(function() {
var CosyService = window.CosyService = {};
var width, height;
CosyService.setDimensions = function(dimensions) {
if(dimensions && dimensions.width) width = dimensions.width;
if(dimensions && dimensions.height) height = dimensions.height;
}
var img = $('#image');
CosyService.setImage = function(el) {
img = $(el);
}
var cosy_token;
CosyService.setToken = function(token) {
cosy_token = token;
}
var cosy_url = 'https://cosy.bmwgroup.com/ncc/cosySec?';
var cosy_client = 'NCC';
var updateImage = CosyService.updateImage = function(args) {
var encodedRequest = generateRequest(args);
img.attr('src', cosy_url + encodedRequest);
};
var getImageSource = CosyService.getImageSource = function(args) {
return cosy_url + generateRequest(args);
};
var generateRequest = function(args) {
var brand = 'WBMI',
model = args && args.model ? args.model : 'ZB33',
pov = args && args.pov ? args.pov : 'REAR',
imgwidth = width ? width : '510',
imgheight = height ? height : '303',
angle = args && args.angle ? args.angle : 180,
standardUrl = 'BRAND='+brand+'&model='+model+'&pov='+pov+'&WIDTH='+imgwidth+'&HEIGHT='+imgheight+'&RESP=PNG&BKGND=TRANSPARENT',
optionsUrl = args && args.options ? '&SA='+args.options : '',
walkaroundUrl = '&ANGLE='+angle,
bodycolourUrl = args && args.bodycolour ? '&PAINT=P0'+ args.bodycolour : '',
finalUrl = standardUrl;
if(bodycolourUrl !== '') finalUrl = finalUrl + bodycolourUrl;
if(pov === 'WALKAROUND') finalUrl = finalUrl + walkaroundUrl;
if(optionsUrl !== '') finalUrl = finalUrl + optionsUrl;
/*console.log(DecodeCosyUrl(EncodeCosyUrl(finalUrl)));*/
return EncodeCosyUrl(finalUrl);
};
var DecodeCosyUrl = function(sURL) {
var sCodeCharacters = cosy_token;
var CodeLength = 63
var i;
var index;
var iPos;
var iStepping;
if (decodeURI(sURL).substr(0, 7) == "COSY-EU") {
var sTemp = decodeURI(sURL);
var sResult = ""
iPos = parseInt(sTemp.substring(12, 14));
iStepping = parseInt(sTemp.substring(14, 16));
for (i = 16; i < sTemp.length; i++) {
index = sCodeCharacters.indexOf(sTemp.charAt(i)) - (iPos);
if (index < 0) {
index -= ( Math.ceil(index / CodeLength) - 1) * CodeLength;
}
sResult += (sCodeCharacters.charAt(index % CodeLength));
iPos += iStepping;
}
return URLDecode(sResult);
} else {
return sURL;
}
};
var EncodeCosyUrl = function(sURL, random) {
var sCodeCharacters = cosy_token;
var CodeLength = 63;
var i;
var iPos;
var iStepping;
var sTemp = '';
var sResult = '';
var sEncoded;
if (!random) {
iPos = 25;
iStepping = 45;
} else {
iPos = (17 + CodeLength * Math.random());
iStepping = (11 + CodeLength * Math.random());
}
sResult += "COSY-EU-100-" + iPos + iStepping;
sEncoded = URLEncode(sURL);
for (i = 0; i < sEncoded.length; i++) {
switch (sEncoded.charAt(i)) {
case '+':
sTemp += ("%20");
break;
case '-':
sTemp += ("%2D");
break;
case '_':
sTemp += ("%5F");
break;
case '.':
sTemp += ("%2E");
break;
case '*':
sTemp += ("%2A");
break;
default:
sTemp += (sEncoded.charAt(i));
break;
}
}
for (i = 0; i < sTemp.length; i++) {
sResult += (sCodeCharacters.charAt((iPos + sCodeCharacters.indexOf(sTemp.charAt(i))) % CodeLength));
iPos += iStepping;
}
return encodeURI(sResult);
};
var URLDecode = function(encodedString) {
var output = encodedString;
var binVal, thisString;
var myregexp = /(%[^%]{2})/;
while ((match = myregexp.exec(output)) != null && match.length > 1 && match[1] != '') {
binVal = parseInt(match[1].substr(1), 16);
thisString = String.fromCharCode(binVal);
output = output.replace(match[1], thisString);
}
return output;
};
var URLEncode = function(clearString) {
var output = '';
var x = 0;
clearString = clearString.toString();
var regex = /(^[a-zA-Z0-9_.]*)/;
while (x < clearString.length) {
var match = regex.exec(clearString.substr(x));
if (match != null && match.length > 1 && match[1] != '') {
output += match[1];
x += match[1].length;
} else {
if (clearString[x] == ' ')
output += '+';
else {
var charCode = clearString.charCodeAt(x);
var hexVal = charCode.toString(16);
output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
}
x++;
}
}
return output;
};
}).call(this) 