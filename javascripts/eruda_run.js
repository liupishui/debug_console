(function(){
    var html = '<div>html</div><script>'+
+'<\/script>';
var cont = document.createElement('div');
document.head.appendChild(cont);
cont.innerHTML = html;
var oldScript = cont.getElementsByTagName('script')[0];
cont.removeChild(oldScript);
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = oldScript.innerHTML;
cont.appendChild(newScript);
})();