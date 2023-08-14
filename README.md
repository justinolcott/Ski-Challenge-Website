# Ski Challenge Website
- You can find the website [here](https://startup.ninthheaven.link/).
- The website is built for skiers to create and track challenges achieved while skiing and then displays a leaderboard of the top performers.
- It is built using React, Node, Express, MongoDB, and Bootstrap.




# CS 260
- I made this website for CS 260, so the following includes information for the class, which is mostly notes.

## Notes
### Github Notes - 23 Jan 2023
I learned how to use git and github together either through the terminal or vs code. I also learned how to merge conflicts and the basics of git. I personally prefer doing everything through vs code with GitLens.
The basics for using git and github are:
1. Pull the repository's latest changes from GitHub (`git pull`)
1. Make changes to the code
1. Commit the changes (`git commit`)
1. Push the changes to GitHub (`git push`)
- Git supports the ability to branch your code. This allows you to work on variations of the code while still allowing progress on the main branch. For example, if you wanted to work on a new feature named A without interrupting work on the master branch, you would use the git branch A command and start working on the A branch with the git checkout A command. Now commits can be down to both the master and the A branch. When you want to combine the work done on both branches you us checkout the master branch and execute git merge A. If you decide you want to abandon the new feature then you just don't ever merge it back into the master branch.

I still need to learn more about [markdown files](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).

### CodePen Notes - 26 Jan 2023
[My CodePen](https://codepen.io/justinolcott)

### Amazon EC2 Notes
- Use EC2 to create webservers
- T3 nano has a cost of $0.0052 / hour which is very inexpensive
- The IP Address will change unless you get an elastic IP address which costs money while the server is inactive, but is fairly cheap.

### Amazon Route 53 Notes
- You can buy domain names through Amazon. .link and .click are the cheapest, but .click has no privacy protection
- You can connect that to an IP through Route 53 - Hosted Zones
    - add two records (one blank, one with *) to direct all subdomains to the main page.

### Web Servers
- Web service gateways
  - To resolve this we introduce a service gateway, or sometimes called a reverse proxy, that is itself a simple web service that listens on the common HTTPS port 443. The gateway then looks at the request and maps it to the other services running on a different ports.
- Microservices
  - Web services that provide a single functional purpose are referred to as microservices. By partitioning functionality into small logical chucks, you can develop and manage them independently from other functionality in a larger system. 
- Serverless
  - The idea of microservices naturally evolved into the world of serverless functionality where the server is conceptually removed from the architecture and you just write a function that speaks HTTP.

### HTTPS, TLS, and certificates
- With Caddy, it was really easy to enable https
- All I did was essentially add my domain name to three places and it started working
- I'm not sure what the installation process looks like

### HTML
## Intro
HTML is all about structure and uses these common elements: element	meaning
        html	The page container

        head	Header information
        title	Title of the page
        meta	Metadata for the page such as character set or viewport settings
        script	JavaScript reference. Either a external reference, or inline
        include	External content reference
        body	The entire content body of the page
        header	Header of the main content
        footer	Footer of the main content
        nav	Navigational inputs
        main	Main content of the page
        section	A section of the main content
        aside	Aside content from the main content
        div	A block division of content
        span	An inline span of content
        h<1-9>	Text heading. From h1, the highest level, down to h9, the lowest level
        p	A paragraph of text
        b	Bring attention
        table	Table
        tr	Table row
        th	Table header
        td	Table data
        ol,ul	Ordered or unordered list
        li	List item
        a	Anchor the text to a hyperlink
        img	Graphical image reference
        dialog	Interactive component such as a confirmation
        form	A collection of user input
        input	User input field
        audio	Audio content
        video	Video content
        svg	Scalable vector graphic content
        iframe	Inline frame of another HTML page
## Structure
This is the basic layout of HTML structure
```
<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>
```
## Input
These are the HTML input [elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
The best ones in my opinion are text, password, and email, but there are many different input types.

## Media
The HTML elements that represent media include img, audio, video, svg, and canvas. The img, audio, and video elements are all simple references to an external file, but svg and canvas both contain the code for render a visual image that can even be animated.

You can also use inspect element to see what websites use!

## Simon HTML
- We have to use HTML to create a basic structure that we can then add styling and functionality to later
- You can use href to link local pages / tabs
- You can use SVG to create shapes
- Most pages might have the same head and footer!
- the link rel appears to add that little icon to the tab!
- Most pages also start with the same:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Tell browsers not to scale the viewport automatically -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simon</title>
    <link rel="icon" href="favicon.ico" />
  </head>
```

- To deploy it, it is best to use a script like this one:
```
#!/bin/bash

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying files for $service to $hostname with $key\n"

# Step 1
printf "\n----> Clear out the previous distribution on the target.\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 2
printf "\n----> Copy the distribution package to the target.\n"
scp -r -i "$key" * ubuntu@$hostname:services/$service/public

```

## CSS Introduction

### Selectors
- Selectors are used to select which HTML element you will be applying your styling to.
- [MDN CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- You can element selectors, combinators, class selectors, ID selectors, attribute selectors, and pseudo selctors!
### Declarations
- Declarations are used to state what property you will be styling. There are many different options.
- [MDN reference section on properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- It is important to know the different units and colors available for setting these declarations
### Fonts
- The first font available will be what is used
- "There are four major families of fonts: Serif, san-serif, fixed, and symbol. A serif is a small stroke attached to the ends of a character's major strokes. Serif fonts have the extra strokes, san-serif fonts do not. Fixed fonts characters all are the same size. This is useful for lining up text when doing things like coding or display tabular data. Symbol fonts represent non-language characters such as arrows or emojis."

- [Google's Open source fonts](https://fonts.google.com/)
```
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```

-[MDN Web Fonts](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)


### Animation
-[MDN Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
- [Cool cloud codepen](https://codepen.io/leesjensen/pen/wvXEaRq)
- [MDN Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
- Animate by stating it is an animation, providing a start and stop, and any intermediate steps

```
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

## CSS Grid and Flex
[My Codepen example](https://codepen.io/justinolcott/pen/KKxwqyE)

### Grid

- an example of using grid
  - the display is grid
  - the columns will be automatic with a minimnum of 300 px
  - the fr is a fractual unit
```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

### Flex
- a general flexbox setup
```
header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```
- how to set differing sizes / ratios
```
section:nth-child(1) {
  flex: 1;
  background-color: hsl(180, 10%, 80%);
}
section:nth-child(2) {
  flex: 3;
  background-color: white;
}
```

#### Media Query
- Use these to account for irregular sizes
```
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

### CSS Debugging
- it is helpful to use Chrome Inspect to debug CSS

### CSS Frameworks
- Bootstrap and Tailwind are the current top frameworks
- You can integrate Bootstrap into your web applications simply by referencing the Bootstrap CSS files from their content delivery network (CDN). You then add the HTML link elements to your head element like this.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    ...
  </body>
</html>
```
- If you are going to use Bootstrap components that require JavaScript (carousel, buttons, and more), you will also need to include Bootstrap's JavaScript module. You add this by putting the following at the end of your HTML body element.
```
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```
- use this to include Bootstrap in the source code
```
npm install bootstrap@5.2.3
```
- this [Codepen](https://codepen.io/leesjensen/pen/JjZavjW) has all the major Bootstrap components
- [This is my codepen](https://codepen.io/justinolcott/pen/MWqwPrE)
- the header section is extremely useful for creating websites
- bg has a lot of default colors
- I found it is pretty effective to use wrappers as parents to limit the size of elements and then inside, usually setting the height and width to 100%



## Simon CSS
- our general structure was header, body, and footer
- for the buttons, we used border radius to make a semi circle
- we used flex to make the body fill the center
- we used box sizing to fit it
- we used flex: calc(100vh - 110px) to get the correct sizing
- we used a little padding to get everything off of the edges
- we used flex: 0 80px to get a constant header size
- we used classes for each type of element to then modify it with css
- we used bg-secondary, text-light, and other stylizing keywords to control similar looks
- we used <link rel="stylesheet" href="main.css"> to link the css sheet
- we used <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"> to link to bootstrap


## UX Design


- Things to keep in mind:
  - Design as a story
  - Simplicity
  - Consistent
  - Navigation
    - use an application map and breadcrumbs
  - Colors
    - Some free tools you should explore include [Paletton](https://paletton.com/) and [Adobe](https://color.adobe.com/create/color-wheel).
  - Typography
    - When picking fonts you usually want to restrict the number of fonts to three or less. You also want to use them consistently. For example, it is common to use a San Serif font for buttons, navigation links, and body text. Serif fonts are used for paragraph headings. Monospaced fonts are for coding examples or text than need alignment.
    - Google's Free Open collection of fonts [here](https://fonts.google.com/about).
    - Iconography
      - There are lots of standard icon packages that you can choose from. This includes packages such as [Font Awesome](https://fontawesome.com/), [Bootstrap Icons](https://icons.getbootstrap.com/), [Material Icons](http://google.github.io/material-design-icons/), [Flat Color Icons](https://github.com/icons8/flat-color-icons), and [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
  - Text
    - Purpose	Size
      - Page title	96 px
      - Titles	48-20 px
      - Text	16 px
      - Secondary text	14 px
      - Input	16 px
    - Limiting line length
      - Instead you want to specify a maximum width for your paragraphs. Usually a width of 60 to 80 characters is optimal. You can set this with the max-width property set to something like 35em. The em unit is the approximately the width of the m character in the font and so about half of an 'm' is about the average character width.
  - Internationalization
    - Pay attention to reading from right to left, different languages, dates, currencies, numerical seperators, time zones, and iconography
  - Space, white space has power and is easier on the eyes
  - Interaction creates retention
  - Images can be very useful, but do not use them as space fillers
  - Animation can be useful to confirm choices, demonstrate progress, and focus attention, but do not overdo it
  - Decision fatigue, do not present to many inputs at one time
  - Device awareness and making your application more seamless
  - Device size and orientation
  - Web Performance
  - Short circuit: think about those who may not have the network to fully interact with the page
  - Accessibility
    - visual, high contrast themes, screen readers
    - audiio, closed captions, textual alternatives
    - physical, keyboard navigation, element ordering
  - Walls
    - Complexity
    - Payment walls
    - Application Failure
    - Security
    - Legal (cookies)

# JavaScript
## JS Intro
- You should use semicolons and curly braces as code delimiters
- You can write comments with // or /* */
- You can write your own functions by writing "function"
- You can output using console.log()
- Make sure to pay attention to the version of JS and browser compatability

## JS Console
- you can output to console using console.log('asdf');
- you can create a formatted message using %s, etc
- you can use css declarations like console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
- wrap code with console time and timeEnd calls
- you can count blocks of code with the count function

## Adding JS to HTML
- you can insert JS directly within a \<script> element or using src attribute of the script element
- you can also implement it with the onclick attribute of a button element


## JS Type and Construct
- use let or const to declare a variable
- there are several primitive types like null, undefined, boolean, number, bigint, string, and symbol
- there are also object types such as object, function, date, array, map, and json
- common operators include +, -, *, /, and === (equality)
- beware of type conversions
- use strict equality in my code 
- conditionals include if, else, and if else and they look like java or c++
- you can also use the ternary operator or boolean operators
- loops include for, for in, for of, while, and do while
- it also has break and continue
- [An example codepen of min](https://codepen.io/justinolcott/pen/wvEGGOv)

### JS Strings
- JS supports UTF-16 which will include most languages
- backticks are for string literals which can include javascript
- string has some useful functions including length, indexof, split, starts with, ends with, and tolowercase

### JS Functions
- functions are first class objects meaning they can be assigned a name, passed as a parameter, and returned as a result, and referenced from an object or array just like a variable
- you can have undefined parameters or default parameters
- you can assign a variable as a function
- functinos can be declared inside other functions

### JS Arrow Functions
- anonymous functions can be replaced with arrow functions which look like () => 3; and it may or may not have brackets if the return function is implicit. If there are arrow brackets, the return value has to be explicitly states
- arrow functions cannot be used with contructors or iterator generators
- arrow functions inehert the this poinder from the scope where it is created making a closure
- it will remember the values of the variables of the scope when it was created not when they are exececuted.


### JS Array
- js arrays have a lot of the normal array functions
- js arrays also use the normal [] notation

### JS Object and Classes
- objects are a collection of name value pairs referred to as properties
- the name must be of type string or symbol, but the value can be anything
- objects have common object-oriented functionality such as constructors, this pointers, static properties, and functions, and inheritance
- objects are created with the new operator
- there is a lot of power in being able to assign object properties to anything
- object literals allow you to provide an initial composition. It is done with brackets and a: 3, b:'fish' syntax
- objects have built in functions such as entries, keys, and values
- contructors are functions that return an object and can be invoked with new.
- you can create methods within the return encapsulation
- this can be used to reference a property within the scope
- you can use classes to define objects and are used with the intent to create a reusable component. It looks the same as creating an object
```
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```
- you can make properties and functions private by prefixing them with a #
- you can use extends like in java to define inheritance
- use super to pass parameters to the parent

## More Notes from creating HTML and CSS Startup
- This header took a lot of time, but it uses the dropdown menu when it is too small:
```
<header class="container-fluid">
  <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="index.html">
          <img src="/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
          NINTH HEAVEN
        </a>
      <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          

          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                  <a class="nav-item nav-link active" href="index.html">Home <span class="sr-only">(current)</span></a>
                  <a class="nav-item nav-link" href="login.html">Sign-in / Login</a>
                  <a class="nav-item nav-link" href="challenges.html">Challenges</a>
              </div>
          </div>
  </nav>
</header>
```
- Multiple times when something wasn't working it was because I wasn't including a reference in the head either to my own css or an external one like Bootstrap or Google Fonts
- These are the links that I had to include:
```
<link rel="icon" type="assets/favicon" href="/assets/favicon.ico">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Gloock&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="main.css"/>
```
- The images I used make it take a little longer to load, so I will have to shrink the images.
  - I find the default image editer is very useful for resizing images and getting the correct ratios
  - I found the [pexels.com](pexels.com) is a great place to get free images
- I still could never get icon buttons to work, so I will have to look into that
- I found that Bootstrap is very useful in resizing and creating borders and changing colors.
- Certain elements require javascript links at the bottom for them to function like certain bootstrap elements
```
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```
- I found mx-auto, max-width, and text-center to be very useful Bootstrap elements
- There are a ton of Bootstrap elements and icons to be used. Websites can either be created in 10 minutes or 1 year, there is so much that can go into them.
- I found referencing codepens, old code, and example code to be very useful in adding different elements that I liked
- the col, col-6, row, and other bootstrap classes made it very easy to get the layout that I wanted
- I find the hamburger icon / shrink / dropdown menu very useful in making things work with mobile devices
- I found that I really liked the carousel and forms from bootstrap.
  - the buttons are also very useful as well as the alerts
- This was a very good form to use that I edited:
```
  <div class="bd-example">
      <form class="px-4 py-3 mx-auto" style="max-width: 300px;">
        <div class="mb-3">
          <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
        </div>
        <div class="mb-3">
          <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
        </div>
      
        <button type="submit" class="btn btn-outline-primary">Login</button>
        <button type="submit" class="btn btn-primary">Sign up</button>
      </form>
  </div>
```

### Regular Expressions
- you can use a regex object or a literal
```
const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;
```
- the string class includes several functions that can include regex

### JS Rest and Spread
- you can create a function taht takes any number of parameters using this notation:
```
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```
- which technically allows JS to provide variadic functions
- spread does the opposite, it looks like it is usually used in calling a function

### Destructuring
- you can destructure an array or object into variables using 
```
const [b, c, ...others] = a;

console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]
```
- you can do objects, but you should specify which values
```
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a, c } = o;

console.log(a, c);
// OUTPUT 1, ['fish', 'cats']
```

### JS Exceptions
```
try {
  // normal execution code
} catch (err) {
  // exception handling code
} finally {
  // always called code
}
```

### Scope
- four types: global, module, function, and block
- strongly suggested that we don't use var
- this represents the object that contains the context within the scope
- this is automatically declared and can be references anywhere
- this in global is globalThis object which usually refers to the browser's window object
- this in function refers to the object that owns the function
- this in an object references the object
- closures allow you to access variables in a function from its surrounding state like a classes in a method
- but arrow functions are different since it depends on its creation state

### Modules
- Modules can only be used when inside a module, not from global
- you have to explicitly state export or import

### Document Object Model
- the DOM acts like a big tree with elements inside
- some good functions and properties include querySelectorAll, textContent, and innerHTML.
- DOM supports inserting, modifying, and deleting elements
- you need to first create an element and then append it
```
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
```
- removeChild is used to delete elements
- injecting HTML
```
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
```
- beware of common attacks, either sanitize any HTML that contains variables, or simply use DOM manipulation functions instead of using innerHTML
- some common event listeners are clipboard, focus, keyboard, mouse, text selection, and more [here](https://developer.mozilla.org/en-US/docs/Web/Events)
- you can also include it directly in the HTML
```
<button onclick='alert("clicked")'>click me</button>
```
### Simon JS
- you can use localStorage to store values persistently on the server
```
const scoresText =localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        scores = this.updateScores(userName, score, scores);

        localStorage.setItem('scores', JSON.stringify(scores));
```
- use async when you don't want to wait on the function / have it run in the background
- use classes, methods, and functions to break the code up into understandable parts

### JS Promises
- you can use promises to execute code in parallel
- you can use then, catch, and finally with promises
- you can return a resolve or a reject depending on what the promise returns

## Midterm Review
- in html what does the <div> do: creates a division element
- to point to another dns record, you should use the following dns record type: CNAME (like an alias), point to another ip address is the a record
- you can use this css to load fonts from google: @import url(fonts.google....)
- promise output... burger fries taco shake noodles (taco is in the promise) (burger is after the promise) (fries is at the end) (shake is in the then) (noodles is in the finally)
- which of the following is valid json {"x":3}
- how would you turn the byu text blue? div.header {color:blue;}
- Which of the following is not a valid way to invlude javascript? not <javascript> but yes to <script> yes to onclick='1+1', src....
-  regex /A|f/i , i means case insensitive, so its any a or any f, so rat and fish matches
- which of the following is not a valid js function, function f(x) = {}, yes to function f(x) {}, const f = function(x) {}, const f = (x) => {}
- vows before marriage, padding around the content,  peanut butter and mayo, pals before marraige, padding, border, margin..
- in reverse order, its margin, border, padding, content
- a.reduce, map, filter,...
- <ul> is an html tag for an unordered list
- adds a mouseover event listener to a p element, document.querySelector('p'), just the first since its not a querySelectorAll, then .addEventListener(mouesover, console.log): mouseover and hover are about the same
- Which will create a valid html hyper link? <a href="asdf">x</a>
- a.map function
- another promise with an async and await, so it wait for the promise to finish
- async will always return a promise
- what does the DOM textContent property do? Sets the child text for the an element
- Which of the following is a DNS subdomain? c260.cs.byu.edu the whole thing is the subdomain, 
- flex-direction: column-reverse, used a lot for right to left languages... since its a flex column the elements will all be in one column so on different rows
- valid javascript objects require : not =, and quotes dont matter either
- chmod +x deploy.sh, ls -la deploy.sh, sudo deploy.sh(no sense), ssh deploy.sh (no sense), 


### Simon JS
- you can pretty much just use your html and css if it was set up properly
- make sure to include a script src in each file
- for buttons, you can usually just include a onclick="function" to add functionality
- you can do a lot with document such as querySelector, or querySelectorAll
- from the code we used, it appears to use functions to seperate the functionality code with the webpage code by having a function call another function that then accesses the website
- use localStorage to save things to the server
- when creating elements, it tends to be a document.createElement, element.textContent assignment, and then parent.appendChild().

## Startup JS
- I found that using classes was very effective in making things more concise and understandable
- I had troubles having different classes access each other's methods. I was stuck on inheritance, but instead, it was solved very easily by passing the instance to class that needs it. And you can even pass two instances each other's references to each other to create a strong relationship
- I found it effective to have models or classes to represent repeatable sections of html such as a challenge representing a challenge element
- I used querySelect a ton!
- to change the page, use window.location.href
- I had some problems with href when it was in a form vs. a button.
- We can use local storage to store data persistently just with one user
- If we are storing objects, we have to use json to either parse or stringify it.
- I found that breaking it down into functions and classes as small as reasonably possible and not repeating code made it extremely easy to change and add things on.
- I found to avoid innerHtml, we can use different element add feature and removal features.
- you can user Number(..) to convert things to be a number
- you can use localStorage.clear() to clear local storage
- I think it was neat learning html, css, and javascript to build the website, but knowing what I know now, I would probably develop everything together, but also spend a lot more time deciding how I would want things done.

### URL
The URL syntax uses the following convention. Notice the delimiting punctuation between the parts of the URL. Most parts of the URL are optional. The only ones that are required are the scheme, and the domain name.

```yaml
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
```

| Part        | Example                              | Meaning                                                                                                                                                                                                                                                                             |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scheme      | https                                | The protocol required to ask for the resource. For web applications, this is usually HTTPS. But it could be any internet protocol such as FTP or MAILTO.                                                                                                                            |
| Domain name | byu.edu                              | The domain name that owns the resource represented by the URL.                                                                                                                                                                                                                      |
| Port        | 3000                                 | The port specifies the numbered network port used to connect to the domain server. Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose. The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS.     |
| Path        | /school/byu/user/8014                | The path to the resource on the domain. The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema.                                                    |
| Parameters  | filter=names&highlight=intro,summary | The parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string. |
| Anchor      | summary                              | The anchor usually represents an sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. The anchor is also sometimes called the hash, or fragment ID.                    |


### Ports
When you connect to a device on the internet you need both an IP address and a numbered port. Port numbers allow a single device to support multiple protocols (e.g. HTTP, HTTPS, FTP, or SSH) as well as different types of services (e.g. search, document, or authentication). The ports may be exposed externally, or they may only be used internally on the device. For example, the HTTPS port (443) might allow the world to connect, the SSH port (22) might only allow computers at your school, and a service defined port (say 3000) may only allow access to processes running on the device.

The internet governing body, IANA, defines the standard usage for port numbers. Ports from 0 to 1023 represent standard protocols. Generally a web service should avoid these ports unless it is providing the protocol represented by the standard. Ports from 1024 to 49151 represent ports that have been assigned to requesting entities. However, it is very common for these ports to be used by services running internally on a device. Ports from 49152 to 65535 are considered dynamic and are used to create dynamic connections to a device. [Here](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) is the link to IANA's registry.

Here is a list of common port numbers that you might come across.

| Port | Protocol                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------- |
| 20   | File Transfer Protocol (FTP) for data transfer                                                     |
| 22   | Secure Shell (SSH) for connecting to remote devices                                                |
| 25   | Simple Mail Transfer Protocol (SMTP) for sending email                                             |
| 53   | Domain Name System (DNS) for looking up IP addresses                                               |
| 80   | Hypertext Transfer Protocol (HTTP) for web requests                                                |
| 110  | Post Office Protocol (POP3) for retrieving email                                                   |
| 123  | Network Time Protocol (NTP) for managing time                                                      |
| 161  | Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers |
| 194  | Internet Relay Chat (IRC) for chatting                                                             |
| 443  | HTTP Secure (HTTPS) for secure web requests                                                        |

### HTTP
- an http exchange consists of a request and response
- a request:

```http
GET /hypertext/WWW/Helping.html HTTP/1.1
Host: info.cern.ch
Accept: text/html
```

An HTTP request has this general syntax.

```yaml
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[
  <body>
]
```

- a response:
```yaml
HTTP/1.1 200 OK
Date: Tue, 06 Dec 2022 21:54:42 GMT
Server: Apache
Last-Modified: Thu, 29 Oct 1992 11:15:20 GMT
ETag: "5f0-28f29422b8200"
Accept-Ranges: bytes
Content-Length: 1520
Connection: close
Content-Type: text/html
<TITLE>Helping -- /WWW</TITLE>
<NEXTID 7>
<H1>How can I help?</H1>There are lots of ways you can help if you are interested in seeing
the <A NAME=4 HREF=TheProject.html>web</A> grow and be even more useful...
```

An HTTP response has the following syntax.

```yaml
<version> <status code> <status string>
[<header key: value>]*
[
  <body>
]
```

- http codes
1xx - Informational.
2xx - Success.
3xx - Redirect to some other location, or that the previously cached resource is still valid.
4xx - Client errors. The request is invalid.
5xx - Server errors. The request cannot be satisfied due to an error on the server.

### SOP and CORS
- To combat this problem the Same Origin Policy (SOP) was created. Simply stated SOP only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. A request from byu.iinstructure.com for service endpoints that are made to byu.instructure.com would fail because the domains do not match. This provides significant security, but it also introduces complications when building web applications. For example, if you want build a service that any web application can use it would also violate the SOP and fail. In order to address this, the concept of Cross Origin Resource Sharing (CORS) was invented.

CORS allows the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed. The server may say that all origins are allowed, for example if they are a general purpose image provider, or only a specific origin is allowed, for example if they are a bank's authentication service. If the server doesn't specify what origin is allowed then the browser assumes that it must be the same origin.

### Fetch
- we can use fetch on apis in js to get data from other websites, but we may run into CORS issues


### Webservices


### Node.js
- Steps:
Create your project directory
Initialize it for use with NPM by running npm init -y
Make sure .gitignore file contains node-modules
Install any desired packages with npm install <package name here>
Add require('<package name here>') to your JavaScript code
Run your code with node main.js

- using http:
➜ mkdir webservicetest
➜ cd webservicetest
➜ npm init -y
➜ npm install http

```
const http = require('http');
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello Node.js!</h1>');
  res.end();
});

