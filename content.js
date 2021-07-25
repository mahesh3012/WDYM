let selection= window.getSelection();

document.addEventListener("mouseup",()=>{
if (!selection.isCollapsed){
    let selectedText=selection.toString()
    
console.log(selectedText);
var meaning = document.createElement("span");
    meaning.setAttribute("class", "meaning");
    meaning.setAttribute("id", "meaning");
    meaning.setAttribute("title", "Lookup Word");
    meaning.setAttribute("style","width:300px;background:yellow;color:black;z-index:1;position:absolute;display:block;font-family:'Times New Roman', serif;");
    getData(selectedText);
    async function getData(word) {
        // Ajax call
        if(word){ 
        const apiKey='046c787b-3a59-4b27-bb30-6063a51b32ae';
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
        const data = await response.json();
        //no_results
        if (!data.length) {
            //console.log('no result found');
            meaning.innerHTML=`<div style="box-shadow: 5px 10px 8px #888888;"><h3>No result found</h3></div>`;
        }
        
        //if result is suggestions
        else if(typeof data[0]==='string'){
            //console.log("did u mean?");
            let text="";
            data.forEach(element => {
                console.log(element);
                text=text+element+", ";
            })
            meaning.innerHTML=`<div style="box-shadow: 5px 10px 8px #888888;"><p style="margin:0"><h3>Did you mean?</h3><p style="margin:0">${text}</p></div>`;
        }
        else{
            definition=data[0].shortdef[0];
            if(definition!=undefined){
            meaning.innerHTML=`<div style="box-shadow: 5px 10px 8px #888888;"><p style="margin:0"><strong>Definition:</strong> ${definition}</p></div>`;
            }
        }
    }
    else{
        meaning.innerText= `Please select a word first`;
    }
    };


    var r=window.getSelection().getRangeAt(0).getBoundingClientRect();
    var relative=document.body.parentNode.getBoundingClientRect();
    meaning.style.top =(r.bottom -relative.top)+'px';//this will place ele below the selection
    if(r.left+300< relative.right){
    meaning.style.left=(r.left)+'px';//this will align the right edges together
    }
    else {
    meaning.style.right=-(r.right-relative.right)+'px';
    }
    //console.log(relative.right);
    //console.log(relative.left);
    //console.log(r.right);
    //console.log(r.left);
    document.body.appendChild(meaning);
}
})

document.addEventListener("mousedown",()=>{
    if(document.getElementById("meaning"))
    document.getElementById("meaning").remove();
})



