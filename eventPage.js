var contextMenuMeaningItem={
    "id":"getMeaning",
    "title":"what does this mean?",
    "contexts":["selection"]
}

var contextMenuSpeakingItem={
    "id":"getPronunciation",
    "title":"How do I pronounce?",
    "contexts":["selection"]
}

chrome.contextMenus.create(contextMenuMeaningItem);
chrome.contextMenus.create(contextMenuSpeakingItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId=="getMeaning" && clickData.selectionText){
        getData(clickData.selectionText);
    }
})

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId=="getPronunciation" && clickData.selectionText){
        chrome.tts.speak(clickData.selectionText, {'rate':0.7});
    }
})

async function getData(word) {
    // Ajax call
    if(word){ 
    const apiKey='046c787b-3a59-4b27-bb30-6063a51b32ae';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    //no_results
    if (!data.length) {
        //console.log('no result found');
        alert("No result Found");
        return;
    }
    
    //if result is suggestions
    else if(typeof data[0]==='string'){
        //console.log("did u mean?");
        let text="";
        data.forEach(element => {
            console.log(element);
            text=text+element+", ";
        })
        alert('did you mean? ' +`${text}`);
    }
    else{
        definition=data[0].shortdef[0];
        //console.log(definition);
        alert(`${word}: ${definition}`);
    }
}
else{
    alert(`Please select a word first</p>`);
}
}