server.listen(8080, () => {
  console.log(`Web service listening on port 8080`);
});
```

'''
node main.js
'''


### Express
- Everything in Express revolves around creating and using HTTP routing and middleware functions. You create an Express application by using NPM to install the Express package and then calling the express constructor to create the express application and listen for HTTP requests on a desired port.
```
app.get('/store/provo', (req, res, next) => {
  res.send({ name: 'provo' });
});
```
- The express app compares the routing function patterns in the order that they are added to the Express app object. So if you have two routing functions with patterns that both match, the first one that was added will be called and given the next matching function in the next parameter.
- you can use colons to accept a parameter name
```
app.get('/store/:storeName', (req, res, next) => {
  res.send({ name: req.params.storeName });
});
```
- more examples:
```
// Wildcard - matches /store/x and /star/y
app.put('/st*/:storeName', (req, res) => res.send({ update: req.params.storeName }));

// Pure regular expression
app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));
```
- middle ware function looks like : function middlewareName(req, res, next)
- your own middleware
```
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
```
- In addition to creating your own middleware functions, you can use a built-in middleware function. Here is an example of using the static middleware function. This middleware responds with static files, found in a given directory, that match the request URL.
```
app.use(express.static('public'));
```
- you can have third party ones with npm and error handling
```
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});
```
### Debugging Node.js
- in vs code, use f5 to debug and choose Node.js
- you can add breakpoints
- f5 to start debugging, f10 to step to the next line, f11 to step into a function call, f5 to continue running from the current line. Shift-f5 will stop debugging.
- install nodemon which automatically updates the browser with npm install -g nodemon


### PM2
- daemons will keep things running in the background
- proces manager 2 is an easy way to start and stop our services
- see pm2 in action with pm2 ls
- If you want to setup another subdomain that accesses a different web service on your web server, you need to follow these steps.

Add the rule to the Caddyfile to tell it how to direct requests for the domain.
Create a directory and add the files for the web service.
Configure PM2 to host the web service.

- adds to the caddy file
```
tacos.cs260.click {
  reverse_proxy _ localhost:5000
  header Cache-Control none
  header -server
  header Access-Control-Allow-Origin *
}
```
- 
```
The following is the JavaScript that causes the web service to listen on a port that is provided as an argument to the command line.

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
- also this code enables the use of a public directory to use: app.use(express.static('public'));
- command to start a new process, make sure you are in your services directory: 
```
cd ~/services/tacos
pm2 start index.js -n tacos -- 5000
pm2 save
```
### UI Testing
- we will use playwright to test our UI code
- npm init playwright@latest
- install playwright extension
- Example playwright test:
```
import { test, expect } from '@playwright/test';

test('testWelcomeButton', async ({ page }) => {
  // Navigate to the welcome page
  await page.goto('http://localhost:5500/');

  // Get the target element and make sure it is in the correct starting state
  const hello = page.getByTestId('msg');
  await expect(hello).toHaveText('Hello world');

  // Press the button
  const changeBtn = page.getByRole('button', { name: 'change welcome' });
  await changeBtn.click();

  // Expect that the change happened correctly
  await expect(hello).toHaveText('I feel not welcomed');
});
```
- Browser stack allows us to use different devices to test our code, but it costs money

