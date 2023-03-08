# startup
# Ski Website

**Elevator Pitch:**
The greatest thing on Earth just got better with the ultimate ski planning website! Stay on top of the latest powder alerts and conditions at your favorite resorts and even backcountry areas. Plus, everything you need to plan an iconic day of skiing including coordination with friends, polls for deciding where to go, and other functions from carpooling, setting available days, which passes you have, road conditions, and of course, powder alerts! Make the best days skiing with this ski website!

- provides basic ski resort information such as: 
    - weather
    - lift status
    - snowfall
    - forecast
    - base depth
- ability to set days off and get notifications for forecasts for your days and never miss a powder day again.
- **provides road condition updates**
    - ability to set time-sensitive notifications for road conditions
- ability to add friends which then allows for...
    - coordinating who has what days off and which passes
- create a group
    - add who is going
    - vote on where to go
    - vote on what time
    - coordinate carpooling

This [mock website](https://sites.google.com/view/skiwebsite/favorite-resorts?authuser=0) was created using Google Sites to get a basic layout and flow.
![Favorite Resorts Page](/assets/images/Resorts.png)
![Conditions Page](/assets/images/Conditions.png)
![Community Page](/assets/images/Community.png)
![Planning Page](/assets/images/Planning.png)



### Old Ideas 27 Jan 2023
Schedule Coordinator

- Find times that work for everyone

Date Planner
- Send link to friend
- Each person adds options on what to do or even when to do it
- It then chooses what's in agreement
- Helps makes people who can't make decisions make decisions
- Each persons account can store ideas 

Daily Accountability
- Make an account
- Create a list of questions to ask you each night
- Stores them and has the ability to export or download
- Set long and short term goals with intermediate steps and work towards them
- Add friends and keep each other accountable
    - have a privacy option on each question





# CS 260
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