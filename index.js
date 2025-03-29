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
    rules = pattern.split("+");

    for (let s of rules)
    {
        if (match(s, text))
        {
            return true;
        }
    }
    return false;
}

document.querySelector('.js-test-button').addEventListener('click', ()=>{
    const pattern = document.getElementbyId("reg-ex");
    const text = document.getElementById("test-string");
    if (unionSearch(pattern, text))
    {
        document.querySelector(".js-result").innerHTML = 'VALID';
    }
    else
    {
        document.querySelector('.js-result').innerHTML = 'INVALID';
    }
});