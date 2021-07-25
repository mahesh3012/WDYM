let form=document.getElementById('form');
let meaning=document.getElementById('meaning');
let word= document.getElementById('word');
let speak=document.getElementById('speak');
form.addEventListener("submit",(e)=>{e.preventDefault();
    getData(word.value)});
async function getData(word) {
    // Ajax call
    if(word){ 
    const apiKey='046c787b-3a59-4b27-bb30-6063a51b32ae';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    //no_results
    if (!data.length) {
        //console.log('no result found');
        meaning.innerText="No result Found";
        return;
    }
    
    //if result is suggestions
    else if(typeof data[0]==='string'){
        //console.log("did u mean?");
        meaning.innerHTML="<h1>Did you Mean?</h1>"
        data.forEach(element => {
            console.log(element);
            meaning.innerHTML+=`<span>${element}  </span>`;
        });
    }
    else{
        definition=data[0].shortdef[0];
        //console.log(definition);
        meaning.innerHTML=`<p>Definition: ${definition}</p>`;
    }
}
else{
    meaning.innerHTML=`<p>Please enter a word first</p>`;
}
}

speak.addEventListener("click",()=>{
    if(word.value) chrome.tts.speak(word.value, {'rate':0.7});
    else chrome.tts.speak('Please enter a word.');
});