### Endpoint Testing
- we are going to use jest
- we have to export our server.js file and import the app object in the index.js file
```
const app = require('./server');

const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```
- .test.js is any testing file
- an example test:
```
test('that equal values are equal', () => {
  expect(false).toBe(true);
});
```
- -D means to install as a development package
- npm install jest -D
- Now, replace the scripts section of the package.json file with a new command that will run our tests with Jest.
```
"scripts": {
  "test": "jest"
},
```
- npm run test
- supertest allows us to make HTTP requests without having to actually send them over the network: npm install supertest -D
- example:
```
const request = require('supertest');
const app = require('./server');

test('getStore returns the desired store', (done) => {
  request(app)
    .get('/store/provo')
    .expect(200)
    .expect({ name: 'provo' })
    .end((err) => (err ? done(err) : done()));
});
```
- The great thing about test driven development (TDD) is that you can actually write your tests first and then write your code based upon the design represented by the tests. When your tests pass you know your code is complete. Additionally, when you make later modifications to your code you can simply run your tests again. If they pass then you can be confident that your code is still working without having to manually test everything yourself. With systems that have hundreds of endpoints and hundreds of thousands of lines of code, TDD becomes an indispensible part of the development process.


## Simon Service
- first move all the public files to a public folder like main.css, index.html, index.js, etc, etc
- then add node by doing the following:
  - npm init -y
  - add node_modules to .gitignore
  - install express with npm install express
