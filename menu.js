function selectionOnClick(info, tab){
    word = info.selectionText;
    if(word){
        word_index = wordIndex();
        window.localStorage.setItem(word_index, word);
        if(word_index >= 100){
            alert('too many words to remember')
        };
    };
}

function wordIndex(){
    word_index = window.localStorage.getItem('WordIndex');
    if(!word_index){
        word_index = 1;
    }else{
        word_index++;
    };
    window.localStorage.setItem('WordIndex', word_index);
    return word_index
}

function saveWordsOnClick(){
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.TEMPORARY, 1024*1024, saveInitFs, errorHandler);
}

function delFileOnClick() {
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
        fs.root.getFile('translate_q.txt', {create: false}, function(fileEntry) {
            fileEntry.remove(function(){alert('del suc')}, errorHandler);
        }, errorHandler);
    }, errorHandler);
}

function saveInitFs(fs) {
    fs.root.getFile('translate_q.txt', {create: true}, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                console.log('Write completed.');
            }; fileWriter.onerror = function(e) {
                console.log('Write failed: ' + e.toString());
            };
            fileWriter.seek(fileWriter.length);

            words = []
            var word_count = window.localStorage.getItem('WordIndex');
            if(word_count){
                for(i=1; i<=word_count; i++){
                    words.push(window.localStorage.getItem(i)+'\n');
                    window.localStorage.removeItem(i);
                    window.localStorage.removeItem('WordIndex')
                };
                var bb = new Blob(words);
                fileWriter.write(bb);
            }else{
                alert("no word to save");
            };
            alert(fileEntry.toURL());
        }, errorHandler);
    }, errorHandler);
}

function errorHandler(e) {
    var msg = '';
    
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };
        
    console.log('Error: ' + msg);
}

var selection = chrome.contextMenus.create({"title": "陌生词","contexts":["selection"], "onclick": selectionOnClick})
var selection = chrome.contextMenus.create({"title": "存文件","contexts":["selection"], "onclick": saveWordsOnClick})
var selection = chrome.contextMenus.create({"title": "删文件","contexts":["selection"], "onclick": delFileOnClick})
