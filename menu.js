function genericOnClick(info, tab){
    alert(info.linkUrl);
}

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

function showWords(){
    var word_table = document.createElement("table");
    var word_count = window.localStorage.getItem('WordIndex');
    if(word_count){
        var table_title = word_table.insertRow(0);
        var td_index = table_title.insertCell(0);
        var td_words = table_title.insertCell(1);
        td_index.setAttribute('width', '93px');
        td_index.innerHTML = '序号';
        td_words.innerHTML = '单词';
        for(i=1; i<=word_count; i++){
            var table_word = word_table.insertRow(i);
            var td_no = table_word.insertCell(0);
            var td_word = table_word.insertCell(1);
            td_no.innerHTML = i;
            td_word.innerHTML = window.localStorage.getItem(i);
        };
    };
    document.getElementById('words_list').appendChild(word_table);
}

var link = chrome.contextMenus.create({"title": "链接地址", "contexts": ["link"], "onclick": genericOnClick});

var selection = chrome.contextMenus.create({"title": "选中文字","contexts":["selection"], "onclick": selectionOnClick})

// read
//function onInitFs(fs){
//  fs.root.getFile('log.txt', {}, function(fileEntry) {
//  fileEntry.file(function(file) {
//      var reader = new FileReader();
//      
//      reader.onloadend = function(e) {
//          var txtArea = document.createElement('textarea');
//          txtArea.value = this.result;
//          document.body.appendChild(txtArea);
//      };
//      
//      reader.readAsText(file);
//      }, errorHandler);
//      
//      // fileEntry.isFile === true
//      // fileEntry.name == 'log.txt'
//      // fileEntry.fullPath == '/log.txt'
//      
//  }, errorHandler);
//}