- create a new file in the root: index.js
  - add the basic express code:
```
const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());
```

- use this code to add the public: app.use(express.static('public'));

- create a router with this code, this one is used as an api to then use to update scores, I'll have to have a similar one
```
// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);
```

- this code is an example get:
```
// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});
```

- we then use this one like this:
```
async function loadScores() {
  const response = await fetch("/api/scores")
  const scores = await response.json()
```

- this code is save the scores so we can go offline
```
async function loadScores() {
  let scores = [];
  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/scores');
    scores = await response.json();

    // Save the scores in case we go offline in the future
    localStorage.setItem('scores', JSON.stringify(scores));
  } catch {
    // If there was an error then just use the last saved scores
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  }

  displayScores(scores);
}
```

- 

- this code is an example post or king of like a send 
```
// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});
```

- it is then used in this code:
```
  async saveScore(score) {
    const userName = this.getPlayerName();
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      // Store what the service gave us as the high scores
      const scores = await response.json();
      localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
      // If there was an error then just track scores locally
      this.updateScoresLocal(newScore);
    }
  }
```

- these two app calls are for handling an unknown path and then having the app listen to the correct port that we inserted earlier:
```
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

### Storage Services
- we don't want to store files directly on our server because servers should be temporary and we want to have backups and we don't want the server to fail if there are too many files
- to use AWS S3 for storage: You can find detailed information about using AWS S3 with Node.js on the AWS website. Generally, the steps you need to take include:

Creating a S3 bucket to store your data in.
Getting credentials so that your application can access the bucket.
Using the credentials in your application.
Using the SDK to write, list, read, and delete files from the bucket.

### Data Services
| Service       | Specialty             |
| ------------- | --------------------- |
| MySQL         | Relational queries    |
| Redis         | Memory cached objects |
| ElasticSearch | Ranked free text      |
| MongoDB       | JSON objects          |
| DynamoDB      | Key value pairs       |
| Neo4J         | Graph based data      |
| InfluxDB      | Time series data      |

- sample queries in mongodb:
```
// find all houses
db.house.find();

