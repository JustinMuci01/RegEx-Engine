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
    if (pattern === '$' && text === "")
    {
        return true;
    }
    else if (pattern[1] === '?')
    {
        matchQuestion(pattern, text);
    }
    else if (pattern[1] === '*')
    {
        matchStar(pattern, text);
    }
    else
    {
        return (matchOne(pattern[0], text[0]) && match(pattern.slice(1), text.slice(1)));
    }
}

function search(pattern, text)
{
    if (pattern[0] === "^") {
        return match(pattern.slice(1), text);
      } else {
        return match(".*" + pattern, text);
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
    rules = pattern.split("U");

    for (let s of rules)
    {
        console.log(s);
        if (match(s, text))
        {
            return true;
        }
    }
}

const pattern = 'aab';
const text = 'aaaaab';
if (search(pattern, text))
{
    console.log('MATCH');
}
else
{
    console.log('NO MATCH');
}