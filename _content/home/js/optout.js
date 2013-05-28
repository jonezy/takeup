WebTrends.prototype.fmCheckOpt=function(){
  if (this.fmGetQP('WTLOPTOUT') == '1') {
    this.fmOptOut();
    return;
  }
  if (this.fmGetQP('WTLOPTIN') == '1') {
    this.fmOptIn();
    return;
  }	
}

WebTrends.prototype.fmOptOut=function(){
  this.fmSetCookie('WTLOPTOUT', '1', '/', this.FPCConfig.domain, this.FPCConfig.expires);
  //this.dcsDeleteCookie(this.FPCConfig.name, '/', this.FPCConfig.domain);	
}

WebTrends.prototype.fmOptIn=function(){
  this.dcsDeleteCookie('WTLOPTOUT', '/', this.FPCConfig.domain);	
}

WebTrends.prototype.fmGetQP=function(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
} 

WebTrends.prototype.fmSetCookie=function(name, value, path, domain, expiry) {	
  document.cookie=name+"="+value+"; expires="+new Date(new Date().getTime()+expiry)+"; path="+path+((domain!="")?("; domain="+domain):(""));
}