// find houses with two or more bedrooms
db.house.find({ beds: { $gte: 2 } });

// find houses that are available with less than three beds
db.house.find({ status: 'available', beds: { $lt: 3 } });

// find houses with either less than three beds or less than $1000 a night
db.house.find({ $or: [(beds: { $lt: 3 }), (price: { $lt: 1000 })] });

// find houses with the text 'modern' or 'beach' in the summary
db.house.find({ summary: /(modern|beach)/i });
```
- first step is install mongo with npm install mongodb
```
const { MongoClient } = require('mongodb');

const userName = 'holowaychuk';
const password = 'express';
const hostname = 'mongodb.com';

const uri = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(uri);
```

- this code is used to insert a java object
```
const collection = client.db('rental').collection('house');

const house = {
  name: 'Beachfront views',
  summary: 'From your bedroom to the beach, no shoes required',
  property_type: 'Condo',
  beds: 1,
};
await collection.insertOne(house);
```

- this code is used to query:
```
const cursor = collection.find();
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
```

- You need to protect your credentials for connecting to your Mongo database. One common mistake is to check them into your code and then post it to a public GitHub repository. Instead you can load your credentials when the application executes. One common way to do that, is to read them from environment variables. The JavaScript process.env object provides access to the environment.

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error("Database not configured. Set environment variables");
}

`sudo vi /etc/environment`
```
export MONGOUSER=<yourmongodbusername>
export MONGOPASSWORD=<yourmongodbpassword>
export MONGOHOSTNAME=<yourmongodbhostname>
```

```
pm2 restart all --update-env
pm2 save
```

## Simon DB
- I learned how I can use a database to store data not on the server itself. I learned how to properly set up data management, so it is very easy to implement a database. I also learned how to properly manager environment variables to keep usernames and passwords secure. 
- If done correctly, the only difference between using the server as the storage and MongoDB will be the actual functions when you need data from the database. In the simon example, we simply have to change our get scores and submit scores.
- we use `const userName = process.env.MONGOUSER;` to properly reference environment variables and keep our data secure/
- this code sets up our connection with the MongoClient
```
const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
```
- this code gets a collection or us to then reference. Note how they have our client, then the database 'simon' and then the collection 'score'.
```
const scoreCollection = client.db('simon').collection('score');
```

- we can then insert with `scoreCollection.insertOne(score);`
- and we can query with:
```
const query = {score: {$gt: 0}};
  const options = {
    sort: {score: -1},
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
```

- I was having troubles with the environment varibles, so just make sure to restart pm2 and update env var as well as saving. Sometimes, a reboot is necessary as well.
- you can view the collections directly in atlas on their website
- in my project, I will need to have queries of getting the scoreboard and getting the challenges feed.
- and then I will need inserts of creating challenges and inserts of checking off challenges

### Authorization Services, Account Creation, and Login

## Simon Login
- I learned how we use hash to not save passwords, to use uuid for tokens, how we can use cookies to save tokens, and how we can use authentification to then create a secure api router.
- include cookieParser and bcrypt 
```
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const authCookieName = 'token';
```

- code for creating an auth token for a new user
```
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});
```
  - and in createUser, we hash the password and return a token via uuid:
```
async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}
```
  - and then we set the cookie
```
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
```

- login function which essentially checks if the hashed password matches
```
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});
```

- logout function which essentially just deletes the cookie
```
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});
```

- a function that gets information about the user which we will use to see if the user has been logged in already initially
```
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});
```

- and then we use a secure api router instead of a normal one
```
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});
```

- Essentially, we have to add the login functionality and then use a secure api to the previous functionality

## Startup Service Notes

### Startup Web Service
- move most files to a public and create an index.js
- also init your directory with npm init -y and install express
- I found it is very effective to create a data access class that all the other classes use to access any data that will be changing, this made it very easy to update with future commits
- It also makes it easier to handle local file saving versus server saving
- I did have a very strange issue where localhost would work for api calls but not for showing the website, but 127.0.0.1 would work for the website but not for api calls, essentially I added app.listen to 0.0.0.0 which allows access to all.
- essentially to do this first step, we have the server run index.js and in it, it has a variable that stores the challenges and other data. We will replace this with the database next.

### Startup Database
- It was really easy to implement a database to the startup since a lot was already set up since the simon.
- In the simon, we essentially created a mongodb account and set up environment variables
- to set up the database for the startup, we created a new file called database.js
- then I edited the index.js to change some of the end points to send and return data from database.

### Startup Login
- The login was the hardest part to implement
- it required including a lot more to the express with endpoints to login user, create user, get user, and more.
- it also required some authenticating users with tokens before, and then creating a secure api router.
- it also required some thinking on my part of how I wanted to implement logging in, I decided to skip the login page if I find that they are already logged in. I didn't feel like creating a logout button, so I just added another link in the dropdown menu to logout.
- I eventually got it working out and now I'll have to implement websockets and add saving challenges to the web service.


### Websock Notes
- how to start a websocket:
```
const socket = new WebSocket('ws://localhost:9900');

