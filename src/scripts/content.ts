import { text } from "stream/consumers";

console.log("Mounted content ts.");

function isValidWord(token: string){
    if(token.length > 0){
        if(!token.includes("<") 
        && !token.includes(">")
        && !token.includes("&")
        && !token.includes(";")
        ){
            return true;
        }
    }
    return false
}

function getBionicVersion(token: string){
    let openSpan = "<span style=\"font-weight: bold;\">"
    let closeSpan = "</span>"

    if(token.length == 1){
        return openSpan + token + closeSpan;
    }
    else if(token.length > 1){
        //EVEN
        if(token.length % 2 == 0){
            let half = token.length / 2;
            return openSpan + token.slice(0, half) + closeSpan + token.slice(half, token.length);
        }
        //ODD
        else{
            let half = Math.random() < 0.5 ? Math.floor(token.length / 2) : Math.ceil(token.length / 2);
            return openSpan + token.slice(0, half) + closeSpan + token.slice(half, token.length);
        }
    }
    return token;
}

function toggleBionicReading(){

    let elements = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, caption, span')


    for (let i = 0; i < elements.length; i++){
        
        let editedHTML = "";

        let currentElement = elements[i];

        let tokens = currentElement.innerHTML.split(/\s+/);

        let indentlevel = 0;

        for(let j = 0; j < tokens.length; j++){
            let token = tokens[j];
            if(isValidWord(token) && indentlevel == 0){
                
                editedHTML += getBionicVersion(token);
            }
            else{
                if(token.includes("<")){
                        let occurrences = (token.match(/\<[^\/]/g)||[]).length;
                        indentlevel = indentlevel + occurrences;
                        console.log("+ indent at: " + token);
                }
                if(token.includes("</")){
                    console.log("- indent at: " + token);
                    let occurrences = (token.match(/\<\//g)||[]).length;
                    indentlevel = indentlevel - occurrences;
                    if(indentlevel < 0) indentlevel = 0;
                }
                if(token.includes("/>")){
                    console.log("- indent at: " + token);
                    let occurrences = (token.match(/\/\>/g)||[]).length;
                    indentlevel = indentlevel - occurrences;
                    if(indentlevel < 0) indentlevel = 0;
                }
                
                editedHTML += token;
            }
            editedHTML += " ";
        }

        elements[i].innerHTML = editedHTML;
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        toggleBionicReading();
    }
);    