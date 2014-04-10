
document.addEventListener('DOMContentLoaded', function(){
    showWords();
    document.querySelector('button').addEventListener('click', translateWord);
});

function translateWord(){
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    
    window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
}

function onInitFs(fs) {
    fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
        fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
                console.log('Write completed.');
            };
            fileWriter.onerror = function(e) {
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