socket.onmessage = (event) => {
  console.log('received: ', event.data);
};

socket.send('I am listening');
```
### Debuggin Websocket
- You can debug the client in chrome and the server with node.js debugger
- to get websocket do npm install ws
- you can open chrome debugger with f12
- go to the network tab and then messages tab to view websocket messages
![a good example of debugging](https://github.com/webprogramming260/.github/raw/main/profile/webServices/webSocket/webServicesWebSocketClientDebug.gif)


### Websocket chat
- if it is non-secure http, us ws, otherwise wss
- and we can get the location by referencing where we got the html from:
```
// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');
};
```
- and this is what the receiving side can look like:
```
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  appendMsg('friend', chat.name, chat.msg);
};
```
- socket.onclose = anon function to do things on close for any reason

- code to handle the upgrade ourselves: btw the server is the app.listen on a port....
```
// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});
```
- as a server, we will manage a bunch of connections... add a connection to a list of connections when connected and remove it on close and when we receive a message, forward it to all but the sender as follows:
```
// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });
});
```

- this code keeps connections alive using ping and pong every 10 seconds:
```
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);

// Respond to pong messages by marking the connection alive
ws.on('pong', () => {
  connection.alive = true;
});
```
- all the code is found here: [Github](https://github.com/webprogramming260/websocket-chat)


## Simon Websocket notes 
- at the very end of index.js we will create a new PeerProxy passing it the httpServer

- in the constructor, we create a new websocket with no server
- we then handle the upgrade
- we then keep track of connections by adding on a connection and removing when closed
- we also forward messages on message to all but the sender
- we also respond to pong messages and set the connection.alive = true
- we also add a setInterval connection to keep connections alive

- we added a small div in play.html to then reference and add elements too

- we then have three functions in play.js with one private variable socket to reference.
- the first function configureWebScket() sets up the connection
```
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'game', 'disconnected');
    };
```
- and then the on message function, we get the message and call the display message function
- the display message function simply adds html to the #play-message div
- the last function is a broadcastEvent function which is the send. It takes makes a little event function and then calls: `this.socket.send(JSON.stringify(event));`

- I learned how to set up a server and client side websocket and how a server can connect multiple clients by having websockets with each. I learned its can be pretty simple to implement websockets and how effective they are in certain use cases.

## React

### Reactivity
- so in react, we have little components like:
```
const Survey = () => {
  const [color, updateColor] = React.useState('#737AB0');

  // When the color changes update the state
  const onChange = (e) => {
    updateColor(e.target.value);
  };
  return (
    <div>
      <h1>Survey</h1>
      {/* Pass the Survey color state as a property to the Question.
          When to color changes the Question property will also be updated and rendered. */}
      <Question color={color} />

      <p>
        <span>Pick a color: </span>
        {/* Pass the Survey color state as a property to the input element.
            When to color changes, the input property will also be updated and rendered. */}
        <input type='color' onChange={(e) => onChange(e)} value={color} />
      </p>
    </div>
  );
};
```

- in a component wwe have a some variables and little functions as well as some default values. Usually these components will return some html, so in this last example, the component survey doesn't take any input variables, but then it has a variable text and a function to update that variable with the default variable of #737AB0.
- we then define a function that updates the variable on change which is called in the returned html
- lastly, we return html which is pretty basic besides having another react component in it and an input variable that calls the function we just made
- that was what I learned from this assignment and these principles can be applied in the future.

## Startup Websocket Notes
- to implement websockets, and that is a websocket that connects to the server who then forwards messages to all other users, we have two parts.
  - The first part is to create a peer proxy for the server to run which essentially keeps a websocket open with each user and forwards messages to all other users
  - The other part is on the client side. Essentially you setup the websocket, and have two functions:
    - The first function is to handle receive messages and in my code, this is seen in the alerts at the top of the screen
    - The second function is to send messages, that is seen with the broadcastEvent function

## Startup Web Service Notes to Grader
- The third party endpoints are on the homescreen in the alerts, it should show the weather for Alta
- The other thing is that on the Challenges page, sometimes you have to wait before checking off different challenges for the scoreboard to correctly load


### Hook Notes
- we can use hooks to to be able to do everything that a class style component can do and more.
- in the following example, the useEffect on happens when the count1 variable is clicked
```
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```
### Toolchains
- This is directly from the source: 
As web programming becomes more and more complex it became necessary to abstract away some of that complexity with a series of tools. Some common functional pieces in a web application chain include:

Code repository - Stores code in a shared, versioned, location.
Linter - Removes, or warns, of non-idiomatic code usage.
Prettier - Formats code according to a shared standard.
Transpiler - Compiles code into a different format. For example, from JSX to JavaScript.
Polyfill - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
Bundler - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
Minifier - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
Testing - Automated tests at multiple levels to ensure correctness.
Deployment - Automated packaging and delivery of code from the development environment to the production environment.
The toolchain that we use for our React project consists of GitHub as the code repository, Babel for transpiling, WebPack for polyfill, bundling, and minifying, and finally a simple bash script (deployReact.sh) for deployment.

You don't have to fully understand what each of these pieces in the chain are accomplishing, but the more you know about them the more you can optimize your development efforts.

### React
- There is nothing that create-react-app does that you should consider off limits for change or improvement. If you take the time to understand what it is doing and why, then you should feel free to customize the application to how you would like it to work. At a basic level you should always do the following:

Replace the icon files with your own icons
Modify the manifest.json and package.json to contain your application name
Modify the README.md to describe your application
Modify index.html to contain a proper title and description metadata.

- As an example of more extension modifications, we can remove the testing and performance packages that create-react-app included in the template. You might do this because you are trying to simplify the project for demonstration purposes, or because you want to replace it with a different testing framework such as Playwright.

To make this change, we first use NPM to uninstall the @testing-library packages. This removes the packages from package.json so that they are no longer installed in node_modules when you run npm install.

npm uninstall @testing-library/jest-dom @testing-library/react @testing-library/user-event
Next delete the test JavaScript files setupTest.js and App.test.js. With the testing packages gone, nothing will call this code and so we can simply delete it.

rm src/setupTests.js src/App.test.js
We can also remove the performance reporting package and code in order to simplify our application even further.

npm uninstall web-vitals
rm src/reportWebVitals.js
Finally, we remove the references to reportWebVitals from index.js since that package is no longer available.

If you want to strip the project down even more, you can also delete the robots.txt, manifest.json, and the logo*.png files.

- from my own tinkering, I found the React CLI of npm very nice. It is extremely easy to start an app and insert my own components, styling, etc and then start the app in a development environment as well as then exporting it to a production environment.

## React Router Notes
- we can use react router to handle different pages, but in reality we aren't actually changing pages
- In order to use React Router on the web you need to run npm i react-router-dom to install React Router. 
- Once you have this library there are three things you need to do in order to use React Router.

Setup your router
Define your routes
Handle navigation

- an example: 
```
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/books" element={<BookList />} />
  <Route path="/books/:id" element={<Book />} />
