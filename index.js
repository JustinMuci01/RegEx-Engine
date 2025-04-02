function matchOne(pattern, text) {
    if (!pattern) 
        {
            return true; //pattern is empty, true
        }
    else if (!text)
        {
            return false;
        }
    if (pattern === ".") 
        {
            return true;//. matches with anything
        } 
    return pattern === text; 
  }

function match(pattern, text)
{
    if (pattern === '')
    {
        return true;
    } 
    if (pattern === "$" && text === "")
    {
        return true;
    }
    else if (pattern[1] === '?')
    {
        return matchQuestion(pattern, text);
    }
    else if (pattern[1] === '*')
    {
       return matchStar(pattern, text);
    }
    else
    {
        return (matchOne(pattern[0], text[0]) && match(pattern.slice(1), text.slice(1)));
    }
}

function matchQuestion(pattern, text)
{
    if (matchOne(pattern[0], text[0]) && match(pattern.slice(2), text.slice(1))) {
        return true;
      } else {
        return match(pattern.slice(2), text);
      }
}

function matchStar(pattern, text)
{
    if (matchOne(pattern[0], text[0]) && match(pattern, text.slice(1))) {
        return true;
      } else {
        return match(pattern.slice(2), text);
      }
}

function unionSearch(pattern, text)
{
    var rules = [];
    if (pattern.includes("+"))
    {
        rules = pattern.split("+");
        for (let s of rules)
        {
            if (s[0] === "^")
            {
                if (match(s.slice(1), text))
                    {
                        return true;
                    }
            }
            else
            {
                if (match(".*"+s, text))
                {
                    return true;
                }
            }

        }
    }
    else
    {
        if (pattern[0] === "^")
        {
               return match(pattern.slice(1), text);
        }
        else
        {
            return match(".*"+pattern, text);
        }
    }
}

function getAlphabet(alphabet, regEx)
{
    for (const char of regEx)
    {
        if(char != "." && char!= "?" && char!= "*" && char!= "+" && char!= "$" && char != "^")
        {
            alphabet.add(char);
        }
    }
}

function setToString(alphabet)
{
    let myString = "";
    let i=0;
    alphabet.forEach(element => {
        if (i>0)
        {
        myString += ", "
        }
        myString += element;
        i++;
    });
    return myString
}

function setMatch(alphabet, chars)
{
    let i=0;
    alphabet.forEach(element => {
        console.log(element);
        if (!chars.has(element))
        {
            return false;
        }
        i++
    }); 

    return (chars.size === i);
}

document.querySelector('.js-test-button').addEventListener('click', ()=>{
    let pattern = document.getElementById("reg-ex").value;
    let text = document.getElementById("test-string").value;
    let alphabet = new Set();
    getAlphabet(alphabet, pattern);

    let textAlph = new Set();
    getAlphabet(textAlph, text);

    let arrayString = setToString(alphabet);
    let textString = setToString(textAlph);

    if (!setMatch(alphabet, textAlph))
    {
        document.querySelector('.js-result').innerHTML = `<p class= "js-info-incorrect-long"><img src="img/newRedX.png" alt="">&nbsp;&nbsp;INVALID STRING<br>
        Expression alphabet and text alphabet do not match! <br> Expression alphabet: <br> &#931; = {${arrayString}}
        <br> Text alphabet: <br> &#931; = {${textString}}</p>`;
    }
    else if (unionSearch(pattern, text))
    {
        document.querySelector('.js-result').innerHTML =`<p class= "js-info-correct"><img src="img/newCheck.png" alt="">&nbsp;&nbsp;VALID STRING<br>
        Expression alphabet <br> &#931; = {${arrayString}}</p>`;
    }
    else
    {
        document.querySelector('.js-result').innerHTML = `<p class= "js-info-incorrect"><img src="img/newRedX.png" alt="">&nbsp;&nbsp;INVALID STRING<br>`;
    }
});