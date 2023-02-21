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