</Routes>
```

```
import { useParams } from "react-router-dom"

export function Book() {
  const { id } = useParams()

  return (
    <h1>Book {id}</h1>
  )
}
```

- another example:
```
// Inject the router into the application root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter component that controls what is rendered
  // NavLink component captures user navigation requests
  // Routes component defines what component is routed to
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</Link>
        <NavLink to='/about'>About</Link>
        <NavLink to='/users'>Users</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```

## Simon React
- When setting up startup, we will seperate our project into two areas, one for the service and another for the source. In service, and the startup directory, I'll have to run npm install and that make sure both are running
- since the app is running seperately from service, we need to have a proxy in the app to send requests to the correct port.
- get everything sorted into the correct folders, namely the src folder will have all the code, the service folder contains the service, and public contains all the assets, favicon, manifest.json, and the index.html root.

### Index.jsx
- this file is really simple, it enables the React Router
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

```
### Bootstrap
- throughout we will have to import bootstrap
### App
- in the App, we first have a component with two states, userName and authState. We do a useEffect to immediately send a request to see if the user is authenticated.
- we then return the header and the footer, with the routes in between
- each route represents our different pages
- we also have to slightly change our header to have navlinks instead of just links


### About.jsx
- in the about we have a one time api call, so we do another useEffect, but pass it an empty dependency list, I will need this on my home screen to get Alta's weather
- then we simply return the html with the called api data

### Login
- login has 5 js files,  a AuthState class, and 4 components.
- it has a login component that will either create a Authenticated Component, Unauthenticated component, or display some simple text depending on the AuthState
- authenticate component gives two options in html to either go to play or logout
- logout was passed in as a property from login.jsx which calls onAuthChange which was passed in as a prop from app.jsx which changes the auth state and the user state. this makes sense as the user and auth state are used throughout the entire app, whereas some states are only used on certain pages
- unauthenticated component contains the html and functions to actually login

### Play
- play has a game notifier.js file which handles the websocket
- it has a short delay function in delay.js
- it has a play component which returns two components players and simongame
- players handles the receiving of messages
- simon game handles the actual game and sending the messages
  - a lot of the code is the same within the game, except that the buttons are being handled by React Refs
  - all the small functions are not changed, only functions that deal with the input of the user and output. Also, variables that belong to the component / class are now states


### Scores
- this code utilizes a JSX template of a table
- it has one state of scores
- it has a one time fetch for scores using useEffect, I will likely need to do this whenever a challenge is checked in my app
- it renders an array once everytime scores is loaded

# Notes for Final Startup
- To start using React, we do not need to change the server side code at all which includes the serverProxy and the database.
- Then we start with a fresh React app and make small changes and don't break it
- When I start with create app, it does a lot of background stuff including Babel, so then when I run npm run build, or when the script does, it bundles the code up to make it all more efficient
- We start with the index.jsx which essentially houses a Browser Router component which has an app component
- the app component does a lot of heavy lifting.
  - it handles the navigation in the app, the header, and footer.
  - it also deals with the authentification
  - it also does a useEffect to check for previous authentification using a fetch to the server with the localStorage username
- in login, we essentially make the calls and change the authState back in app
- for home, I just had to include bootstrap, and it works with the previous code, but I switched out the bootstrap elements for bootstrap components
  - in home, I have a useEffect with no dependency to fetch the weather at Alta using an api.
- The code in my challenges was way simpler because I could have the parent element hold the data for the child elements and when a child element would change the data, it would reload all the dependent children.
- the useEffect also made it very easy to initially get the challenges from the server
- the useEffect could also be used for automatically updating variables in the database when they're updated locally.
- the websocket was easy to implement as well, essentially you export an instance of the websocket and then in the receiver, you add it as a handler and then in the sender, you simply import the notifier and broadcast a message
- I really like React because it is a more logical, clean way of creating a web app. It also makes it more efficient to run like not having to reload everything on each new page. 
- I enjoyed the different components because for me it made it very OOP which feels natural to me. It also made using Bootstrap easier too! I ran into a ton of errors with Bootstrap at the beginning, but implementing them in React was extremely easy.
- The best example of React in my app is on the challenges page because it houses 4 different components. 1 for the alerts, 2 for the scoreboard, 3 for the challenge list, and 4 for the completed challenges. These components interact with each other as children and React made it very easy for everything to change.

### Security
Hacking - The process of making a system do something it's not supposed to do.
Exploit - Code or input that takes advantage of a programming or configuration flaw.
Attack Vector - The method that a hacker employs to penetrate and exploit a system.
Attack Surface - The exposed parts of a system that an attacker can access. For example, open ports (22, 443, 80), service endpoints, or user accounts.
Attack Payload - The actual code, or data, that a hacker delivers to a system in order to exploit it.
Input sanitization - "Cleaning" any input of potentially malicious data.
Black box testing - Testing an application without knowledge of the internals of the application.
White box testing - Testing an application by with knowledge of the source code and internal infrastructure.
Penetration Testing - Attempting to gain access to, or exploit, a system in ways that are not anticipated by the developers.
Mitigation - The action taken to remove, or reduce, a threat.

