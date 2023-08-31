function setcontextMenus(){
    chrome.contextMenus.removeAll();
    var user = localStorage.getItem("rt_items");
    items = JSON.parse(user);
    if(items instanceof Array){   
        var setMenu = new setcontextMenu();    
        for (var i = 0; i < items.length; i++) {
            if(items[i].title != '' && items[i].url != '' && items[i].filter != ''){
                var target = items[i];
                setMenu.contextMenu(target);
            }
        }
    }
}
function setcontextMenu(){
    this.contextMenu = function(target){
        var patharr = target.filter.split('|');
        chrome.contextMenus.create({
            title: target.title,
            contexts: ["all"] ,
            documentUrlPatterns : patharr,
            targetUrlPatterns:["http://*/*"],
            onclick: function(a,b){
                gourl = target.url;
                gourl = gourl.replace(/{url}/ig,encodeURIComponent(b.url));
                gourl = gourl.replace(/{title}/ig,encodeURIComponent(b.title));
                gourl = gourl.replace(/{random}/ig,getrandom());
                if(a.mediaType)gourl = gourl.replace(/{mediatype}/ig,a.mediaType);
                if(a.linkUrl)gourl = gourl.replace(/{linkurl}/ig,a.linkUrl);
                if(a.srcUrl)gourl = gourl.replace(/{srcurl}/ig,a.srcUrl);
                if(a.pageUrl)gourl = gourl.replace(/{pageurl}/ig,a.pageUrl);
                if(a.frameUrl)gourl = gourl.replace(/{frameurl}/ig,a.frameUrl);
                if(a.selectionText)gourl = gourl.replace(/{selectiontext}/ig,a.selectionText);
                if(a.editable)gourl = gourl.replace(/{editable}/ig,a.editable);
                chrome.tabs.create({
                    url: gourl
                }, function (c) {});
            }
        });
    }
}
function getrandom(){
    random = Math.floor(Math.random() * 10000);
    return random;
}

chrome.browserAction.onClicked.addListener(function(b) {
    chrome.runtime.openOptionsPage();
})

setcontextMenus();