The following lists some common motivations at drives a system attack.

Disruption - By overloading a system, encrypting essential data, or deleting critical infrastructure, an attacker can destroy normal business operations. This may be an attempt at extortion, or simply be an attempt to punish a business that that attacker does not agree with.
Data exfiltration - By privately extracting, or publicly exposing, a system's data, an attacker can embarrass the company, exploit insider information, sell the information to competitors, or leverage the information for additional attacks.
Resource consumption - By taking control of a company's computing resources an attacker can use it for other purposes such as mining cryptocurrency, gathering customer information, or attacking other systems.

There are a few common exploitation techniques that you should be aware of. These include the following.

Injection: When an application interacts with a database on the backend, a programmer will often take user input and concatenate it directly into a search query. This allows a hacker can use a specially crafted query to make the database reveal hidden information or even delete the database.

Cross-Site Scripting (XSS): A category of attacks where an attacker can make malicious code execute on a different user's browser. If successful, an attacker can turn a website that a user trusts, into one that can steal passwords and hijack a user's account.

Denial of Service: This includes any attack where the main goal is to render any service inaccessible. This can be done by deleting a database using an SQL injection, by sending unexpected data to a service endpoint that causes the program to crash, or by simply making more requests than a server can handle.

Credential Stuffing: People have a tendency to reuse passwords or variations of passwords on different websites. If a hacker has a user's credentials from a previous website attack, then there is a good chance that they can successfully use those credentials on a different website. A hacker can also try to brute force attack a system by trying every possible combination of password.

Social engineering - Appealing to a human's desire to help, in order to gain unauthorized access or information.

What you can do about it: 
Taking the time to learn the techniques a hacker uses to attack a system is the first step in preventing them from exploiting your systems. From there, develop a security mindset, where you always assume any attack surface will be used against you. Make security a consistent part of your application design and feature discussions. Here is a list of common security practices you should include in your applications.

Sanitize input data - Always assume that any data you receive from outside your system will be used to exploit your system. Consider if the input data can be turned into an executable expression, or can overload computing, bandwidth, or storage resources.
Logging - It is not possible to think of every way that your system can be exploited, but you can create an immutable log of requests that will expose when a system is being exploited. You can then trigger alerts, and periodically review the logs for unexpected activity.
Traps - Create what appears to be valuable information and then trigger alarms when the data is accessed.
Educate - Teach yourself, your users, and everyone you work with, to be security minded. Anyone who has access to your system should understand how to prevent physical, social, and software attacks.
Reduce attack surfaces - Do not open access anymore than is necessary to properly provide your application. This includes what network ports are open, what account privileges are allowed, where you can access the system from, and what endpoints are available.
Layered security - Do not assume that one safeguard is enough. Create multiple layers of security that each take different approaches. For example, secure your physical environment, secure your network, secure your server, secure your public network traffic, secure your private network traffic, encrypt your storage, separate your production systems from your development systems, put your payment information in a separate environment from your application environment. Do not allow data from one layer to move to other layers. For example, do not allow an employee to take data out of the production system.
Least required access policy - Do not give any one user all the credentials necessary to control the entire system. Only give a user what access they need to do the work they are required to do.
Safeguard credentials - Do not store credentials in accessible locations such as a public GitHub repository or a sticky note taped to a monitor. Automatically rotate credentials in order to limit the impact of an exposure. Only award credentials that are necessary to do a specific task.
Public review - Do not rely on obscurity to keep your system safe. Assume instead that an attacker knows everything about your system and then make it difficult for anyone to exploit the system. If you can attack your system, then a hacker will be able to also. By soliciting public review and the work of 
external penetration testers, you will be able to discover and remove potential exploits.

### OWASP
- A01 Broken Access Control
Mitigations include:

Strict access enforcement at the service level
Clearly defined roles and elevation paths
- A02 Cryptographic Failures
Mitigations include:

Use strong encryption for all data. This includes external, internal, in transit, and at rest data.
Updating encryption algorithms as older algorithms become compromised.
Properly using cryptographic safeguards.

- A03
Mitigations include:

Sanitizing input
Use database prepared statements
Restricting execution rights
Limit output

- A04 Insecure Design
Mitigations include:

Integration testing
Strict access control
Security education
Security design pattern usages
Scenario reviews

- A05 Security Misconfiguration
Mitigations include:

Configuration reviews
Setting defaults to disable all access
Automated configuration audits
Requiring multiple layers of access for remote configuration

- A06 Vulnerable and Outdated Components
Mitigations include:

Keeping a manifest of your software stack including versions
Reviewing security bulletins
Regularly updating software
Required components to be up to date
Replacing unsupported software

- A07 Identification and Authentification Failures
Mitigations include:

Rate limiting requests
Properly managing credentials
Multifactor authentication
Authentication recovery

- A08
Mitigations include:

Only using trusted package repositories
Using your own private vetted repository
Audit all updates to third party packages and data sources

- A09
Mitigations include:

Real time log processing
Automated alerts for metric threshold violations
Periodic log reviews
Visual dashboards for key indicators

- A10 Server Side Request Forgery
Mitigations include:

Sanitizing returned data
Not returning data
Whitelisting accessible domains
Rejecting HTTP redirects

### Typescript
- an example of a React component using typescript
```
export class About extends React.Component {
  state: {
    imageUrl: string;
    quote: string;
    price: number;
  };

  constructor(props: { price: number }) {
    super(props);

    this.state = {
      imageUrl: '',
      quote: 'loading...',
      price: props.price,
    };
  }
}
```
- we can use interfaces for objects
```
interface Book {
  title: string;
  id: number;
}
```
- coercing type and null checking
```
const containerEl = document.querySelector<HTMLElement>('#picture');
if (containerEl) {
  const width = containerEl.offsetWidth;
}
```
- unions
```
type AuthState = 'unknown' | 'authenticated' | 'unauthenticated';

let auth: AuthState = 'authenticated';
```
```
function square(n: number | string) {
  if (typeof n === 'string') {
    console.log(`{$n}^2`);
  } else {
    console.log(n * n);
  }
}
```
### Performance Monitoring
- you can use a lot of tools to see how fast your website loads

### SEO
There are several factors that are major contributors to your search rank. These include:

Content
Authoritative links
Structure and organization
Metadata
Performance and usability



# Final Notes
- port 80 is reserved for HTTP, SSH is 22, 
- know useEffect in React and the sequence of outputs
- know mongodb query ex, and or case sensitive less than, etc, etc
- HTTP status codes in 300 are for content redirects or caching
- Content-Type, Host, Cookie, but not language are standard http headers
- cookies allow for a server to store data on the client
- What value does WebSocket add to HTTP? It is peer to peer instead of client to server
- JSX does not include CSS
- useEffect is triggered initially
- 
