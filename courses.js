// SkillHub courses data. 16 courses with 5 questions per quiz.
const COURSES = [
  {
    "id": "js",
    "t": "JavaScript Full Course (2025-26)",
    "cat": "Programming",
    "ic": "JS",
    "c": 0,
    "by": "Shradha Khapra",
    "v": [
      [
        "Lecture 1: Variables & Data Types",
        "ajdRvxDWH4w",
        [
          [
            "Which keyword declares a variable that can be reassigned?",
            [
              "let",
              "const",
              "final",
              "static"
            ],
            0
          ],
          [
            "Which of these is a primitive data type?",
            [
              "Array",
              "String",
              "Object",
              "Function"
            ],
            1
          ],
          [
            "typeof \"hello\" returns?",
            [
              "text",
              "char",
              "string",
              "word"
            ],
            2
          ],
          [
            "Which symbol is used for single-line comments in JS?",
            [
              "//",
              "/*",
              "#",
              "<!--"
            ],
            0
          ],
          [
            "What is the value of an uninitialized variable in JavaScript?",
            [
              "null",
              "0",
              "undefined",
              "NaN"
            ],
            2
          ]
        ]
      ],
      [
        "Lecture 2: Operators & Conditional Statements",
        "Zg4-uSjxosE",
        [
          [
            "=== compares...",
            [
              "Value only",
              "Type only",
              "Memory address only",
              "Value and type"
            ],
            3
          ],
          [
            "Which block runs when the if condition is false?",
            [
              "else",
              "then",
              "otherwise",
              "elseif only"
            ],
            0
          ],
          [
            "5 % 2 gives?",
            [
              "2.5",
              "1",
              "0",
              "2"
            ],
            1
          ],
          [
            "Which logical operator represents 'AND' in JavaScript?",
            [
              "&",
              "and",
              "&&",
              "||"
            ],
            2
          ],
          [
            "What does the ternary operator (? :) do?",
            [
              "Short-hand if/else statement",
              "Multiplication",
              "Array slicing",
              "Type casting"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 3: Loops & Strings",
        "UmRtFFSDSFo",
        [
          [
            "Which loop is typically used for a fixed number of repeats?",
            [
              "if",
              "switch",
              "for",
              "try"
            ],
            2
          ],
          [
            "\"hello\".length returns?",
            [
              "4",
              "6",
              "undefined",
              "5"
            ],
            3
          ],
          [
            "Which keyword exits a loop early?",
            [
              "break",
              "stop",
              "exit",
              "end"
            ],
            0
          ],
          [
            "Which loop always executes at least once?",
            [
              "for",
              "while",
              "do...while",
              "forEach"
            ],
            2
          ],
          [
            "Strings in JavaScript are...",
            [
              "Mutable",
              "Immutable",
              "Objects only",
              "Arrays"
            ],
            1
          ]
        ]
      ],
      [
        "Lecture 4: Arrays",
        "gFWhbjzowrM",
        [
          [
            "Add an item to the end of an array?",
            [
              "pop()",
              "push()",
              "shift()",
              "add()"
            ],
            1
          ],
          [
            "Index of the first element?",
            [
              "1",
              "-1",
              "0",
              "first"
            ],
            2
          ],
          [
            "Which method runs a function for every item?",
            [
              "each()",
              "loop()",
              "iterate()",
              "forEach()"
            ],
            3
          ],
          [
            "Remove the last item from an array with?",
            [
              "pop()",
              "push()",
              "shift()",
              "unshift()"
            ],
            0
          ],
          [
            "Which array method returns a newly filtered array?",
            [
              "filter()",
              "find()",
              "slice()",
              "map()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: Functions & Methods",
        "P0XMXqDGttU",
        [
          [
            "Arrow function syntax?",
            [
              "() => {}",
              "-> {}",
              "func => {}",
              "=> () {}"
            ],
            0
          ],
          [
            "A function sends a value back using?",
            [
              "send",
              "return",
              "output",
              "give"
            ],
            1
          ],
          [
            "A function stored inside an object is called a...",
            [
              "Class",
              "Loop",
              "Method",
              "Module"
            ],
            2
          ],
          [
            "Parameters passed into a function definition are called?",
            [
              "Arguments",
              "Parameters",
              "Variables",
              "Keys"
            ],
            1
          ],
          [
            "What is a higher-order function?",
            [
              "A function taking or returning another function",
              "A math function",
              "An async function only",
              "A class constructor"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: DOM (Part 1)",
        "7zcXPCt8Ck0",
        [
          [
            "DOM stands for?",
            [
              "Data Object Mode",
              "Display Object Map",
              "Document Order Model",
              "Document Object Model"
            ],
            3
          ],
          [
            "Select an element by its id?",
            [
              "document.getElementById()",
              "document.id()",
              "document.find()",
              "document.select()"
            ],
            0
          ],
          [
            "Which property changes an element's text?",
            [
              "setText",
              "innerText",
              "textOnly",
              "contentName"
            ],
            1
          ],
          [
            "Which method selects the first element matching a CSS selector?",
            [
              "document.querySelector()",
              "document.selectOne()",
              "document.css()",
              "document.find()"
            ],
            0
          ],
          [
            "Which property returns HTML content inside an element?",
            [
              "innerHTML",
              "outerText",
              "textContentOnly",
              "htmlBody"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: DOM (Part 2)",
        "fXAGTOZ25H8",
        [
          [
            "Change an element's style from JS?",
            [
              "element.css",
              "element.design",
              "element.style",
              "element.looks"
            ],
            2
          ],
          [
            "Add a CSS class to an element?",
            [
              "addClass()",
              "class.push()",
              "setClass()",
              "classList.add()"
            ],
            3
          ],
          [
            "Create a new HTML element?",
            [
              "document.createElement()",
              "document.newElement()",
              "document.make()",
              "document.add()"
            ],
            0
          ],
          [
            "Add an element as a child inside another element?",
            [
              "appendChild()",
              "insertChild()",
              "add()",
              "pushElement()"
            ],
            0
          ],
          [
            "Remove an element from the DOM with?",
            [
              "element.remove()",
              "element.delete()",
              "document.drop()",
              "element.clear()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 8: Events in JavaScript",
        "_i-uLJAh79U",
        [
          [
            "Attach an event handler with?",
            [
              "listen()",
              "addEventListener()",
              "onEvent()",
              "attachOnly()"
            ],
            1
          ],
          [
            "Which event fires on a mouse click?",
            [
              "press",
              "tap",
              "click",
              "hit"
            ],
            2
          ],
          [
            "event.target refers to?",
            [
              "The window",
              "The server",
              "The previous event",
              "The element that triggered the event"
            ],
            3
          ],
          [
            "Prevent default form submission behavior with?",
            [
              "event.preventDefault()",
              "event.stop()",
              "event.halt()",
              "event.cancel()"
            ],
            0
          ],
          [
            "Which event fires when an input value changes?",
            [
              "modify",
              "input",
              "write",
              "type"
            ],
            1
          ]
        ]
      ],
      [
        "Lecture 9: Tic Tac Toe Game (Project)",
        "SqrppLEljkY",
        [
          [
            "A tic tac toe win is checked by comparing...",
            [
              "Winning patterns of cell positions",
              "Random numbers",
              "Cookies",
              "CSS colors"
            ],
            0
          ],
          [
            "Turns can be alternated using...",
            [
              "Reloading the page",
              "A boolean toggle variable",
              "setTimeout only",
              "A random number"
            ],
            1
          ],
          [
            "Stop a button being clicked again with?",
            [
              "button.hidden = false",
              "button.stop()",
              "button.disabled = true",
              "button.remove = 1"
            ],
            2
          ],
          [
            "Which structure best stores 8 winning patterns?",
            [
              "2D Array",
              "Boolean",
              "Number",
              "HTML tag"
            ],
            0
          ],
          [
            "To reset the game board, we should...",
            [
              "Clear button text and re-enable clicks",
              "Close browser",
              "Delete DOM tree",
              "Throw an error"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 10: Stone, Paper & Scissors (Mini Project)",
        "_V33HCZWLDQ",
        [
          [
            "The computer's random choice uses?",
            [
              "Math.pick()",
              "random()",
              "Date.now() only",
              "Math.random()"
            ],
            3
          ],
          [
            "Math.floor(Math.random()*3) gives?",
            [
              "0, 1 or 2",
              "1, 2 or 3",
              "0 to 3 including 3",
              "A decimal between 0 and 3"
            ],
            0
          ],
          [
            "Winner is decided using?",
            [
              "CSS only",
              "if / else conditions",
              "HTML tags",
              "localStorage only"
            ],
            1
          ],
          [
            "Which method rounds a floating number down?",
            [
              "Math.floor()",
              "Math.ceil()",
              "Math.round()",
              "Math.abs()"
            ],
            0
          ],
          [
            "To store student score between page reloads, use?",
            [
              "localStorage",
              "Session variables",
              "CSS variables",
              "var keyword"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 11: Classes & Objects",
        "N-O4w6PynGY",
        [
          [
            "Create an object from a class with?",
            [
              "create",
              "make",
              "new",
              "build"
            ],
            2
          ],
          [
            "Which special method runs when an object is created?",
            [
              "init",
              "start",
              "build",
              "constructor"
            ],
            3
          ],
          [
            "Inherit from another class using?",
            [
              "extends",
              "inherits",
              "implements",
              "child"
            ],
            0
          ],
          [
            "Access the parent class constructor with?",
            [
              "super()",
              "parent()",
              "base()",
              "this.parent()"
            ],
            0
          ],
          [
            "The 'this' keyword inside an object method refers to...",
            [
              "The object itself",
              "The window object always",
              "The script tag",
              "The browser DOM"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 12: Callbacks, Promises & Async Await",
        "d3jXofmQm44",
        [
          [
            "A Promise can be in which states?",
            [
              "start, run, end",
              "pending, fulfilled, rejected",
              "open, close, wait",
              "new, old, done"
            ],
            1
          ],
          [
            "await can be used inside?",
            [
              "Any function",
              "Only loops",
              "An async function",
              "Only classes"
            ],
            2
          ],
          [
            "A callback is...",
            [
              "A loop",
              "A variable type",
              "A CSS rule",
              "A function passed into another function"
            ],
            3
          ],
          [
            "Handle rejected Promise errors using?",
            [
              ".catch() or try/catch",
              ".fail()",
              "onError() only",
              "return null"
            ],
            0
          ],
          [
            "Which function delays execution in JS?",
            [
              "setTimeout()",
              "delay()",
              "sleep()",
              "wait()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 13: Fetch API with Project",
        "CyGodpqcid4",
        [
          [
            "fetch() returns?",
            [
              "A Promise",
              "A string",
              "An array",
              "Nothing"
            ],
            0
          ],
          [
            "Convert a response to JSON with?",
            [
              "response.parse()",
              "response.json()",
              "JSON.get()",
              "response.toJSON"
            ],
            1
          ],
          [
            "API data usually comes in which format?",
            [
              "EXE",
              "PNG",
              "JSON",
              "MP3"
            ],
            2
          ],
          [
            "Which HTTP method is default in fetch()?",
            [
              "GET",
              "POST",
              "PUT",
              "DELETE"
            ],
            0
          ],
          [
            "JSON stands for?",
            [
              "JavaScript Object Notation",
              "Java System Online Node",
              "Java Server Output Name",
              "JS Over Network"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "py",
    "t": "Python Full Course (2026)",
    "cat": "Programming",
    "ic": "Py",
    "c": 1,
    "by": "Shradha Khapra",
    "v": [
      [
        "Lecture 1: Variables & Data Types",
        "t2_Q2BRzeEE",
        [
          [
            "Which is a valid Python variable name?",
            [
              "my_var",
              "2var",
              "my-var",
              "my var"
            ],
            0
          ],
          [
            "type(5.5) is?",
            [
              "int",
              "float",
              "str",
              "double"
            ],
            1
          ],
          [
            "Python is...",
            [
              "Statically typed only",
              "Compiled only",
              "Dynamically typed",
              "Not case-sensitive"
            ],
            2
          ],
          [
            "Which function displays output to the screen?",
            [
              "print()",
              "echo()",
              "console.log()",
              "display()"
            ],
            0
          ],
          [
            "Which character is used for single-line comments in Python?",
            [
              "#",
              "//",
              "/*",
              "--"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 2: Strings & Conditional Statements",
        "lIId8IDP6TU",
        [
          [
            "Which keyword means 'else if' in Python?",
            [
              "else if",
              "elseif",
              "elsif",
              "elif"
            ],
            3
          ],
          [
            "\"Python\"[0] gives?",
            [
              "P",
              "y",
              "n",
              "Error"
            ],
            0
          ],
          [
            "Which operator checks equality?",
            [
              "=",
              "==",
              "!==",
              "=>"
            ],
            1
          ],
          [
            "Which method converts string to uppercase in Python?",
            [
              "upper()",
              "toUpperCase()",
              "toUpper()",
              "capital()"
            ],
            0
          ],
          [
            "What does len(\"Code\") return?",
            [
              "3",
              "4",
              "5",
              "0"
            ],
            1
          ]
        ]
      ],
      [
        "Lecture 3: List & Tuple",
        "qVyvmzFxF_o",
        [
          [
            "Which of these is immutable?",
            [
              "List",
              "Dictionary",
              "Tuple",
              "Set"
            ],
            2
          ],
          [
            "Add an item to the end of a list?",
            [
              "add()",
              "push()",
              "insert_end()",
              "append()"
            ],
            3
          ],
          [
            "Create a tuple with?",
            [
              "(1, 2, 3)",
              "[1, 2, 3]",
              "{1, 2, 3}",
              "<1, 2, 3>"
            ],
            0
          ],
          [
            "Remove an item by value from list?",
            [
              "remove()",
              "pop()",
              "del()",
              "discard()"
            ],
            0
          ],
          [
            "Access the last element of a list using index?",
            [
              "[-1]",
              "[last]",
              "[len]",
              "[0]"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 4: Dictionary & Set",
        "078tYSD7K8E",
        [
          [
            "A dictionary stores data as?",
            [
              "Only values",
              "Key-value pairs",
              "Only keys",
              "Indexed items only"
            ],
            1
          ],
          [
            "A set does not allow?",
            [
              "Numbers",
              "Strings",
              "Duplicate values",
              "Booleans"
            ],
            2
          ],
          [
            "Get a value from a dict by key safely?",
            [
              "dict.get('key')",
              "dict(key)",
              "dict<key>",
              "dict.val('key')"
            ],
            0
          ],
          [
            "Sets are enclosed in which brackets?",
            [
              "Curly braces {}",
              "Square brackets []",
              "Parentheses ()",
              "Angle brackets <>"
            ],
            0
          ],
          [
            "Clear all items from a dictionary with?",
            [
              "dict.clear()",
              "dict.delete()",
              "dict.empty()",
              "dict.remove()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: Loops (While & For)",
        "S73thl0AyFU",
        [
          [
            "Which loop repeats while a condition is true?",
            [
              "while",
              "repeat",
              "do",
              "loop"
            ],
            0
          ],
          [
            "range(3) produces?",
            [
              "1, 2, 3",
              "0, 1, 2",
              "0, 1, 2, 3",
              "3 only"
            ],
            1
          ],
          [
            "continue does what?",
            [
              "Exits the loop",
              "Stops the program",
              "Skips to the next iteration",
              "Restarts the loop"
            ],
            2
          ],
          [
            "Stop a loop completely with?",
            [
              "break",
              "stop",
              "exit",
              "halt"
            ],
            0
          ],
          [
            "range(1, 5) generates values up to?",
            [
              "4",
              "5",
              "6",
              "3"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: Functions & Recursion",
        "OvTH-7ESoRA",
        [
          [
            "Define a function with?",
            [
              "function",
              "fun",
              "define",
              "def"
            ],
            3
          ],
          [
            "Recursion means?",
            [
              "A function calling itself",
              "A loop",
              "A class",
              "A module"
            ],
            0
          ],
          [
            "A recursive function needs?",
            [
              "A for loop",
              "A base case",
              "A global variable",
              "A class"
            ],
            1
          ],
          [
            "Return multiple values from a function as a...",
            [
              "Tuple",
              "Error",
              "String only",
              "Integer only"
            ],
            0
          ],
          [
            "Default argument values are evaluated when?",
            [
              "When the function is defined",
              "Every function call",
              "At runtime only",
              "Never"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: File Input/Output",
        "jU0cndZziO0",
        [
          [
            "Open a file for reading?",
            [
              "read('file.txt')",
              "file('file.txt')",
              "open('file.txt', 'r')",
              "load('file.txt')"
            ],
            2
          ],
          [
            "Mode that overwrites a file while writing?",
            [
              "'r'",
              "'a'",
              "'e'",
              "'w'"
            ],
            3
          ],
          [
            "Safe way to open files with auto-closing?",
            [
              "with open(...) as f",
              "file.open()",
              "read.open()",
              "import open"
            ],
            0
          ],
          [
            "Which mode appends data to the end of a file?",
            [
              "'a'",
              "'w'",
              "'r'",
              "'x'"
            ],
            0
          ],
          [
            "Read all lines of a file into a list?",
            [
              "readlines()",
              "readall()",
              "getlines()",
              "fetch()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 8: OOPS (Classes & Objects)",
        "HeW-D6KpDwY",
        [
          [
            "Create a class with?",
            [
              "object",
              "class",
              "def",
              "struct"
            ],
            1
          ],
          [
            "Constructor method name in Python?",
            [
              "__new_obj__",
              "init",
              "__init__",
              "constructor"
            ],
            2
          ],
          [
            "self refers to?",
            [
              "The class name",
              "The module",
              "A global variable",
              "The current object instance"
            ],
            3
          ],
          [
            "Variables defined inside __init__ are...",
            [
              "Instance attributes",
              "Class variables",
              "Global constants",
              "Functions"
            ],
            0
          ],
          [
            "Instantiate a class Dog with?",
            [
              "my_dog = Dog()",
              "my_dog = new Dog()",
              "my_dog = Dog.create()",
              "my_dog = class Dog"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 9: OOPS Part 2 (Inheritance & Polymorphism)",
        "bAwmZVJeO5s",
        [
          [
            "Inheritance means?",
            [
              "A class takes features of another class",
              "Copying a file",
              "Looping",
              "Importing"
            ],
            0
          ],
          [
            "Call the parent class constructor with?",
            [
              "super().__init__()",
              "parent()",
              "base()",
              "self.parent()"
            ],
            0
          ],
          [
            "Method overriding means?",
            [
              "Deleting a method",
              "Renaming a class",
              "Child class redefines parent method",
              "Hiding a variable"
            ],
            2
          ],
          [
            "What is polymorphism in OOP?",
            [
              "Same method name performing different behaviors",
              "Multiple classes only",
              "Inheriting one class",
              "Encapsulation"
            ],
            0
          ],
          [
            "Private attributes in Python usually start with?",
            [
              "__ (double underscore)",
              "$ (dollar)",
              "# (hash)",
              "@ (at)"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "html",
    "t": "HTML Complete Course",
    "cat": "Web Development",
    "ic": "H5",
    "c": 2,
    "by": "Coder Army",
    "v": [
      [
        "#1 Introduction to HTML & Semantic Tags",
        "GkZN_-HMCJ8",
        [
          [
            "Which tag makes the largest heading?",
            [
              "<h6>",
              "<head>",
              "<title>",
              "<h1>"
            ],
            3
          ],
          [
            "Which attribute gives a link's destination?",
            [
              "href",
              "src",
              "link",
              "url"
            ],
            0
          ],
          [
            "Which tag displays an image?",
            [
              "<image>",
              "<img>",
              "<pic>",
              "<src>"
            ],
            1
          ],
          [
            "HTML stands for?",
            [
              "HyperText Markup Language",
              "HighText Machine Link",
              "Hyperlink Text Mark",
              "Home Tool Markup"
            ],
            0
          ],
          [
            "Which tag creates a paragraph?",
            [
              "<para>",
              "<p>",
              "<text>",
              "<pg>"
            ],
            1
          ]
        ]
      ],
      [
        "#2 Nested Lists & Tables",
        "AJ4E1zf5tQs",
        [
          [
            "Unordered list tag?",
            [
              "<ol>",
              "<li>",
              "<ul>",
              "<dl>"
            ],
            2
          ],
          [
            "Table row tag?",
            [
              "<td>",
              "<th>",
              "<row>",
              "<tr>"
            ],
            3
          ],
          [
            "Merge cells across columns with?",
            [
              "colspan",
              "rowspan",
              "merge",
              "span-col"
            ],
            0
          ],
          [
            "Ordered list tag for numbered items?",
            [
              "<ol>",
              "<ul>",
              "<nl>",
              "<list>"
            ],
            0
          ],
          [
            "Table header cell tag?",
            [
              "<th>",
              "<td>",
              "<thead>",
              "<tr>"
            ],
            0
          ]
        ]
      ],
      [
        "#3 File Path, Boilerplate, DIV, Class & ID",
        "k78lNSAB8VY",
        [
          [
            "Which tag holds page metadata?",
            [
              "<body>",
              "<head>",
              "<footer>",
              "<main>"
            ],
            1
          ],
          [
            "An id attribute must be...",
            [
              "Reused many times",
              "Always numeric",
              "Unique on the page",
              "Optional and identical"
            ],
            2
          ],
          [
            "Which attribute can be reused across many elements?",
            [
              "id",
              "name",
              "key",
              "class"
            ],
            3
          ],
          [
            "Which declaration tells browser the HTML version?",
            [
              "<!DOCTYPE html>",
              "<html 5>",
              "<doctype>",
              "<version 5>"
            ],
            0
          ],
          [
            "Generic container for styling blocks of content?",
            [
              "<div>",
              "<section>",
              "<container>",
              "<box>"
            ],
            0
          ]
        ]
      ],
      [
        "#4 HTML Forms & Input Types",
        "a4j9R_DvZ8M",
        [
          [
            "Tag to create a user input form?",
            [
              "<form>",
              "<input>",
              "<fieldset>",
              "<submit>"
            ],
            0
          ],
          [
            "Input type for entering masked passwords?",
            [
              "secret",
              "password",
              "hidden",
              "text-mask"
            ],
            1
          ],
          [
            "Attribute that makes a field mandatory?",
            [
              "mandatory",
              "needed",
              "required",
              "must"
            ],
            2
          ],
          [
            "Input type for selecting multiple options?",
            [
              "checkbox",
              "radio",
              "dropdown",
              "button"
            ],
            0
          ],
          [
            "Which tag provides a multi-line text input?",
            [
              "<textarea>",
              "<input type='multiline'>",
              "<textbox>",
              "<text>"
            ],
            0
          ]
        ]
      ],
      [
        "#5 Audio, Video & Semantic Layout",
        "NGYp1zCBthk",
        [
          [
            "Embed a video file with which HTML5 tag?",
            [
              "<movie>",
              "<media-play>",
              "<film>",
              "<video>"
            ],
            3
          ],
          [
            "Link to another page of your site?",
            [
              "<a href=\"page.html\">",
              "<link page.html>",
              "<go page.html>",
              "<page>"
            ],
            0
          ],
          [
            "Tag for audio files?",
            [
              "<sound>",
              "<audio>",
              "<mp3>",
              "<music>"
            ],
            1
          ],
          [
            "Semantic tag for the navigation bar?",
            [
              "<nav>",
              "<menu>",
              "<navbar>",
              "<header>"
            ],
            0
          ],
          [
            "Semantic tag for the bottom footer area?",
            [
              "<footer>",
              "<bottom>",
              "<end>",
              "<foot>"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "css",
    "t": "CSS Complete Course",
    "cat": "Web Development",
    "ic": "CSS",
    "c": 3,
    "by": "Coder Army",
    "v": [
      [
        "#1 What is CSS (Inline, Internal & External)",
        "7rrUVevoECg",
        [
          [
            "CSS stands for?",
            [
              "Creative Style Sheets",
              "Computer Style Sheets",
              "Cascading Style Sheets",
              "Colorful Style System"
            ],
            2
          ],
          [
            "Link an external CSS file with?",
            [
              "<style src>",
              "<css>",
              "<script>",
              "<link>"
            ],
            3
          ],
          [
            "Which style normally wins highest priority on an element?",
            [
              "Inline",
              "External",
              "Internal",
              "Browser default"
            ],
            0
          ],
          [
            "CSS comments are written as?",
            [
              "/* comment */",
              "// comment",
              "<!-- comment -->",
              "# comment"
            ],
            0
          ],
          [
            "Select an element with id 'header' in CSS with?",
            [
              "#header",
              ".header",
              "header",
              "*header"
            ],
            0
          ]
        ]
      ],
      [
        "#2 Box Model & Display Property",
        "MluY-_FUxFI",
        [
          [
            "Space outside the border?",
            [
              "padding",
              "margin",
              "border",
              "content"
            ],
            1
          ],
          [
            "Space between content and border?",
            [
              "margin",
              "border",
              "padding",
              "display"
            ],
            2
          ],
          [
            "Which display takes full available width?",
            [
              "inline",
              "inline-block",
              "none",
              "block"
            ],
            3
          ],
          [
            "Include padding and border in element total width with?",
            [
              "box-sizing: border-box",
              "box-sizing: content-box",
              "width: auto",
              "box-fit"
            ],
            0
          ],
          [
            "Hide an element completely without taking layout space?",
            [
              "display: none",
              "visibility: hidden",
              "opacity: 0",
              "hidden: true"
            ],
            0
          ]
        ]
      ],
      [
        "#3 Positioning & Z-Index",
        "HwvOyrPDqhM",
        [
          [
            "Default position value?",
            [
              "static",
              "relative",
              "absolute",
              "fixed"
            ],
            0
          ],
          [
            "Which position stays fixed to the viewport when scrolling?",
            [
              "static",
              "fixed",
              "relative",
              "sticky"
            ],
            1
          ],
          [
            "Which position is placed relative to nearest positioned ancestor?",
            [
              "static",
              "relative",
              "absolute",
              "inherit"
            ],
            2
          ],
          [
            "Control stacking order of overlapping elements with?",
            [
              "z-index",
              "stack-level",
              "layer-order",
              "depth"
            ],
            0
          ],
          [
            "Position that acts relative until scroll threshold is reached?",
            [
              "sticky",
              "fixed",
              "absolute",
              "float"
            ],
            0
          ]
        ]
      ],
      [
        "#4 Flexbox Deep Dive",
        "KD5mNp8PTko",
        [
          [
            "Enable flexbox with?",
            [
              "flex: on",
              "layout: flex",
              "position: flex",
              "display: flex"
            ],
            3
          ],
          [
            "Center items along the main axis?",
            [
              "justify-content: center",
              "align-text: center",
              "flex-center",
              "center-main"
            ],
            0
          ],
          [
            "Change the direction of flex items to vertical?",
            [
              "flex-direction: column",
              "flex-turn: vertical",
              "direction: down",
              "flex-flow: col"
            ],
            0
          ],
          [
            "Align items along the cross axis with?",
            [
              "align-items",
              "justify-items",
              "cross-align",
              "vertical-align"
            ],
            0
          ],
          [
            "Allow flex items to wrap to next line with?",
            [
              "flex-wrap: wrap",
              "wrap: true",
              "flex-flow: wrap-all",
              "line-wrap: on"
            ],
            0
          ]
        ]
      ],
      [
        "#5 CSS Grid for 2D Layouts",
        "dn3q4iLCmrA",
        [
          [
            "Enable grid with?",
            [
              "grid: on",
              "layout: grid",
              "display: grid",
              "position: grid"
            ],
            2
          ],
          [
            "Define grid columns with?",
            [
              "grid-template-columns",
              "columns-grid",
              "grid-cols",
              "column-count"
            ],
            0
          ],
          [
            "Space between grid items?",
            [
              "gap",
              "space-between",
              "margin-grid",
              "grid-space"
            ],
            0
          ],
          [
            "Unit representing a fraction of available space in CSS Grid?",
            [
              "fr",
              "fx",
              "pct",
              "gr"
            ],
            0
          ],
          [
            "Create responsive columns automatically with?",
            [
              "repeat(auto-fit, minmax(...))",
              "auto-columns: on",
              "grid-auto: 100%",
              "flex: auto"
            ],
            0
          ]
        ]
      ],
      [
        "#6 Responsive Design & Media Queries",
        "Xv-gTGw4i_Y",
        [
          [
            "Media queries are used to?",
            [
              "Play videos",
              "Apply styles based on screen conditions",
              "Load images",
              "Add animations"
            ],
            1
          ],
          [
            "Show scrollbars when content overflows?",
            [
              "scroll: on",
              "clip: auto",
              "overflow: auto",
              "overflow-set"
            ],
            2
          ],
          [
            "Add a shadow to a box?",
            [
              "shadow-box",
              "drop-box",
              "box-glow",
              "box-shadow"
            ],
            3
          ],
          [
            "CSS unit relative to viewport width?",
            [
              "vw",
              "vh",
              "rem",
              "em"
            ],
            0
          ],
          [
            "CSS unit relative to root element font-size?",
            [
              "rem",
              "em",
              "px",
              "%"
            ],
            0
          ]
        ]
      ],
      [
        "#7 CSS Animations & Keyframes",
        "bOoNAPpBvpU",
        [
          [
            "Define animation steps with?",
            [
              "@keyframes",
              "@animate",
              "@frames",
              "@motion"
            ],
            0
          ],
          [
            "Set how long an animation runs?",
            [
              "animation-duration",
              "animation-time",
              "duration-anim",
              "anim-length"
            ],
            0
          ],
          [
            "Repeat an animation infinitely with?",
            [
              "animation-iteration-count: infinite",
              "repeat: forever",
              "loop: on",
              "cycle: endless"
            ],
            0
          ],
          [
            "Control acceleration curve of an animation?",
            [
              "animation-timing-function",
              "animation-speed",
              "ease-curve",
              "anim-pace"
            ],
            0
          ],
          [
            "Delay before an animation begins?",
            [
              "animation-delay",
              "animation-pause",
              "wait-time",
              "start-delay"
            ],
            0
          ]
        ]
      ],
      [
        "#8 Transitions & 2D/3D Transforms",
        "JkN5b646ll0",
        [
          [
            "Smooth change between two states?",
            [
              "transform",
              "fade",
              "switch",
              "transition"
            ],
            3
          ],
          [
            "Rotate an element with?",
            [
              "transform: rotate()",
              "rotate: spin()",
              "turn()",
              "transition: rotate"
            ],
            0
          ],
          [
            "Make an element bigger or smaller with?",
            [
              "transform: scale()",
              "size()",
              "zoom: scale",
              "transition: scale"
            ],
            0
          ],
          [
            "Move an element along X and Y axes with?",
            [
              "transform: translate()",
              "move()",
              "shift()",
              "offset()"
            ],
            0
          ],
          [
            "Specify duration for CSS transitions?",
            [
              "transition-duration",
              "transition-time",
              "duration",
              "fade-time"
            ],
            0
          ]
        ]
      ],
      [
        "#9 Complete Portfolio Project",
        "dMD8ceVzdQs",
        [
          [
            "Which tag groups main parts of a page?",
            [
              "<section>",
              "<br>",
              "<title>",
              "<meta>"
            ],
            0
          ],
          [
            "Which property makes an image fit its box without distorting?",
            [
              "object-fit: cover",
              "image-fit",
              "fit-image",
              "scale-fit"
            ],
            0
          ],
          [
            "Custom CSS variables are defined with prefix?",
            [
              "-- (two dashes)",
              "$ (dollar)",
              "@ (at)",
              "# (hash)"
            ],
            0
          ],
          [
            "Access a CSS variable with?",
            [
              "var(--name)",
              "val(--name)",
              "get(--name)",
              "css(--name)"
            ],
            0
          ],
          [
            "Create blurred frosted glass backdrop effect with?",
            [
              "backdrop-filter: blur()",
              "filter: glass()",
              "blur-bg: on",
              "glassmorphism: true"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "c",
    "t": "C Programming Complete Course",
    "cat": "Programming",
    "ic": "C",
    "c": 4,
    "by": "CodeWithHarry",
    "v": [
      [
        "Lecture 1: Why Learn C & Introduction",
        "7Dh73z3icd8",
        [
          [
            "Who developed the C programming language?",
            [
              "Dennis Ritchie",
              "Bjarne Stroustrup",
              "James Gosling",
              "Guido van Rossum"
            ],
            0
          ],
          [
            "In which laboratory was C developed?",
            [
              "Bell Laboratories",
              "MIT Media Lab",
              "Xerox PARC",
              "Stanford AI Lab"
            ],
            0
          ],
          [
            "What type of programming language is C?",
            [
              "Procedural / Structured Language",
              "Pure Object-Oriented",
              "Functional only",
              "Markup Language"
            ],
            0
          ],
          [
            "Which operating system was originally rewritten in C?",
            [
              "UNIX",
              "Windows 95",
              "DOS",
              "Android"
            ],
            0
          ],
          [
            "File extension for C source code files?",
            [
              ".c",
              ".cpp",
              ".cs",
              ".h"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 2: Basic Structure & Syntax of C",
        "5SIBB589fAg",
        [
          [
            "Which function is the starting entry point in any C program?",
            [
              "main()",
              "start()",
              "run()",
              "init()"
            ],
            0
          ],
          [
            "Which header file is required for printf and scanf?",
            [
              "<stdio.h>",
              "<conio.h>",
              "<stdlib.h>",
              "<math.h>"
            ],
            0
          ],
          [
            "Standard function used to print output to the console?",
            [
              "printf()",
              "cout",
              "print()",
              "System.out.print()"
            ],
            0
          ],
          [
            "Every C statement must terminate with which character?",
            [
              "; (semicolon)",
              ": (colon)",
              ". (period)",
              "} (curly brace)"
            ],
            0
          ],
          [
            "Escape sequence used to insert a newline in output?",
            [
              "\\n",
              "\\t",
              "\\r",
              "\\b"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 3: Variables & Data Types in C",
        "EcUGDTs4RyY",
        [
          [
            "Which keyword represents an integer data type in C?",
            [
              "int",
              "num",
              "integer",
              "number"
            ],
            0
          ],
          [
            "Format specifier used to print an integer in printf?",
            [
              "%d",
              "%f",
              "%c",
              "%s"
            ],
            0
          ],
          [
            "Size of a standard float in C is typically?",
            [
              "4 bytes",
              "1 byte",
              "2 bytes",
              "8 bytes"
            ],
            0
          ],
          [
            "Which of these is NOT a valid C variable name?",
            [
              "2my_var",
              "my_var2",
              "_var",
              "myVar"
            ],
            0
          ],
          [
            "Format specifier for single character data type char?",
            [
              "%c",
              "%s",
              "%d",
              "%char"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 4: Operators in C",
        "V4Wwuu05_t4",
        [
          [
            "Which operator returns the remainder of integer division in C?",
            [
              "% (modulus)",
              "/",
              "//",
              "&"
            ],
            0
          ],
          [
            "Which operator checks for equality?",
            [
              "==",
              "=",
              "===",
              "eq"
            ],
            0
          ],
          [
            "What is the logical AND operator in C?",
            [
              "&&",
              "&",
              "and",
              "||"
            ],
            0
          ],
          [
            "Unary operator used to increment a variable value by 1?",
            [
              "++",
              "+=",
              "--",
              "+1"
            ],
            0
          ],
          [
            "What is the ternary conditional operator syntax?",
            [
              "condition ? expr1 : expr2",
              "if condition then expr1",
              "condition -> expr1",
              "expr1 : condition ? expr2"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: If-Else Control Statements",
        "D0ACZ0uU_2g",
        [
          [
            "Which statement executes when the if condition evaluates to false?",
            [
              "else",
              "then",
              "switch",
              "elseif"
            ],
            0
          ],
          [
            "In C, which numerical value represents false in conditional checks?",
            [
              "0",
              "1",
              "-1",
              "null"
            ],
            0
          ],
          [
            "Chain multiple conditions together using?",
            [
              "else if",
              "elif",
              "otherwise",
              "then if"
            ],
            0
          ],
          [
            "In C, any non-zero integer in a conditional check evaluates to?",
            [
              "True",
              "False",
              "Error",
              "Undefined"
            ],
            0
          ],
          [
            "Which structure selects one of many code blocks to be executed based on integral constant?",
            [
              "switch statement",
              "while loop",
              "for loop",
              "goto"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: Loops in C (While, Do-While, For)",
        "A_IgufxmIHk",
        [
          [
            "Which loop checks the condition after executing the body at least once?",
            [
              "do-while loop",
              "while loop",
              "for loop",
              "foreach loop"
            ],
            0
          ],
          [
            "Which keyword exits a loop immediately?",
            [
              "break",
              "continue",
              "exit",
              "return"
            ],
            0
          ],
          [
            "Which keyword skips the rest of current loop iteration and moves to next?",
            [
              "continue",
              "break",
              "skip",
              "pass"
            ],
            0
          ],
          [
            "Structure of a for loop header in C?",
            [
              "for (initialization; condition; increment/decrement)",
              "for (condition; init; step)",
              "for (init, step, condition)",
              "for (step; condition)"
            ],
            0
          ],
          [
            "Create an infinite while loop using which condition?",
            [
              "while(1)",
              "while(0)",
              "while(false)",
              "while(-0)"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: Functions in C",
        "CSJLuARmzg0",
        [
          [
            "Declaring a function before main() is called a...",
            [
              "Function Prototype / Declaration",
              "Function Definition",
              "Function Call",
              "Macro"
            ],
            0
          ],
          [
            "Return type of a function that returns no value?",
            [
              "void",
              "null",
              "empty",
              "int"
            ],
            0
          ],
          [
            "Parameters passed into function during definition are called?",
            [
              "Formal Parameters",
              "Actual Arguments",
              "Pointers",
              "Global variables"
            ],
            0
          ],
          [
            "A function calling itself directly or indirectly is termed?",
            [
              "Recursion",
              "Iteration",
              "Looping",
              "Cloning"
            ],
            0
          ],
          [
            "Keyword used to return a computed value back to the caller?",
            [
              "return",
              "send",
              "yield",
              "output"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 8: Arrays in C",
        "qKFBtCPwjgI",
        [
          [
            "First element in a C array has which index?",
            [
              "0",
              "1",
              "-1",
              "first"
            ],
            0
          ],
          [
            "An array in C stores elements of...",
            [
              "Same data type in contiguous memory locations",
              "Any mixed data types",
              "Pointers only",
              "Dynamic keys"
            ],
            0
          ],
          [
            "Declare an integer array of size 5 in C?",
            [
              "int arr[5];",
              "array arr(5);",
              "int arr = [5];",
              "arr int[5];"
            ],
            0
          ],
          [
            "Index of the last element in an array of size N?",
            [
              "N - 1",
              "N",
              "N + 1",
              "0"
            ],
            0
          ],
          [
            "Can a standard static C array be resized after declaration?",
            [
              "No, size is fixed at compile time",
              "Yes, using arr.resize()",
              "Yes, with push()",
              "Yes, always"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 9: Pointers in C",
        "IBjGjDbwxSg",
        [
          [
            "What does a pointer variable store?",
            [
              "The memory address of another variable",
              "The value directly",
              "A float only",
              "A string"
            ],
            0
          ],
          [
            "Operator used to get the memory address of a variable?",
            [
              "& (address-of operator)",
              "*",
              "->",
              "%"
            ],
            0
          ],
          [
            "Dereference operator used to access value stored at pointer's address?",
            [
              "* (indirection operator)",
              "&",
              "->",
              "#"
            ],
            0
          ],
          [
            "A pointer initialized to point to no memory location is called?",
            [
              "NULL Pointer",
              "Dangling Pointer",
              "Wild Pointer",
              "Void Pointer"
            ],
            0
          ],
          [
            "Pointer arithmetic: ptr + 1 increments address by...",
            [
              "Size of the data type it points to",
              "1 bit always",
              "1 byte always",
              "4 bytes always"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 10: Strings in C",
        "fltaqGek-oA",
        [
          [
            "In C, a string is fundamentally...",
            [
              "A character array terminated by a null character '\\0'",
              "A built-in primitive type",
              "An object",
              "A class"
            ],
            0
          ],
          [
            "ASCII value of the null character '\\0'?",
            [
              "0",
              "32",
              "48",
              "65"
            ],
            0
          ],
          [
            "Header file containing string manipulation functions?",
            [
              "<string.h>",
              "<strings.h>",
              "<stdlib.h>",
              "<str.h>"
            ],
            0
          ],
          [
            "Function used to compute the length of a string in C?",
            [
              "strlen()",
              "sizeof()",
              "length()",
              "strcount()"
            ],
            0
          ],
          [
            "Function used to concatenate (join) two strings?",
            [
              "strcat()",
              "strcpy()",
              "strcmp()",
              "strjoin()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 11: Structures & Unions",
        "J464pe6ZTrE",
        [
          [
            "Keyword used to define a user-defined data type grouping different types?",
            [
              "struct",
              "union only",
              "class",
              "typedef only"
            ],
            0
          ],
          [
            "Access a structure member using which operator?",
            [
              ". (dot operator)",
              "->",
              "::",
              ":"
            ],
            0
          ],
          [
            "Access a structure member via a pointer to that structure?",
            [
              "-> (arrow operator)",
              ".",
              "::",
              "*."
            ],
            0
          ],
          [
            "Key difference between struct and union in C?",
            [
              "Union members share the same memory location; struct members each have separate memory",
              "Struct is smaller",
              "Union can only store integers",
              "No difference"
            ],
            0
          ],
          [
            "Keyword used to create an alias/alternative name for an existing data type?",
            [
              "typedef",
              "alias",
              "define",
              "rename"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 12: Dynamic Memory Allocation",
        "q8j8EqCZcWM",
        [
          [
            "Function to allocate uninitialized dynamic memory on the heap?",
            [
              "malloc()",
              "calloc()",
              "realloc()",
              "alloc()"
            ],
            0
          ],
          [
            "Function to allocate dynamic memory and initialize all bytes to zero?",
            [
              "calloc()",
              "malloc()",
              "zeroalloc()",
              "heapalloc()"
            ],
            0
          ],
          [
            "Function used to resize previously allocated heap memory?",
            [
              "realloc()",
              "resize()",
              "remalloc()",
              "modify()"
            ],
            0
          ],
          [
            "Function that releases allocated heap memory back to the operating system?",
            [
              "free()",
              "delete",
              "clear()",
              "release()"
            ],
            0
          ],
          [
            "What happens if allocated heap memory is never freed?",
            [
              "Memory Leak",
              "Segmentation Fault immediately",
              "CPU overload",
              "Kernel crash"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "java",
    "t": "Java Placement Full Course",
    "cat": "Programming",
    "ic": "Jv",
    "c": 5,
    "by": "Shradha Khapra (Apna College)",
    "v": [
      [
        "Lecture 1: Introduction to Java Language",
        "yRpLlJmRo2w",
        [
          [
            "Java code is compiled into which format?",
            [
              "Bytecode (.class files)",
              "Machine code directly",
              "Assembly language",
              "JavaScript"
            ],
            0
          ],
          [
            "Which component executes Java Bytecode?",
            [
              "JVM (Java Virtual Machine)",
              "JDK",
              "OS directly",
              "Browser"
            ],
            0
          ],
          [
            "Java's famous portability slogan is?",
            [
              "Write Once, Run Anywhere (WORA)",
              "Compile Fast, Run Slow",
              "Code everywhere",
              "Run once, write often"
            ],
            0
          ],
          [
            "What does JDK stand for?",
            [
              "Java Development Kit",
              "Java Device Kernel",
              "Java Deployment Key",
              "Java Database Kit"
            ],
            0
          ],
          [
            "Which tool is responsible for compiling .java source files to .class?",
            [
              "javac",
              "java",
              "javap",
              "javadoc"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 2: Variables & Input/Output",
        "LusTv0RlnSU",
        [
          [
            "Which class is commonly used to take console input from the user?",
            [
              "Scanner",
              "ConsoleReader",
              "Input",
              "Reader"
            ],
            0
          ],
          [
            "Method in Scanner class used to read an integer from console?",
            [
              "nextInt()",
              "readInt()",
              "getInt()",
              "inputInt()"
            ],
            0
          ],
          [
            "Size of primitive int in Java is?",
            [
              "4 bytes (32 bits)",
              "2 bytes",
              "8 bytes",
              "1 byte"
            ],
            0
          ],
          [
            "Which data type stores true or false values in Java?",
            [
              "boolean",
              "bool",
              "Boolean only",
              "bit"
            ],
            0
          ],
          [
            "Standard statement to print text on a new line in Java?",
            [
              "System.out.println()",
              "System.print()",
              "out.println()",
              "console.log()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 3: Conditional Statements (If-Else & Switch)",
        "I5srDu75h_M",
        [
          [
            "In Java, can an integer (like 1 or 0) be used directly as a boolean condition?",
            [
              "No, Java requires a strictly boolean expression",
              "Yes, 1 is true and 0 is false",
              "Only in while loops",
              "Yes, always"
            ],
            0
          ],
          [
            "Keyword used to terminate a switch case block?",
            [
              "break",
              "exit",
              "stop",
              "continue"
            ],
            0
          ],
          [
            "Which statement in switch runs when no case matches?",
            [
              "default:",
              "else:",
              "catch:",
              "otherwise:"
            ],
            0
          ],
          [
            "Can String objects be used in switch statements in Java 7+?",
            [
              "Yes, Strings are supported in switch",
              "No, only int and char",
              "Only enums",
              "Only with if-else"
            ],
            0
          ],
          [
            "Conditional operator (ternary) syntax in Java?",
            [
              "variable = (condition) ? value_if_true : value_if_false;",
              "if(cond, true, false)",
              "cond -> true : false",
              "choose(cond, true, false)"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 4: Loops in Java (For, While, Do-While)",
        "0r1SfRoLuzU",
        [
          [
            "Which loop evaluates its condition after executing the loop body?",
            [
              "do-while loop",
              "while loop",
              "for loop",
              "enhanced for"
            ],
            0
          ],
          [
            "Enhanced for loop in Java (for-each) syntax?",
            [
              "for (DataType item : collection)",
              "for (item in collection)",
              "foreach(item : collection)",
              "for (item of collection)"
            ],
            0
          ],
          [
            "Keyword that skips current loop iteration and proceeds to next?",
            [
              "continue",
              "skip",
              "pass",
              "next"
            ],
            0
          ],
          [
            "What is the output of for(int i=0; i<3; i++) { System.out.print(i); }?",
            [
              "012",
              "0123",
              "123",
              "3"
            ],
            0
          ],
          [
            "What happens if loop termination condition is never met?",
            [
              "Infinite loop",
              "StackOverflowError",
              "Compiler error",
              "Automatic termination"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: Functions & Methods in Java",
        "qcSz4ef9UHA",
        [
          [
            "In Java, a function defined inside a class is called a...",
            [
              "Method",
              "Procedure",
              "Routine",
              "Subroutine"
            ],
            0
          ],
          [
            "Method signature of the main method in Java?",
            [
              "public static void main(String[] args)",
              "void main(String[] args)",
              "public void main()",
              "static public int main()"
            ],
            0
          ],
          [
            "What is Method Overloading in Java?",
            [
              "Multiple methods in same class with same name but different parameter lists",
              "Subclass overriding parent method",
              "Methods with different return types only",
              "Renaming methods"
            ],
            0
          ],
          [
            "Java passes arguments to methods strictly by...",
            [
              "Pass-by-value always",
              "Pass-by-reference for objects",
              "Pass-by-name",
              "Pass-by-pointer"
            ],
            0
          ],
          [
            "Keyword indicating a method belongs to the class rather than instances?",
            [
              "static",
              "final",
              "public",
              "const"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: Arrays in Java",
        "NTHVTY6w2Co",
        [
          [
            "Declare and instantiate an integer array of size 10 in Java?",
            [
              "int[] arr = new int[10];",
              "int arr[10];",
              "int[] arr = int(10);",
              "Array arr = new Array(10);"
            ],
            0
          ],
          [
            "Property that returns the total length/size of an array?",
            [
              "arr.length",
              "arr.length()",
              "arr.size()",
              "arr.count"
            ],
            0
          ],
          [
            "Exception thrown when accessing an index outside array bounds?",
            [
              "ArrayIndexOutOfBoundsException",
              "IndexError",
              "ArrayOverflowException",
              "NullPointerException"
            ],
            0
          ],
          [
            "Default value of elements in a newly created int array in Java?",
            [
              "0",
              "null",
              "undefined",
              "garbage value"
            ],
            0
          ],
          [
            "Index of the first element in any Java array?",
            [
              "0",
              "1",
              "-1",
              "start"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: Strings & StringBuilder",
        "vCRD36bG8xQ",
        [
          [
            "Strings in Java are...",
            [
              "Immutable (cannot be modified after creation)",
              "Mutable",
              "Primitive data types",
              "Dynamic arrays"
            ],
            0
          ],
          [
            "Compare the character content of two Strings in Java with?",
            [
              "str1.equals(str2)",
              "str1 == str2",
              "str1.compare(str2) == true",
              "str1 === str2"
            ],
            0
          ],
          [
            "What does 'str1 == str2' check for Strings in Java?",
            [
              "Whether both references point to the exact same object in memory",
              "Whether contents are equal",
              "Length equality",
              "Alphabetical order"
            ],
            0
          ],
          [
            "Which class provides a mutable sequence of characters for efficient concatenation?",
            [
              "StringBuilder (or StringBuffer)",
              "StringHolder",
              "MutableString",
              "StringArray"
            ],
            0
          ],
          [
            "Special memory area inside the heap where string literals are cached?",
            [
              "String Constant Pool (SCP)",
              "Stack Memory",
              "MetaSpace",
              "Registers"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 8: Java OOPs (Classes, Objects, Inheritance)",
        "bSrm9RXwBaI",
        [
          [
            "Create a new object instance of class Student in Java with?",
            [
              "Student s = new Student();",
              "Student s = Student();",
              "Student s = create Student;",
              "new s = Student();"
            ],
            0
          ],
          [
            "Special method called automatically when an object is instantiated?",
            [
              "Constructor",
              "Initializer",
              "main()",
              "build()"
            ],
            0
          ],
          [
            "Subclass inherits from a parent superclass using which keyword?",
            [
              "extends",
              "implements",
              "inherits",
              "subclass"
            ],
            0
          ],
          [
            "Call the superclass constructor from subclass constructor with?",
            [
              "super()",
              "parent()",
              "base()",
              "this.parent()"
            ],
            0
          ],
          [
            "Keyword used to prevent variable modification, method overriding, or class inheritance?",
            [
              "final",
              "const",
              "static",
              "sealed"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 9: ArrayList & Collections Framework",
        "liFyhzZl9uw",
        [
          [
            "Resizible array implementation in Java Collections Framework?",
            [
              "ArrayList",
              "Array",
              "Vector only",
              "LinkedList only"
            ],
            0
          ],
          [
            "Add an element to an ArrayList with?",
            [
              "list.add(element)",
              "list.push(element)",
              "list.append(element)",
              "list.insert(element)"
            ],
            0
          ],
          [
            "Retrieve an element at index i from an ArrayList?",
            [
              "list.get(i)",
              "list[i]",
              "list.at(i)",
              "list.fetch(i)"
            ],
            0
          ],
          [
            "Collection interface that stores only unique elements with no duplicates?",
            [
              "Set (e.g. HashSet)",
              "List",
              "Queue",
              "Stack"
            ],
            0
          ],
          [
            "Key-value pair mapping data structure in java.util?",
            [
              "HashMap",
              "ArrayList",
              "HashSet",
              "TreeSet"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "cpp",
    "t": "C++ Complete Course",
    "cat": "Programming",
    "ic": "C++",
    "c": 6,
    "by": "Varun Singla (Gate Smashers)",
    "v": [
      [
        "Lecture 1: Control Flow & If-Else in C++",
        "NG0Iw6xNO0s",
        [
          [
            "Which header file is standard for input and output operations in C++?",
            [
              "<iostream>",
              "<stdio.h>",
              "<stream>",
              "<conio.h>"
            ],
            0
          ],
          [
            "Standard output stream in C++?",
            [
              "std::cout",
              "std::cin",
              "printf",
              "echo"
            ],
            0
          ],
          [
            "Operator used with std::cout for stream insertion?",
            [
              "<<",
              ">>",
              "->",
              "::"
            ],
            0
          ],
          [
            "Namespace where standard C++ library components reside?",
            [
              "std",
              "cpp",
              "core",
              "sys"
            ],
            0
          ],
          [
            "Which keyword evaluates conditions and branches execution?",
            [
              "if",
              "branch",
              "when",
              "case"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 2: Loops in C++ (For, While, Do-While)",
        "2BYSfp08ET4",
        [
          [
            "Which loop guarantees execution of its body at least once?",
            [
              "do-while loop",
              "while loop",
              "for loop",
              "range-for loop"
            ],
            0
          ],
          [
            "Exit a loop prematurely with which statement?",
            [
              "break",
              "continue",
              "return only",
              "goto only"
            ],
            0
          ],
          [
            "Skip remainder of current loop iteration with?",
            [
              "continue",
              "break",
              "pass",
              "skip"
            ],
            0
          ],
          [
            "C++11 range-based for loop syntax?",
            [
              "for (auto item : container)",
              "for (item in container)",
              "foreach (item in container)",
              "for (auto item in container)"
            ],
            0
          ],
          [
            "Increment operator ++i is called?",
            [
              "Pre-increment",
              "Post-increment",
              "Binary increment",
              "Assignment"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 3: Functions & Call by Reference",
        "7ThRtb-EMh8",
        [
          [
            "Symbol used in C++ parameter list to pass arguments by reference?",
            [
              "&",
              "*",
              "#",
              "@"
            ],
            0
          ],
          [
            "Major performance advantage of passing large objects by const reference?",
            [
              "Avoids expensive copying of data in memory",
              "Speeds up disk I/O",
              "Prevents compilation errors",
              "Allocates heap"
            ],
            0
          ],
          [
            "What is Function Overloading in C++?",
            [
              "Defining multiple functions with same name but different signatures",
              "Redefining functions in child classes",
              "Overriding operators only",
              "Writing long functions"
            ],
            0
          ],
          [
            "Keyword used to suggest compiler replace function call with inline code?",
            [
              "inline",
              "static",
              "virtual",
              "auto"
            ],
            0
          ],
          [
            "Default return type of main() function in standard C++?",
            [
              "int",
              "void",
              "char",
              "float"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 4: Pointers & Dynamic Memory in C++",
        "ecePzBvAMKg",
        [
          [
            "Keyword used to allocate dynamic heap memory in C++?",
            [
              "new",
              "malloc()",
              "alloc",
              "create"
            ],
            0
          ],
          [
            "Keyword used to deallocate memory allocated with new in C++?",
            [
              "delete",
              "free()",
              "drop",
              "clear"
            ],
            0
          ],
          [
            "Deallocate an array allocated with 'new int[10]' with?",
            [
              "delete[] arr;",
              "delete arr;",
              "free(arr);",
              "drop arr;"
            ],
            0
          ],
          [
            "Operator used to get address of a variable?",
            [
              "&",
              "*",
              "->",
              "::"
            ],
            0
          ],
          [
            "Modern C++ null pointer literal introduced in C++11?",
            [
              "nullptr",
              "NULL",
              "0",
              "nil"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: Arrays & Pointer Arithmetic",
        "mx_wCbwlEhE",
        [
          [
            "The name of an array in C++ decays into...",
            [
              "A pointer to its first element",
              "A copy of array",
              "An integer size",
              "A string"
            ],
            0
          ],
          [
            "Access element at index i using pointer ptr with?",
            [
              "*(ptr + i)",
              "ptr[i] only",
              "&ptr + i",
              "ptr->i"
            ],
            0
          ],
          [
            "Are arrays bounds-checked automatically in native C++?",
            [
              "No, accessing out of bounds causes undefined behavior",
              "Yes, throws IndexOutOfBounds",
              "Yes, returns 0",
              "Yes, caught by compiler"
            ],
            0
          ],
          [
            "Standard Library fixed-size container wrapper for arrays in C++11?",
            [
              "std::array<T, N>",
              "std::vector",
              "std::list",
              "std::deque"
            ],
            0
          ],
          [
            "Size of an array is determined at compile time for...",
            [
              "Static / stack arrays",
              "Heap arrays",
              "Vector",
              "Dynamic arrays"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: Standard Template Library (STL) & Vectors",
        "BQuW3MkwUR8",
        [
          [
            "Most widely used dynamic resizable array container in C++ STL?",
            [
              "std::vector",
              "std::list",
              "std::array",
              "std::deque"
            ],
            0
          ],
          [
            "Add a new element to the end of an std::vector?",
            [
              "v.push_back(x)",
              "v.append(x)",
              "v.add(x)",
              "v.insert_end(x)"
            ],
            0
          ],
          [
            "Algorithm used to sort a vector ascendingly?",
            [
              "std::sort(v.begin(), v.end())",
              "v.sort()",
              "sort(v)",
              "std::order(v)"
            ],
            0
          ],
          [
            "Iterator pointing to the position one past the last element?",
            [
              "v.end()",
              "v.back()",
              "v.last()",
              "v.finish()"
            ],
            0
          ],
          [
            "Associative container that stores elements in sorted key-value pairs (Red-Black tree)?",
            [
              "std::map",
              "std::unordered_map",
              "std::set",
              "std::vector"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: Classes, Objects & Constructors",
        "TOG6xCEJU3M",
        [
          [
            "Default access specifier for members of a C++ class?",
            [
              "private",
              "public",
              "protected",
              "internal"
            ],
            0
          ],
          [
            "Default access specifier for members of a C++ struct?",
            [
              "public",
              "private",
              "protected",
              "package"
            ],
            0
          ],
          [
            "Special member function called when an object is destroyed?",
            [
              "Destructor (~ClassName())",
              "Constructor",
              "delete()",
              "cleaner()"
            ],
            0
          ],
          [
            "Constructor that initializes member variables before constructor body executes uses?",
            [
              "Member Initializer List (: var(val))",
              "this assignment",
              "Setter methods",
              "Auto-wiring"
            ],
            0
          ],
          [
            "Constructor called when an object is initialized from another object of same type?",
            [
              "Copy Constructor (ClassName(const ClassName& other))",
              "Default Constructor",
              "Move Constructor",
              "Virtual Constructor"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 8: Inheritance in C++ OOP",
        "ipd4SQY0Ehg",
        [
          [
            "Syntax to inherit class Derived publicly from class Base?",
            [
              "class Derived : public Base { ... };",
              "class Derived extends Base",
              "class Derived implements Base",
              "class Derived : inherit Base"
            ],
            0
          ],
          [
            "Does C++ support multiple inheritance (inheriting from more than one class)?",
            [
              "Yes, C++ fully supports multiple inheritance",
              "No, never",
              "Only via interfaces",
              "Only with templates"
            ],
            0
          ],
          [
            "Diamond Problem in multiple inheritance is resolved in C++ using?",
            [
              "Virtual Base Classes (virtual inheritance)",
              "Interfaces",
              "Namespaces",
              "Pointers"
            ],
            0
          ],
          [
            "Class member declared protected is accessible in...",
            [
              "Defining class and derived subclasses",
              "Anywhere in program",
              "Only in defining class",
              "Only in main"
            ],
            0
          ],
          [
            "Keyword used to prevent a class from being inherited or a method from being overridden?",
            [
              "final",
              "const",
              "sealed",
              "static"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 9: Polymorphism & Virtual Functions",
        "rnYOshIg7mU",
        [
          [
            "Keyword used in base class to achieve runtime polymorphism (late binding)?",
            [
              "virtual",
              "override",
              "dynamic",
              "abstract"
            ],
            0
          ],
          [
            "A pure virtual function is defined as...",
            [
              "virtual void func() = 0;",
              "virtual void func();",
              "abstract void func();",
              "pure virtual void func();"
            ],
            0
          ],
          [
            "A class with at least one pure virtual function is called an...",
            [
              "Abstract Class",
              "Concrete Class",
              "Template Class",
              "Interface only"
            ],
            0
          ],
          [
            "Why should base class destructors be declared virtual?",
            [
              "To ensure derived class destructor is called when deleting via base pointer",
              "To speed up destruction",
              "To prevent compilation warning only",
              "To allocate on heap"
            ],
            0
          ],
          [
            "Internal data structure used by C++ compilers to resolve virtual function calls at runtime?",
            [
              "vtable (Virtual Method Table)",
              "HashTable",
              "Call Stack",
              "Heap Array"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "sql",
    "t": "SQL and Databases (DBMS)",
    "cat": "Database",
    "ic": "SQL",
    "c": 7,
    "by": "Varun Singla (Gate Smashers)",
    "v": [
      [
        "Lecture 1: Introduction to SQL & Commands",
        "323H_mOOWQ4",
        [
          [
            "What does SQL stand for?",
            [
              "Structured Query Language",
              "Simple Query Logic",
              "Standard Question Language",
              "System Query Link"
            ],
            0
          ],
          [
            "Which category of SQL commands defines database structure (CREATE, ALTER, DROP)?",
            [
              "DDL (Data Definition Language)",
              "DML",
              "DCL",
              "TCL"
            ],
            0
          ],
          [
            "Which category of SQL commands manipulates data inside tables (INSERT, UPDATE, DELETE)?",
            [
              "DML (Data Manipulation Language)",
              "DDL",
              "DCL",
              "TCL"
            ],
            0
          ],
          [
            "Which commands manage transactions (COMMIT, ROLLBACK)?",
            [
              "TCL (Transaction Control Language)",
              "DDL",
              "DML",
              "DCL"
            ],
            0
          ],
          [
            "Which commands manage user privileges and permissions (GRANT, REVOKE)?",
            [
              "DCL (Data Control Language)",
              "DDL",
              "DML",
              "TCL"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 2: CREATE Table & Data Types",
        "R6Ps7aUNPE4",
        [
          [
            "SQL command used to create a new table?",
            [
              "CREATE TABLE table_name (column datatype);",
              "MAKE TABLE",
              "NEW TABLE",
              "BUILD TABLE"
            ],
            0
          ],
          [
            "Data type used for variable-length character strings up to N characters?",
            [
              "VARCHAR(N)",
              "CHAR(N)",
              "TEXT only",
              "STRING"
            ],
            0
          ],
          [
            "Data type for fixed-length characters where unused space is padded?",
            [
              "CHAR(N)",
              "VARCHAR(N)",
              "BLOB",
              "VAR"
            ],
            0
          ],
          [
            "Primary key constraint enforces that values in the column must be...",
            [
              "Unique and NOT NULL",
              "Unique but can be NULL",
              "NULL only",
              "Positive integers only"
            ],
            0
          ],
          [
            "Constraint ensuring values in a column satisfy a specific boolean condition?",
            [
              "CHECK constraint",
              "DEFAULT",
              "UNIQUE",
              "FOREIGN KEY"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 3: ALTER & Modifying Table Structure",
        "NA3b8JRUmww",
        [
          [
            "Command used to add, delete, or modify columns in an existing table?",
            [
              "ALTER TABLE",
              "UPDATE TABLE",
              "MODIFY TABLE",
              "CHANGE TABLE"
            ],
            0
          ],
          [
            "Difference between ALTER and UPDATE?",
            [
              "ALTER changes table schema/structure; UPDATE modifies data rows inside table",
              "ALTER is for data; UPDATE is for tables",
              "They are identical",
              "UPDATE is DDL; ALTER is DML"
            ],
            0
          ],
          [
            "Add a new column 'email' to an existing table 'Users' with?",
            [
              "ALTER TABLE Users ADD email VARCHAR(100);",
              "UPDATE Users ADD email",
              "ALTER Users INSERT email",
              "MODIFY TABLE Users ADD email"
            ],
            0
          ],
          [
            "Drop a column from a table using?",
            [
              "ALTER TABLE Users DROP COLUMN email;",
              "DELETE email FROM Users;",
              "DROP email;",
              "REMOVE email FROM Users;"
            ],
            0
          ],
          [
            "Rename a table in SQL with?",
            [
              "ALTER TABLE old_name RENAME TO new_name;",
              "UPDATE TABLE RENAME",
              "MODIFY TABLE NAME",
              "RENAME DATABASE"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 4: DELETE vs DROP vs TRUNCATE",
        "_m1aJdD-oD8",
        [
          [
            "Which command deletes specific rows from a table and can be rolled back?",
            [
              "DELETE (DML command)",
              "DROP",
              "TRUNCATE",
              "CLEAR"
            ],
            0
          ],
          [
            "Which command removes all rows from a table quickly by deallocating pages and cannot be rolled back?",
            [
              "TRUNCATE (DDL command)",
              "DELETE",
              "REMOVE",
              "DROP"
            ],
            0
          ],
          [
            "Which command deletes the entire table data AND its schema definition from database completely?",
            [
              "DROP TABLE (DDL command)",
              "TRUNCATE",
              "DELETE ALL",
              "CLEAR"
            ],
            0
          ],
          [
            "Which of these commands fires DELETE triggers?",
            [
              "DELETE",
              "TRUNCATE",
              "DROP",
              "None"
            ],
            0
          ],
          [
            "Speed comparison: Which deletes all records faster?",
            [
              "TRUNCATE is much faster than DELETE",
              "DELETE is faster",
              "Both take equal time",
              "DROP is slower than DELETE"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: SQL Queries, WHERE, and Operators",
        "_yog7h4BokQ",
        [
          [
            "Clause used to filter rows matching a specific criteria in a SELECT statement?",
            [
              "WHERE",
              "HAVING",
              "GROUP BY",
              "ORDER BY"
            ],
            0
          ],
          [
            "Operator used to check if a value is contained within a specified set of values?",
            [
              "IN (e.g. status IN ('active', 'pending'))",
              "BETWEEN",
              "LIKE",
              "EXISTS"
            ],
            0
          ],
          [
            "Operator used to search for a specified pattern in a column?",
            [
              "LIKE (with % and _ wildcards)",
              "MATCH",
              "REGEXP only",
              "IN"
            ],
            0
          ],
          [
            "Wildcard character in SQL representing zero, one, or multiple characters?",
            [
              "% (percent sign)",
              "_ (underscore)",
              "* (asterisk)",
              "? (question mark)"
            ],
            0
          ],
          [
            "Check for missing/empty values in SQL using which syntax?",
            [
              "WHERE column IS NULL",
              "WHERE column == NULL",
              "WHERE column = '' only",
              "WHERE column.isEmpty()"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: GROUP BY & HAVING Clauses",
        "apNmMWgFFRg",
        [
          [
            "Clause used to group rows that have same values into summary rows?",
            [
              "GROUP BY",
              "ORDER BY",
              "COLLECT BY",
              "SUMMARY BY"
            ],
            0
          ],
          [
            "Difference between WHERE and HAVING in SQL?",
            [
              "WHERE filters individual rows before grouping; HAVING filters groups after GROUP BY",
              "WHERE is for groups; HAVING is for rows",
              "They are identical",
              "HAVING works without GROUP BY always"
            ],
            0
          ],
          [
            "Can aggregate functions (like COUNT, SUM, AVG) be placed directly in a WHERE clause?",
            [
              "No, aggregates cannot appear in WHERE (use HAVING)",
              "Yes, always",
              "Only COUNT()",
              "Only SUM()"
            ],
            0
          ],
          [
            "Sort query results in descending order by salary with?",
            [
              "ORDER BY salary DESC",
              "SORT BY salary DOWN",
              "ORDER BY salary REVERSE",
              "GROUP BY salary DESC"
            ],
            0
          ],
          [
            "Default sort order in ORDER BY if not specified?",
            [
              "ASC (Ascending)",
              "DESC (Descending)",
              "Random",
              "Index order"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: SQL Aggregate Functions",
        "Yr4pHPZCshA",
        [
          [
            "Function that returns the total count of rows in a table including NULLs?",
            [
              "COUNT(*)",
              "COUNT(column)",
              "SUM()",
              "TOTAL()"
            ],
            0
          ],
          [
            "Does COUNT(column_name) count rows where column value is NULL?",
            [
              "No, it ignores NULL values",
              "Yes, counts all rows",
              "Throws error",
              "Counts as 0"
            ],
            0
          ],
          [
            "Function to calculate mathematical average of a numeric column?",
            [
              "AVG()",
              "MEAN()",
              "AVERAGE()",
              "SUM() / COUNT() only"
            ],
            0
          ],
          [
            "Function to find the maximum value in a column?",
            [
              "MAX()",
              "TOP()",
              "PEAK()",
              "HIGH()"
            ],
            0
          ],
          [
            "What is the result of SUM() on a column containing all NULL values?",
            [
              "NULL",
              "0",
              "Error",
              "Undefined"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 8: SQL Table Joins",
        "0d419Vo2Po4",
        [
          [
            "Which JOIN returns records that have matching values in both tables?",
            [
              "INNER JOIN",
              "LEFT JOIN",
              "RIGHT JOIN",
              "FULL JOIN"
            ],
            0
          ],
          [
            "Which JOIN returns all records from left table, and matched records from right table?",
            [
              "LEFT JOIN (LEFT OUTER JOIN)",
              "RIGHT JOIN",
              "INNER JOIN",
              "CROSS JOIN"
            ],
            0
          ],
          [
            "Which JOIN returns all records when there is a match in either left or right table?",
            [
              "FULL OUTER JOIN",
              "INNER JOIN",
              "LEFT JOIN",
              "NATURAL JOIN"
            ],
            0
          ],
          [
            "Cartesian product of two tables is produced by which JOIN?",
            [
              "CROSS JOIN (TableA rows * TableB rows)",
              "INNER JOIN",
              "SELF JOIN",
              "OUTER JOIN"
            ],
            0
          ],
          [
            "A JOIN where a table is joined with itself is called a...",
            [
              "SELF JOIN",
              "AUTO JOIN",
              "SAME JOIN",
              "INNER JOIN only"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 9: Subqueries & Nested Queries",
        "fh4yBn0oTaM",
        [
          [
            "What is a Subquery in SQL?",
            [
              "A query nested inside another query (e.g. inside WHERE, FROM, or SELECT)",
              "A stored procedure",
              "A backup database",
              "A secondary index"
            ],
            0
          ],
          [
            "A subquery that depends on values from the outer query for its evaluation is a...",
            [
              "Correlated Subquery",
              "Independent Subquery",
              "Scalar Subquery",
              "Static Query"
            ],
            0
          ],
          [
            "Operator used to test for the existence of any record in a subquery?",
            [
              "EXISTS",
              "IN",
              "ANY",
              "ALL"
            ],
            0
          ],
          [
            "Classic query: Find 2nd highest salary using subquery?",
            [
              "SELECT MAX(salary) FROM Emp WHERE salary < (SELECT MAX(salary) FROM Emp);",
              "SELECT salary FROM Emp LIMIT 2",
              "SELECT 2nd(salary) FROM Emp",
              "SELECT MAX(salary, 2) FROM Emp"
            ],
            0
          ],
          [
            "Subquery that returns a single value (one row, one column) is called a...",
            [
              "Scalar Subquery",
              "Table Subquery",
              "Vector Subquery",
              "Column Subquery"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "git",
    "t": "Git & GitHub Complete Course",
    "cat": "Tools",
    "ic": "Git",
    "c": 8,
    "by": "Shradha Khapra (Apna College)",
    "v": [
      [
        "Git & GitHub Complete Tutorial (Full Video)",
        "Ez8F0nW6S-w",
        [
          [
            "Which command creates a new, empty Git repository in the current folder?",
            [
              "git start",
              "git init",
              "git create",
              "git new"
            ],
            1
          ],
          [
            "Which command adds changes to the staging area?",
            [
              "git push",
              "git commit",
              "git add",
              "git save"
            ],
            2
          ],
          [
            "What does git commit -m \"message\" do?",
            [
              "Uploads your code to GitHub",
              "Creates a new branch",
              "Deletes the staging area",
              "Saves a snapshot of the staged changes with a message"
            ],
            3
          ],
          [
            "Which command shows the history of commits?",
            [
              "git history",
              "git log",
              "git past",
              "git show-all"
            ],
            1
          ],
          [
            "Which command creates a new branch and switches to it?",
            [
              "git checkout -b <name>",
              "git branch -d <name>",
              "git merge <name>",
              "git switch --delete <name>"
            ],
            0
          ],
          [
            "Which command combines another branch into the current branch?",
            [
              "git join",
              "git combine",
              "git merge",
              "git attach"
            ],
            2
          ],
          [
            "Which command uploads your local commits to a remote repository like GitHub?",
            [
              "git pull",
              "git fetch",
              "git clone",
              "git push"
            ],
            3
          ],
          [
            "Which command downloads the latest changes from the remote and merges them into your branch?",
            [
              "git pull",
              "git init",
              "git add",
              "git status"
            ],
            0
          ],
          [
            "What does git stash do?",
            [
              "Permanently deletes your changes",
              "Temporarily saves uncommitted changes so you can switch tasks",
              "Pushes changes to GitHub",
              "Creates a new repository"
            ],
            1
          ],
          [
            "What is a Pull Request on GitHub?",
            [
              "A command that downloads code",
              "A way to delete a repository",
              "A request to review and merge your branch changes into another branch",
              "A backup of the repository"
            ],
            2
          ]
        ]
      ]
    ]
  },
  {
    "id": "react",
    "t": "React 19 Complete Tutorial (Hindi)",
    "cat": "Web Development",
    "ic": "Re",
    "c": 9,
    "by": "CodeStepByStep",
    "v": [
      [
        "React Tutorial #1: Introduction & Setup",
        "keMys1KKbe4",
        [
          [
            "React is primarily a...",
            [
              "JavaScript library for building user interfaces",
              "A backend framework",
              "A database tool",
              "A CSS framework"
            ],
            0
          ],
          [
            "Who developed and maintains React?",
            [
              "Meta (Facebook)",
              "Google",
              "Microsoft",
              "Netflix"
            ],
            0
          ],
          [
            "The smallest building block of a React UI is called a...",
            [
              "Component",
              "Module",
              "Element",
              "Template"
            ],
            0
          ],
          [
            "React components return...",
            [
              "JSX (HTML-like syntax in JavaScript)",
              "Plain HTML files",
              "CSS strings",
              "Database queries"
            ],
            0
          ],
          [
            "Command to create a new React application using Vite?",
            [
              "npm create vite@latest",
              "npx create-react-app",
              "npm new react-app",
              "react new my-app"
            ],
            0
          ]
        ]
      ],
      [
        "React Tutorial #2: Components, Props & JSX",
        "GUzLKezDmF0",
        [
          [
            "JSX stands for?",
            [
              "JavaScript XML - allows writing HTML-like syntax inside JS",
              "Java Syntax Extension",
              "JSON XML",
              "JS Cross Extension"
            ],
            0
          ],
          [
            "React component function names must start with?",
            [
              "Capital letter (PascalCase)",
              "Lowercase letter",
              "Underscore",
              "Number"
            ],
            0
          ],
          [
            "Pass data into a child component using?",
            [
              "Props (properties)",
              "State",
              "Context",
              "Refs"
            ],
            0
          ],
          [
            "Props in React are?",
            [
              "Read-only / immutable (cannot be modified by child)",
              "Mutable freely",
              "Global variables",
              "CSS classes"
            ],
            0
          ],
          [
            "Which JSX attribute is used instead of HTML's 'class' for CSS?",
            [
              "className",
              "class",
              "styleClass",
              "cssClass"
            ],
            0
          ]
        ]
      ],
      [
        "React Tutorial #3: useState Hook & Events",
        "orrnvKHqJc4",
        [
          [
            "Which hook adds local reactive state to a functional component?",
            [
              "useState",
              "useEffect",
              "useContext",
              "useRef"
            ],
            0
          ],
          [
            "Correct way to update state count with useState?",
            [
              "setCount(count + 1)",
              "count = count + 1",
              "count++",
              "this.count++"
            ],
            0
          ],
          [
            "Why does directly mutating React state (count = count+1) NOT trigger re-render?",
            [
              "React only re-renders when setter function from useState is called",
              "It always triggers re-render",
              "State cannot change",
              "Mutation is faster"
            ],
            0
          ],
          [
            "Handle a button click event in JSX with?",
            [
              "onClick={handleClick}",
              "onclick='handleClick()'",
              "on-click={handleClick}",
              "click={handleClick}"
            ],
            0
          ],
          [
            "Rendering a list of items from an array in JSX uses which method?",
            [
              "Array.map()",
              "Array.forEach()",
              "Array.filter()",
              "Array.render()"
            ],
            0
          ]
        ]
      ],
      [
        "React Tutorial #4: useEffect Hook & API Fetching",
        "gnWIetOSx1M",
        [
          [
            "Which hook is used to perform side effects (data fetching, subscriptions)?",
            [
              "useEffect",
              "useState",
              "useContext",
              "useSide"
            ],
            0
          ],
          [
            "useEffect with an empty [] dependency array runs...",
            [
              "Only once after the initial component mount",
              "After every render",
              "Never",
              "Before first render"
            ],
            0
          ],
          [
            "Clean up side effects (like event listeners or timers) in useEffect by?",
            [
              "Returning a cleanup function from useEffect",
              "Using finally block",
              "Calling clean()",
              "Unmounting manually"
            ],
            0
          ],
          [
            "Fetch data from an API inside a React component typically using?",
            [
              "useEffect + fetch() or axios",
              "useState directly",
              "class methods",
              "render()"
            ],
            0
          ],
          [
            "Which hook renders a UI that shows a loading/error state while a Promise resolves?",
            [
              "Suspense + use() hook (React 19)",
              "useEffect",
              "useState",
              "useLoader"
            ],
            0
          ]
        ]
      ],
      [
        "React Tutorial #5: React Router & Navigation",
        "1FzNbGxNKi4",
        [
          [
            "Purpose of React Router in a React application?",
            [
              "Enables client-side navigation between different views without full page reload",
              "Backend routing only",
              "CSS transitions",
              "State management"
            ],
            0
          ],
          [
            "Component used to wrap the entire application for React Router v6?",
            [
              "BrowserRouter (or RouterProvider)",
              "Switch",
              "Routes only",
              "Router"
            ],
            0
          ],
          [
            "Define an individual route in React Router v6 with?",
            [
              "<Route path='/about' element={<About />} />",
              "<Link to='/about'>",
              "<Nav path='/about'>",
              "<Go to='/about'>"
            ],
            0
          ],
          [
            "Navigate programmatically using which React Router v6 hook?",
            [
              "useNavigate()",
              "useHistory()",
              "useRouter()",
              "useRedirect()"
            ],
            0
          ],
          [
            "Create a navigation link that automatically highlights when active?",
            [
              "<NavLink to='/page'>",
              "<a href='/page'>",
              "<Link to='/page'>",
              "<ActiveLink>"
            ],
            0
          ]
        ]
      ],
      [
        "React Tutorial #6: useReducer & Redux Toolkit",
        "66yHun4QLiI",
        [
          [
            "useReducer is preferred over useState when...",
            [
              "State logic is complex, with multiple sub-values or next state depends on previous",
              "Simple boolean toggles",
              "String inputs only",
              "CSS class toggling"
            ],
            0
          ],
          [
            "Redux Toolkit (RTK) is used to...",
            [
              "Manage global application state in a predictable manner",
              "Style components",
              "Fetch data only",
              "Manage routing"
            ],
            0
          ],
          [
            "In Redux, a pure function that specifies how state changes in response to an action?",
            [
              "Reducer",
              "Selector",
              "Middleware",
              "Dispatcher"
            ],
            0
          ],
          [
            "Dispatch an action in React-Redux using which hook?",
            [
              "useDispatch()",
              "useSend()",
              "useAction()",
              "useStore()"
            ],
            0
          ],
          [
            "Read data from the Redux store in a component using?",
            [
              "useSelector(state => state.slice.value)",
              "useStore()",
              "useRedux()",
              "getState()"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "node",
    "t": "Node.js Complete Course (Hindi)",
    "cat": "Web Development",
    "ic": "Nd",
    "c": 10,
    "by": "Thapa Technical",
    "v": [
      [
        "Lecture 1: Introduction to Node.js",
        "AZzV3wZCvI4",
        [
          [
            "Node.js allows JavaScript to run...",
            [
              "On the server-side outside the browser",
              "Only inside Chrome",
              "Inside HTML only",
              "On mobile only"
            ],
            0
          ],
          [
            "Node.js is built on which JavaScript engine?",
            [
              "V8 (Google Chrome Engine)",
              "SpiderMonkey",
              "Chakra",
              "JavaScriptCore"
            ],
            0
          ],
          [
            "Key feature that makes Node.js efficient for I/O operations?",
            [
              "Non-blocking, asynchronous I/O",
              "Multi-threading",
              "Synchronous I/O only",
              "GPU acceleration"
            ],
            0
          ],
          [
            "What does Node.js excel at building?",
            [
              "Scalable network applications and REST APIs",
              "Desktop GUI apps only",
              "Mobile games",
              "Operating Systems"
            ],
            0
          ],
          [
            "Package manager bundled with Node.js?",
            [
              "npm (Node Package Manager)",
              "pip",
              "gem",
              "cargo"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 2: Node.js Modules & File System (fs)",
        "nNihy9kZmIU",
        [
          [
            "How do you import a built-in module in Node.js (CommonJS)?",
            [
              "const fs = require('fs');",
              "import fs from 'fs';",
              "include fs;",
              "using fs;"
            ],
            0
          ],
          [
            "Which core module handles reading and writing files?",
            [
              "fs (File System module)",
              "path",
              "http",
              "url"
            ],
            0
          ],
          [
            "Read a file asynchronously without blocking in Node.js?",
            [
              "fs.readFile('file.txt', 'utf8', callback)",
              "fs.readFileSync()",
              "file.read()",
              "open('file.txt')"
            ],
            0
          ],
          [
            "Which core module helps resolve and manipulate file system paths?",
            [
              "path",
              "fs",
              "url",
              "os"
            ],
            0
          ],
          [
            "Global variable giving the directory path of the current module?",
            [
              "__dirname",
              "__filename",
              "process.dir",
              "module.path"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 3: HTTP Server & Request/Response",
        "9HYAaXwS7I4",
        [
          [
            "Create a basic HTTP server in Node.js using which core module?",
            [
              "http (require('http'))",
              "server",
              "express only",
              "net"
            ],
            0
          ],
          [
            "Method used to create an HTTP server?",
            [
              "http.createServer(callback)",
              "new Server()",
              "http.start()",
              "createHTTP()"
            ],
            0
          ],
          [
            "Which object contains information about the incoming request (URL, method, headers)?",
            [
              "req (IncomingMessage)",
              "res",
              "server",
              "data"
            ],
            0
          ],
          [
            "Which object is used to send responses back to the client?",
            [
              "res (ServerResponse)",
              "req",
              "http",
              "server"
            ],
            0
          ],
          [
            "Standard HTTP success status code for OK response?",
            [
              "200",
              "201",
              "404",
              "500"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 4: Express.js Framework & Routing",
        "J-QgmSzyA_A",
        [
          [
            "Express.js is described as a...",
            [
              "Fast, minimal, and flexible Node.js web framework",
              "Database ORM",
              "Frontend library",
              "Testing tool"
            ],
            0
          ],
          [
            "Install Express.js in a Node project?",
            [
              "npm install express",
              "node install express",
              "npm add express-framework",
              "require install express"
            ],
            0
          ],
          [
            "Create an Express app instance?",
            [
              "const app = express();",
              "const app = new Express();",
              "const app = createExpress();",
              "const app = Express.start();"
            ],
            0
          ],
          [
            "Start the Express server listening on port 3000?",
            [
              "app.listen(3000, callback)",
              "app.start(3000)",
              "server.run(3000)",
              "express.listen(3000)"
            ],
            0
          ],
          [
            "Define a GET route for the home path '/' in Express?",
            [
              "app.get('/', (req, res) => { res.send('Hello'); })",
              "app.route('/').get()",
              "express.get('/')",
              "router.get('/', handler)"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 5: MongoDB & Mongoose Integration",
        "dfgnVPB4muo",
        [
          [
            "MongoDB is which type of database?",
            [
              "NoSQL document database",
              "SQL relational database",
              "Graph database",
              "Key-value only"
            ],
            0
          ],
          [
            "MongoDB stores data in which format?",
            [
              "JSON-like BSON documents",
              "CSV files",
              "XML files",
              "SQL tables"
            ],
            0
          ],
          [
            "Mongoose is a Node.js library used to...",
            [
              "Model and interact with MongoDB using schemas and models",
              "Style HTML templates",
              "Handle routing only",
              "Manage npm packages"
            ],
            0
          ],
          [
            "Define a data schema in Mongoose?",
            [
              "const schema = new mongoose.Schema({ name: String, age: Number });",
              "mongoose.create({ name: String })",
              "new Schema(name, age)",
              "schema.define(name, age)"
            ],
            0
          ],
          [
            "Connect to a MongoDB database using Mongoose?",
            [
              "mongoose.connect('mongodb://localhost/mydb')",
              "db.connect('mydb')",
              "mongo.open('mydb')",
              "mongoose.open('localhost')"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 6: Authentication - Sessions & Cookies",
        "1GFXygmMvU4",
        [
          [
            "HTTP Cookies are used to...",
            [
              "Store small data on client browser for state persistence",
              "Hash passwords",
              "Style HTML",
              "Cache API calls"
            ],
            0
          ],
          [
            "Sessions store user state data...",
            [
              "On the server-side, linking to client via session ID cookie",
              "Entirely on the client",
              "In URL parameters",
              "In localStorage only"
            ],
            0
          ],
          [
            "Popular npm library used for secure password hashing in Node.js?",
            [
              "bcrypt",
              "md5 only",
              "sha256",
              "crypto only"
            ],
            0
          ],
          [
            "Popular library for managing session middleware in Express?",
            [
              "express-session",
              "cookie-manager",
              "sessions.js",
              "auth-session"
            ],
            0
          ],
          [
            "JWT stands for?",
            [
              "JSON Web Token (used for stateless authentication)",
              "Java Web Tool",
              "JSON Wrapper Type",
              "Java Workflow Token"
            ],
            0
          ]
        ]
      ],
      [
        "Lecture 7: REST API with JSON Requests",
        "n-7KgmUFvuI",
        [
          [
            "REST API stands for?",
            [
              "Representational State Transfer Application Programming Interface",
              "Remote Execute State Transfer",
              "Request Event Server Transfer",
              "Remote API Standard"
            ],
            0
          ],
          [
            "HTTP method used to create a new resource?",
            [
              "POST",
              "GET",
              "PUT",
              "DELETE"
            ],
            0
          ],
          [
            "HTTP method used to retrieve/read a resource?",
            [
              "GET",
              "POST",
              "PATCH",
              "HEAD"
            ],
            0
          ],
          [
            "HTTP method used to delete an existing resource?",
            [
              "DELETE",
              "REMOVE",
              "DROP",
              "CLEAR"
            ],
            0
          ],
          [
            "Standard format for data exchange in REST APIs?",
            [
              "JSON (JavaScript Object Notation)",
              "XML only",
              "CSV",
              "HTML"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "dsa",
    "t": "Data Structures & Algorithms",
    "cat": "Computer Science",
    "ic": "DS",
    "c": 11,
    "by": "Bro Code",
    "v": [
      [
        "Introduction to Data Structures & Algorithms",
        "xX5iOYCJmBI",
        [
          [
            "What is a Data Structure?",
            [
              "A way of organizing and storing data for efficient access and modification",
              "A programming language",
              "A database table",
              "An operating system feature"
            ],
            0
          ],
          [
            "What is an Algorithm?",
            [
              "A step-by-step procedure for solving a computational problem",
              "A data type",
              "A programming loop",
              "A GUI element"
            ],
            0
          ],
          [
            "Why are Data Structures and Algorithms important?",
            [
              "They determine program efficiency in time and memory usage",
              "They make code look prettier",
              "Required for HTML only",
              "They replace databases"
            ],
            0
          ],
          [
            "Big O notation expresses...",
            [
              "Worst-case growth rate of time/space as input size increases",
              "Exact runtime in seconds",
              "Number of lines of code",
              "RAM usage in MB"
            ],
            0
          ],
          [
            "Which is the most efficient time complexity?",
            [
              "O(1) Constant Time",
              "O(n) Linear",
              "O(n^2) Quadratic",
              "O(log n) Logarithmic"
            ],
            0
          ]
        ]
      ],
      [
        "Stack Data Structure",
        "KInG04mAjO0",
        [
          [
            "Stack follows which ordering principle?",
            [
              "LIFO (Last In First Out)",
              "FIFO (First In First Out)",
              "Sorted order",
              "Random access"
            ],
            0
          ],
          [
            "Add an element to the top of the stack?",
            [
              "push()",
              "enqueue()",
              "append()",
              "insert()"
            ],
            0
          ],
          [
            "Remove and return the top element from the stack?",
            [
              "pop()",
              "dequeue()",
              "remove()",
              "delete()"
            ],
            0
          ],
          [
            "View the top element WITHOUT removing it?",
            [
              "peek()",
              "top()",
              "view()",
              "front()"
            ],
            0
          ],
          [
            "Real-world application of a Stack?",
            [
              "Undo/Redo in text editors and browser back button",
              "Print queue",
              "Order processing",
              "CPU scheduling"
            ],
            0
          ]
        ]
      ],
      [
        "Queue Data Structure",
        "nqXaPZi99JI",
        [
          [
            "Queue follows which ordering principle?",
            [
              "FIFO (First In First Out)",
              "LIFO (Last In First Out)",
              "Priority order",
              "Sorted order"
            ],
            0
          ],
          [
            "Add an element to the back of the queue?",
            [
              "enqueue()",
              "push()",
              "append()",
              "add()"
            ],
            0
          ],
          [
            "Remove and return the front element from the queue?",
            [
              "dequeue()",
              "pop()",
              "remove()",
              "shift()"
            ],
            0
          ],
          [
            "View the front element without removing it?",
            [
              "peek() or front()",
              "pop()",
              "top()",
              "end()"
            ],
            0
          ],
          [
            "Real-world example of a Queue?",
            [
              "Printer job queue and customer service lines",
              "Undo/Redo feature",
              "Browser cache",
              "File compression"
            ],
            0
          ]
        ]
      ],
      [
        "Linked Lists",
        "N6dOwBde7-M",
        [
          [
            "A Linked List consists of nodes where each node stores...",
            [
              "Data and a pointer/reference to the next node",
              "Only data values",
              "Index numbers",
              "Fixed memory blocks"
            ],
            0
          ],
          [
            "Advantage of Linked List over Array?",
            [
              "Dynamic size - elements can be inserted/deleted without shifting all elements",
              "Faster random access",
              "Less memory usage",
              "Better cache performance"
            ],
            0
          ],
          [
            "Time complexity to access an element at index k in a Linked List?",
            [
              "O(n) - must traverse from head",
              "O(1)",
              "O(log n)",
              "O(k)"
            ],
            0
          ],
          [
            "Time complexity to insert at the head of a Linked List?",
            [
              "O(1) Constant Time",
              "O(n)",
              "O(log n)",
              "O(n^2)"
            ],
            0
          ],
          [
            "A Doubly Linked List differs from Singly Linked List because?",
            [
              "Each node has pointers to BOTH next AND previous nodes",
              "It has two heads",
              "It is sorted automatically",
              "It is circular only"
            ],
            0
          ]
        ]
      ],
      [
        "Binary Search & Linear Search",
        "xrMppTpoqdw",
        [
          [
            "Linear Search checks elements...",
            [
              "One by one from start to end until the target is found",
              "Randomly",
              "From middle outward",
              "Using recursion only"
            ],
            0
          ],
          [
            "Time complexity of Linear Search in worst case?",
            [
              "O(n)",
              "O(1)",
              "O(log n)",
              "O(n^2)"
            ],
            0
          ],
          [
            "Binary Search requires the data to be...",
            [
              "Sorted in ascending or descending order",
              "Random order",
              "Stored in a Linked List",
              "All unique values"
            ],
            0
          ],
          [
            "How does Binary Search locate an element?",
            [
              "Repeatedly halves the search range by comparing target to the middle element",
              "Scans all elements sequentially",
              "Hashes the target",
              "Uses two pointers linearly"
            ],
            0
          ],
          [
            "Time complexity of Binary Search?",
            [
              "O(log n)",
              "O(n)",
              "O(1)",
              "O(n log n)"
            ],
            0
          ]
        ]
      ],
      [
        "Bubble Sort & Selection Sort",
        "Dv4qLJcxus8",
        [
          [
            "Bubble Sort works by...",
            [
              "Repeatedly swapping adjacent elements if they are in wrong order",
              "Selecting minimum and placing it at start",
              "Dividing array in half",
              "Using a pivot element"
            ],
            0
          ],
          [
            "Worst-case time complexity of Bubble Sort?",
            [
              "O(n^2)",
              "O(n log n)",
              "O(n)",
              "O(1)"
            ],
            0
          ],
          [
            "Selection Sort works by...",
            [
              "Finding the minimum element and placing it at the beginning each pass",
              "Swapping adjacent elements",
              "Dividing array recursively",
              "Hashing elements"
            ],
            0
          ],
          [
            "Is Bubble Sort a stable sorting algorithm?",
            [
              "Yes, equal elements maintain their relative order",
              "No, never",
              "Only with optimization",
              "Depends on input"
            ],
            0
          ],
          [
            "Best-case time complexity of optimized Bubble Sort (already sorted array)?",
            [
              "O(n)",
              "O(n^2)",
              "O(log n)",
              "O(1)"
            ],
            0
          ]
        ]
      ],
      [
        "Merge Sort & Quick Sort",
        "3j0SWDX4AtU",
        [
          [
            "Merge Sort uses which algorithmic technique?",
            [
              "Divide and Conquer - splits array, sorts halves, then merges",
              "Greedy approach",
              "Dynamic Programming",
              "Backtracking"
            ],
            0
          ],
          [
            "Time complexity of Merge Sort in all cases (best, average, worst)?",
            [
              "O(n log n) - always consistent",
              "O(n^2)",
              "O(n)",
              "O(log n)"
            ],
            0
          ],
          [
            "Quick Sort selects a pivot and...",
            [
              "Partitions elements - smaller to left, larger to right, then recursively sorts partitions",
              "Merges sorted halves",
              "Finds minimum repeatedly",
              "Inserts in correct position"
            ],
            0
          ],
          [
            "Worst-case time complexity of Quick Sort (when pivot is always min or max)?",
            [
              "O(n^2)",
              "O(n log n)",
              "O(n)",
              "O(log n)"
            ],
            0
          ],
          [
            "Which is generally faster in practice despite same average complexity?",
            [
              "Quick Sort (better cache performance, smaller constants)",
              "Merge Sort always",
              "Bubble Sort",
              "Selection Sort"
            ],
            0
          ]
        ]
      ],
      [
        "Graphs - BFS & DFS Traversal",
        "-VgHk7UMPP4",
        [
          [
            "A Graph data structure consists of...",
            [
              "Vertices (nodes) connected by Edges",
              "Only nodes",
              "Only edges",
              "Sorted arrays"
            ],
            0
          ],
          [
            "BFS (Breadth-First Search) uses which data structure internally?",
            [
              "Queue",
              "Stack",
              "Heap",
              "Array"
            ],
            0
          ],
          [
            "DFS (Depth-First Search) uses which data structure or technique?",
            [
              "Stack or Recursion",
              "Queue",
              "Heap",
              "Sorted Array"
            ],
            0
          ],
          [
            "BFS traversal explores nodes in which order?",
            [
              "Level by level (all neighbors first before going deeper)",
              "Deepest path first",
              "Sorted order",
              "Random order"
            ],
            0
          ],
          [
            "Application of BFS in real-world?",
            [
              "Shortest path in unweighted graphs (e.g. GPS navigation, social network connections)",
              "Cycle detection",
              "Topological sort",
              "Memory allocation"
            ],
            0
          ]
        ]
      ],
      [
        "Hash Tables & Binary Search Trees",
        "FsfRsGFHuv4",
        [
          [
            "A Hash Table stores data as...",
            [
              "Key-value pairs with O(1) average access time using a hash function",
              "Sorted linked list",
              "Binary tree nodes",
              "Sequential array"
            ],
            0
          ],
          [
            "Time complexity for average-case search/insert/delete in a Hash Table?",
            [
              "O(1) Constant Time",
              "O(n)",
              "O(log n)",
              "O(n^2)"
            ],
            0
          ],
          [
            "In a Binary Search Tree, left subtree values are always...",
            [
              "Less than the root node value",
              "Greater than root",
              "Equal to root",
              "Random"
            ],
            0
          ],
          [
            "Inorder traversal of a BST visits nodes in which order?",
            [
              "Sorted ascending order (Left, Root, Right)",
              "Descending order",
              "Level order",
              "Insertion order"
            ],
            0
          ],
          [
            "What causes a Hash Collision?",
            [
              "Two different keys produce the same hash value/index",
              "Too many elements",
              "Wrong data type",
              "Full array"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "linux",
    "t": "Linux Complete Course (Hindi)",
    "cat": "DevOps",
    "ic": "LX",
    "c": 12,
    "by": "MPrashant",
    "v": [
      [
        "Linux Basics - Intro & File System Commands",
        "4IIlZRabmV8",
        [
          [
            "What is Linux?",
            [
              "An open-source Unix-like operating system kernel",
              "A programming language",
              "A database system",
              "A web browser"
            ],
            0
          ],
          [
            "What does 'pwd' command do?",
            [
              "Prints the current working directory path",
              "Changes directory",
              "Lists files",
              "Creates a file"
            ],
            0
          ],
          [
            "Command to list files and folders in a directory?",
            [
              "ls -l",
              "dir list",
              "show files",
              "display"
            ],
            0
          ],
          [
            "Command to create a new directory?",
            [
              "mkdir folder_name",
              "create folder_name",
              "new folder_name",
              "make folder_name"
            ],
            0
          ],
          [
            "Command to remove a file in Linux?",
            [
              "rm filename",
              "del filename",
              "remove filename",
              "erase filename"
            ],
            0
          ]
        ]
      ],
      [
        "Linux File Permissions & Ownership",
        "Zysmaewb2wE",
        [
          [
            "Linux file permissions are divided into 3 groups. Which are they?",
            [
              "Owner, Group, Others",
              "Admin, User, Guest",
              "Root, Sudo, Normal",
              "Read, Write, Execute"
            ],
            0
          ],
          [
            "What does 'chmod 755 file' set for the file?",
            [
              "Owner: rwx, Group: r-x, Others: r-x",
              "Owner: rw-, Group: rw-, Others: r--",
              "Owner: rwx, Group: rwx, Others: rwx",
              "Owner: r--, Group: r--, Others: r--"
            ],
            0
          ],
          [
            "Command to change file owner to 'john'?",
            [
              "chown john filename",
              "chmod john filename",
              "owner john filename",
              "setowner john filename"
            ],
            0
          ],
          [
            "What does SUID (Set User ID) permission do?",
            [
              "Executes the file with the owner's privileges regardless of who runs it",
              "Hides the file from other users",
              "Prevents file deletion",
              "Encrypts the file"
            ],
            0
          ],
          [
            "What does 'umask 022' mean?",
            [
              "New files get permission 644 (files) and 755 (dirs) by default",
              "All permissions are denied",
              "Full permissions for everyone",
              "Read-only for all"
            ],
            0
          ]
        ]
      ],
      [
        "Linux User Management",
        "vLuFkesBPcM",
        [
          [
            "Command to create a new user 'ali'?",
            [
              "useradd ali",
              "adduser ali",
              "createuser ali",
              "newuser ali"
            ],
            0
          ],
          [
            "Command to set/change password for user 'ali'?",
            [
              "passwd ali",
              "password ali",
              "setpass ali",
              "chpass ali"
            ],
            0
          ],
          [
            "Which file stores all user account information in Linux?",
            [
              "/etc/passwd",
              "/etc/users",
              "/etc/accounts",
              "/home/users"
            ],
            0
          ],
          [
            "Command to switch to another user 'root' in terminal?",
            [
              "su root  or  sudo -i",
              "login root",
              "change root",
              "become root"
            ],
            0
          ],
          [
            "Command to delete/remove a user 'ali' along with their home directory?",
            [
              "userdel -r ali",
              "removeuser ali",
              "deluser ali",
              "userdelete -r ali"
            ],
            0
          ]
        ]
      ],
      [
        "Shell Scripting Fundamentals",
        "TtGM9GfBuok",
        [
          [
            "What is a Shell Script?",
            [
              "A text file containing a series of Linux commands executed sequentially",
              "A graphical program",
              "A compiled binary",
              "A configuration file only"
            ],
            0
          ],
          [
            "First line of a Bash shell script (shebang line)?",
            [
              "#!/bin/bash",
              "//bash",
              "#bash start",
              "@bash"
            ],
            0
          ],
          [
            "How do you make a shell script executable?",
            [
              "chmod +x script.sh",
              "run script.sh",
              "exec script.sh",
              "allow script.sh"
            ],
            0
          ],
          [
            "How to declare and print a variable in Bash?",
            [
              "name='Ali'; echo $name",
              "var name = 'Ali'; print name",
              "set name 'Ali'; display name",
              "name='Ali'; printf name"
            ],
            0
          ],
          [
            "Which loop iterates a fixed number of times in Bash?",
            [
              "for i in {1..5}; do ... done",
              "repeat 5 times do ... end",
              "loop 5 { ... }",
              "while count < 5 do ... done"
            ],
            0
          ]
        ]
      ],
      [
        "SSH, Networking & System Administration",
        "Ei3nU-fHI6E",
        [
          [
            "SSH stands for?",
            [
              "Secure Shell - encrypted remote server login protocol",
              "System Shell Host",
              "Secure System Handler",
              "Server Side Host"
            ],
            0
          ],
          [
            "Command to connect to remote server via SSH?",
            [
              "ssh username@server_ip",
              "connect username@server_ip",
              "login ssh server_ip",
              "remote username server_ip"
            ],
            0
          ],
          [
            "Command to check active network connections and listening ports?",
            [
              "netstat -tulnp",
              "ifconfig --ports",
              "network status",
              "ip list ports"
            ],
            0
          ],
          [
            "Command to check if a remote host is reachable?",
            [
              "ping hostname_or_ip",
              "check hostname",
              "connect test ip",
              "reach ip"
            ],
            0
          ],
          [
            "What does 'cron' do in Linux?",
            [
              "Schedules commands/scripts to run automatically at specified times",
              "Manages user accounts",
              "Monitors CPU usage",
              "Handles file compression"
            ],
            0
          ]
        ]
      ],
      [
        "Linux Web Servers - Apache & Nginx",
        "TQR0sPgVpEg",
        [
          [
            "What is Apache HTTPD used for?",
            [
              "Serving web pages over HTTP to clients",
              "Managing databases",
              "Sending emails",
              "SSH remote access"
            ],
            0
          ],
          [
            "Command to start the Apache service on Linux (systemd)?",
            [
              "systemctl start httpd",
              "apache start",
              "service web start",
              "httpd.start"
            ],
            0
          ],
          [
            "Nginx is primarily used as?",
            [
              "Web server and reverse proxy",
              "Database server",
              "Mail server",
              "File transfer server"
            ],
            0
          ],
          [
            "What is an Nginx Reverse Proxy?",
            [
              "Sits in front of backend servers, forwarding client requests to them",
              "A regular web server",
              "A firewall rule",
              "A load balancer only"
            ],
            0
          ],
          [
            "Default port for HTTP web traffic?",
            [
              "Port 80",
              "Port 443",
              "Port 22",
              "Port 8080"
            ],
            0
          ]
        ]
      ],
      [
        "Linux Security & Firewall",
        "bR8SAS60QnY",
        [
          [
            "What is a firewall used for in Linux?",
            [
              "Controls incoming/outgoing network traffic based on security rules",
              "Manages disk partitions",
              "Schedules tasks",
              "Manages software packages"
            ],
            0
          ],
          [
            "Command to allow port 80 permanently in firewalld?",
            [
              "firewall-cmd --permanent --add-port=80/tcp",
              "iptables allow 80",
              "firewall allow http 80",
              "open-port 80"
            ],
            0
          ],
          [
            "SELinux stands for?",
            [
              "Security-Enhanced Linux - provides mandatory access control",
              "System Enhanced Login",
              "Secure External Linux",
              "Shell Enhanced Lock"
            ],
            0
          ],
          [
            "Which command manages package installation on RHEL/CentOS systems?",
            [
              "yum install package  or  dnf install package",
              "apt install package",
              "pip install package",
              "brew install package"
            ],
            0
          ],
          [
            "LVM stands for and its use?",
            [
              "Logical Volume Manager - flexible disk management and resizing",
              "Linux Virtual Machine",
              "Local Volume Monitor",
              "Linux Volume Mount"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "ts",
    "t": "TypeScript Complete Tutorial (Hindi)",
    "cat": "Web Development",
    "ic": "TS",
    "c": 13,
    "by": "CodeStepByStep",
    "v": [
      [
        "TypeScript #1-3: Intro, Setup & Data Types",
        "EPHKOPbrBk0",
        [
          [
            "TypeScript is best described as?",
            [
              "A strongly-typed superset of JavaScript that compiles to plain JavaScript",
              "A separate programming language unrelated to JS",
              "A JavaScript runtime like Node.js",
              "A CSS preprocessor"
            ],
            0
          ],
          [
            "Primary advantage of TypeScript over JavaScript?",
            [
              "Catches type-related errors at compile time before running the code",
              "Runs faster than JavaScript",
              "Works without a browser",
              "No setup required"
            ],
            0
          ],
          [
            "Command to compile a TypeScript file 'app.ts' to JavaScript?",
            [
              "tsc app.ts",
              "compile app.ts",
              "node app.ts",
              "ts-compile app.ts"
            ],
            0
          ],
          [
            "What is the TypeScript configuration file called?",
            [
              "tsconfig.json",
              "typescript.config.js",
              "ts.setup.json",
              "config.ts"
            ],
            0
          ],
          [
            "TypeScript's 'any' type means?",
            [
              "Disables type checking for that variable (any type allowed)",
              "The variable must be a number",
              "The variable is optional",
              "The variable is null"
            ],
            0
          ]
        ]
      ],
      [
        "TypeScript #4-10: Number, String, Boolean & Arrays",
        "qN7mURlg1s4",
        [
          [
            "How to declare a typed string variable in TypeScript?",
            [
              "let name: string = 'Ali';",
              "string name = 'Ali';",
              "var name = string('Ali');",
              "let name = 'Ali' as string;"
            ],
            0
          ],
          [
            "TypeScript 'boolean' type holds?",
            [
              "Only true or false values",
              "0 or 1 integer values",
              "Yes or No strings",
              "Any truthy value"
            ],
            0
          ],
          [
            "TypeScript 'number' type covers?",
            [
              "Both integers and floating point numbers",
              "Only integers",
              "Only decimals",
              "Only positive numbers"
            ],
            0
          ],
          [
            "Declare a typed array of numbers in TypeScript?",
            [
              "let nums: number[] = [1,2,3];  or  Array<number>",
              "let nums = number[1,2,3];",
              "number[] nums = {1,2,3};",
              "let nums: Array = [1,2,3];"
            ],
            0
          ],
          [
            "What is a TypeScript Tuple?",
            [
              "A fixed-length array with specified types at each index position",
              "A dynamic array",
              "An object type",
              "A union type"
            ],
            0
          ]
        ]
      ],
      [
        "TypeScript #11-20: Functions, Interfaces & Union Types",
        "jRxeMpcJo0I",
        [
          [
            "How to specify a function's return type in TypeScript?",
            [
              "function greet(): string { return 'Hi'; }",
              "function greet() -> string { return 'Hi'; }",
              "function greet() string { return 'Hi'; }",
              "string function greet() { return 'Hi'; }"
            ],
            0
          ],
          [
            "TypeScript 'void' return type means?",
            [
              "The function does not return any value",
              "Returns null",
              "Returns undefined only",
              "Returns an empty string"
            ],
            0
          ],
          [
            "What is an Interface in TypeScript?",
            [
              "A contract defining the shape (structure) of an object",
              "A class blueprint",
              "A function type",
              "An imported module"
            ],
            0
          ],
          [
            "Union type in TypeScript allows a variable to be?",
            [
              "One of several specified types (e.g., string | number)",
              "Multiple types simultaneously",
              "Only nullable types",
              "Only primitive types"
            ],
            0
          ],
          [
            "TypeScript 'never' type represents?",
            [
              "A value that never occurs (infinite loop, always throws error)",
              "An undefined variable",
              "A null value",
              "An empty array"
            ],
            0
          ]
        ]
      ],
      [
        "TypeScript #21-29: Enums, Classes & Access Modifiers",
        "JvE4muotpP8",
        [
          [
            "Enums in TypeScript are used to?",
            [
              "Define a set of named constants (e.g., Colors, Directions)",
              "Create reusable functions",
              "Define array types",
              "Import modules"
            ],
            0
          ],
          [
            "TypeScript 'class' supports which OOP concepts?",
            [
              "Encapsulation, Inheritance, and Polymorphism",
              "Only Encapsulation",
              "Only Inheritance",
              "Functional programming only"
            ],
            0
          ],
          [
            "'private' access modifier in TypeScript means?",
            [
              "Member is only accessible within the same class",
              "Accessible everywhere",
              "Accessible in subclasses only",
              "Accessible in same file only"
            ],
            0
          ],
          [
            "'protected' access modifier allows access from?",
            [
              "Same class AND subclasses (not from outside)",
              "Everywhere",
              "Only the same class",
              "Only imported modules"
            ],
            0
          ],
          [
            "TypeScript 'readonly' keyword means?",
            [
              "Property can only be assigned once during initialization",
              "Property is private",
              "Property cannot be a number",
              "Property is static"
            ],
            0
          ]
        ]
      ],
      [
        "TypeScript #30-36: Generics & Utility Types",
        "LKSW2th470w",
        [
          [
            "Generics in TypeScript allow you to?",
            [
              "Write reusable functions/classes that work with multiple types while keeping type safety",
              "Use any type without restrictions",
              "Create type aliases only",
              "Write untyped code"
            ],
            0
          ],
          [
            "Correct syntax for a generic function in TypeScript?",
            [
              "function identity<T>(arg: T): T { return arg; }",
              "function identity(T)(arg: T): T { return arg; }",
              "function<T> identity(arg): T { return arg; }",
              "generic function identity(arg: T) { return arg; }"
            ],
            0
          ],
          [
            "TypeScript Utility Type 'Partial<T>' does what?",
            [
              "Makes all properties of type T optional",
              "Makes all properties required",
              "Makes all properties readonly",
              "Removes all properties"
            ],
            0
          ],
          [
            "TypeScript Utility Type 'Readonly<T>' does what?",
            [
              "Makes all properties of T immutable (cannot be reassigned)",
              "Makes all properties optional",
              "Makes all properties public",
              "Removes the type"
            ],
            0
          ],
          [
            "TypeScript 'keyof' operator returns?",
            [
              "A union type of all property keys/names of an object type",
              "The values of an object",
              "A number count of keys",
              "The first key only"
            ],
            0
          ]
        ]
      ],
      [
        "TypeScript #37-42: Decorators, Async & Best Practices",
        "8lc7rruHKvA",
        [
          [
            "TypeScript Decorators are?",
            [
              "Special functions that can modify classes, methods, or properties at design time",
              "Type assertions",
              "Generic constraints",
              "Module imports"
            ],
            0
          ],
          [
            "To enable Decorators in TypeScript, what must be set in tsconfig.json?",
            [
              "experimentalDecorators: true",
              "decorators: enabled",
              "allowDecorators: true",
              "useDecorators: true"
            ],
            0
          ],
          [
            "How to type a Promise that resolves to a string in TypeScript?",
            [
              "Promise<string>",
              "string Promise",
              "Async<string>",
              "Promise(string)"
            ],
            0
          ],
          [
            "TypeScript 'async/await' with types looks like?",
            [
              "async function getData(): Promise<User> { const user = await fetch(...); }",
              "async getData() -> User { ... }",
              "function async getData(): User { ... }",
              "getData(): async User { ... }"
            ],
            0
          ],
          [
            "TypeScript best practice for API response typing?",
            [
              "Define an interface/type for the response shape and use it as the generic",
              "Use 'any' for all API responses",
              "Use 'object' type",
              "No typing needed for API calls"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "django",
    "t": "Django Complete Course (Hindi)",
    "cat": "Web Development",
    "ic": "Dj",
    "c": 14,
    "by": "CodeWithHarry / Community",
    "v": [
      [
        "Django #1: Introduction & Setup",
        "s5w5Tj-o6KI",
        [
          [
            "Django is a?",
            [
              "High-level Python web framework that encourages rapid development",
              "JavaScript framework",
              "Database management system",
              "Frontend library"
            ],
            0
          ],
          [
            "Django follows which architectural pattern?",
            [
              "MVT (Model-View-Template)",
              "MVC (Model-View-Controller)",
              "MVVM",
              "REST only"
            ],
            0
          ],
          [
            "Command to install Django?",
            [
              "pip install django",
              "npm install django",
              "apt install django",
              "python install django"
            ],
            0
          ],
          [
            "Command to create a new Django project named 'mysite'?",
            [
              "django-admin startproject mysite",
              "django new mysite",
              "python django create mysite",
              "manage.py new mysite"
            ],
            0
          ],
          [
            "Command to start the Django development server?",
            [
              "python manage.py runserver",
              "django start server",
              "python server.py",
              "manage.py serve"
            ],
            0
          ]
        ]
      ],
      [
        "Django #2: Apps, Models & Database",
        "x9HmFNyF78Y",
        [
          [
            "Command to create a new Django app named 'blog'?",
            [
              "python manage.py startapp blog",
              "django-admin createapp blog",
              "python create app blog",
              "manage.py newapp blog"
            ],
            0
          ],
          [
            "Django Models are?",
            [
              "Python classes that define the structure of database tables",
              "HTML templates",
              "URL configuration",
              "CSS style guides"
            ],
            0
          ],
          [
            "After creating/modifying models, what two commands sync them to the database?",
            [
              "python manage.py makemigrations  then  python manage.py migrate",
              "python manage.py syncdb",
              "python manage.py update",
              "django-admin syncmodels"
            ],
            0
          ],
          [
            "Django's default built-in database is?",
            [
              "SQLite",
              "PostgreSQL",
              "MySQL",
              "MongoDB"
            ],
            0
          ],
          [
            "Which field creates a Many-to-One relationship in a Django model?",
            [
              "ForeignKey",
              "ManyToManyField",
              "OneToOneField",
              "RelatedField"
            ],
            0
          ]
        ]
      ],
      [
        "Django #3: Views, URLs & Templates",
        "mTDRn-Hxh_E",
        [
          [
            "Django Views are responsible for?",
            [
              "Processing requests and returning HTTP responses",
              "Defining database models",
              "Managing static files",
              "Routing only"
            ],
            0
          ],
          [
            "A Django Function-Based View (FBV) returns?",
            [
              "An HttpResponse or render() object",
              "A JSON string always",
              "A database query",
              "An HTML file path"
            ],
            0
          ],
          [
            "Django Template Language uses which syntax for displaying a variable?",
            [
              "{{ variable_name }}",
              "{% variable_name %}",
              "<%= variable_name %>",
              "${variable_name}"
            ],
            0
          ],
          [
            "Django Template tag for 'if' conditional block?",
            [
              "{% if condition %} ... {% endif %}",
              "{{ if condition }} ... {{ endif }}",
              "<if condition> ... </if>",
              "{% condition %} ... {% end %}"
            ],
            0
          ],
          [
            "django.urls 'path()' function is used to?",
            [
              "Map a URL pattern to a specific view function",
              "Create template tags",
              "Define database fields",
              "Set middleware"
            ],
            0
          ]
        ]
      ],
      [
        "Django #4: Forms & User Authentication",
        "Phrnvgy8A44",
        [
          [
            "Django Forms are used for?",
            [
              "Handling HTML form data, validation, and user input",
              "Routing requests",
              "Database migrations",
              "Static file serving"
            ],
            0
          ],
          [
            "Django's built-in authentication provides?",
            [
              "User login, logout, registration, and password management out of the box",
              "Only password hashing",
              "Only session management",
              "Only user creation"
            ],
            0
          ],
          [
            "To restrict a view to logged-in users only, use which decorator?",
            [
              "@login_required",
              "@authenticated",
              "@requires_login",
              "@user_required"
            ],
            0
          ],
          [
            "Django CSRF protection helps prevent?",
            [
              "Cross-Site Request Forgery attacks",
              "SQL Injection",
              "XSS attacks",
              "DDoS attacks"
            ],
            0
          ],
          [
            "Add {% csrf_token %} in a form template to?",
            [
              "Include a hidden CSRF security token in the form for protection",
              "Validate form fields",
              "Submit the form via AJAX",
              "Style the form"
            ],
            0
          ]
        ]
      ],
      [
        "Django #5: Django REST Framework & APIs",
        "ejctYHwdylg",
        [
          [
            "Django REST Framework (DRF) is used to?",
            [
              "Build RESTful Web APIs with Django rapidly",
              "Create HTML templates",
              "Manage CSS files",
              "Set up database connections"
            ],
            0
          ],
          [
            "DRF Serializers are responsible for?",
            [
              "Converting model instances to JSON and validating incoming data",
              "Rendering HTML templates",
              "Managing URL routing",
              "Handling file uploads only"
            ],
            0
          ],
          [
            "DRF 'ModelViewSet' provides?",
            [
              "Complete CRUD API endpoints (list, create, retrieve, update, delete) automatically",
              "Only GET requests",
              "Only POST requests",
              "Only authentication"
            ],
            0
          ],
          [
            "What HTTP status code indicates a new resource was successfully created?",
            [
              "201 Created",
              "200 OK",
              "204 No Content",
              "301 Redirect"
            ],
            0
          ],
          [
            "Connecting DRF routers automatically generates?",
            [
              "URL patterns for all ViewSet actions",
              "Database migrations",
              "HTML forms",
              "Admin interfaces"
            ],
            0
          ]
        ]
      ],
      [
        "Django #6: Admin Panel & Deployment",
        "REpwvT_w4pA",
        [
          [
            "Django's built-in Admin panel at /admin/ provides?",
            [
              "A full web interface to manage database records without custom code",
              "API documentation only",
              "User-facing website",
              "Deployment tools"
            ],
            0
          ],
          [
            "Register a model 'Post' in Django Admin using?",
            [
              "admin.site.register(Post)",
              "admin.add(Post)",
              "site.register('Post')",
              "Admin.register(Post)"
            ],
            0
          ],
          [
            "To collect all static files for production deployment, run?",
            [
              "python manage.py collectstatic",
              "python manage.py static",
              "django-admin copystatic",
              "python manage.py buildstatic"
            ],
            0
          ],
          [
            "Which Python package helps serve Django apps in production (not dev server)?",
            [
              "gunicorn (Green Unicorn WSGI server)",
              "flask-server",
              "uvicorn only",
              "apache2 directly"
            ],
            0
          ],
          [
            "Django's DEBUG = False in production is important because?",
            [
              "Hides sensitive error details from end users for security",
              "Speeds up the server",
              "Enables caching",
              "Reduces database queries"
            ],
            0
          ]
        ]
      ]
    ]
  },
  {
    "id": "flutter",
    "t": "Flutter Complete Tutorial (Hindi)",
    "cat": "Mobile Development",
    "ic": "Fl",
    "c": 15,
    "by": "Thapa Technical",
    "v": [
      [
        "Flutter #1: Intro, Installation & First App",
        "jqxz7QvdWk8",
        [
          [
            "Flutter is a?",
            [
              "Google's UI toolkit for building natively compiled apps from a single codebase",
              "An Android-only framework",
              "A JavaScript library",
              "A Python framework"
            ],
            0
          ],
          [
            "Flutter uses which programming language?",
            [
              "Dart",
              "JavaScript",
              "Kotlin",
              "Swift"
            ],
            0
          ],
          [
            "Flutter's main advantage is?",
            [
              "Single codebase for iOS, Android, Web, and Desktop apps",
              "Fastest mobile apps ever",
              "No coding needed",
              "Only for iOS"
            ],
            0
          ],
          [
            "The command to create a new Flutter project is?",
            [
              "flutter create my_app",
              "dart new my_app",
              "flutter new project",
              "create flutter my_app"
            ],
            0
          ],
          [
            "Command to run a Flutter app on a connected device/emulator?",
            [
              "flutter run",
              "dart run",
              "flutter start",
              "flutter launch"
            ],
            0
          ]
        ]
      ],
      [
        "Flutter #2: Dart Fundamentals for Flutter",
        "fnpD5NCzIIo",
        [
          [
            "Dart is a?",
            [
              "Strongly-typed, object-oriented language developed by Google",
              "A scripting language by Apple",
              "A database query language",
              "A markup language"
            ],
            0
          ],
          [
            "Declare a list (array) in Dart?",
            [
              "List<int> nums = [1, 2, 3];",
              "int[] nums = {1,2,3};",
              "var nums = new Array(1,2,3);",
              "nums = list[1,2,3];"
            ],
            0
          ],
          [
            "Dart 'final' vs 'const' difference?",
            [
              "final: runtime constant; const: compile-time constant",
              "They are identical",
              "const allows reassignment",
              "final is always global"
            ],
            0
          ],
          [
            "How to define a function in Dart?",
            [
              "String greet(String name) { return 'Hello $name'; }",
              "function greet(name) { return name; }",
              "def greet(name): return name",
              "greet(name) => { return name }"
            ],
            0
          ],
          [
            "A Dart class uses which keyword for inheritance?",
            [
              "extends",
              "implements only",
              "inherits",
              "super"
            ],
            0
          ]
        ]
      ],
      [
        "Flutter #3: Widgets - Container, Text & Layout",
        "_R4Pr3tR0uY",
        [
          [
            "In Flutter, everything is a?",
            [
              "Widget (UI building block)",
              "Component",
              "View",
              "Activity"
            ],
            0
          ],
          [
            "The difference between Stateless and Stateful widgets?",
            [
              "Stateless: immutable UI; Stateful: UI can change dynamically with setState()",
              "Stateless is newer",
              "Stateful cannot have children",
              "Stateless uses more memory"
            ],
            0
          ],
          [
            "Flutter 'Container' widget is used for?",
            [
              "Adding padding, margin, decoration, size, and color to a child widget",
              "Only displaying text",
              "Only handling gestures",
              "Database storage"
            ],
            0
          ],
          [
            "Flutter 'Column' widget arranges children?",
            [
              "Vertically top to bottom",
              "Horizontally left to right",
              "In a grid",
              "Overlapping"
            ],
            0
          ],
          [
            "Flutter 'Row' widget arranges children?",
            [
              "Horizontally left to right",
              "Vertically",
              "In a circle",
              "Randomly"
            ],
            0
          ]
        ]
      ],
      [
        "Flutter #4: Navigation & State Management",
        "1YxHlJyjQWM",
        [
          [
            "Navigate to a new screen in Flutter using?",
            [
              "Navigator.push(context, MaterialPageRoute(builder: (c) => NewScreen()))",
              "navigate.to(NewScreen())",
              "Router.go('/new-screen')",
              "Screen.open(NewScreen)"
            ],
            0
          ],
          [
            "Go back to the previous screen in Flutter?",
            [
              "Navigator.pop(context)",
              "Navigator.back(context)",
              "Route.back()",
              "context.pop()"
            ],
            0
          ],
          [
            "setState() in a StatefulWidget is used to?",
            [
              "Notify Flutter that the widget's state changed, triggering a UI rebuild",
              "Save data to local storage",
              "Navigate to a new screen",
              "Send data to a server"
            ],
            0
          ],
          [
            "Pass data from one screen to another in Flutter by?",
            [
              "Passing it as a constructor parameter to the new Widget class",
              "Using global variables only",
              "Using database always",
              "Through the Navigator class directly"
            ],
            0
          ],
          [
            "Flutter 'SharedPreferences' is used for?",
            [
              "Storing simple key-value data persistently on the device",
              "Network requests",
              "Complex database queries",
              "Image caching"
            ],
            0
          ]
        ]
      ],
      [
        "Flutter #5: Lists, Grids & User Input",
        "z323YS-UDr4",
        [
          [
            "Flutter 'ListView.builder()' is used to?",
            [
              "Efficiently render a scrollable list of many items on demand",
              "Create a static list",
              "Display a grid layout",
              "Handle keyboard input"
            ],
            0
          ],
          [
            "Flutter 'GridView' displays items in a?",
            [
              "2D scrollable grid (rows and columns)",
              "Single column only",
              "Horizontal scroll only",
              "Circular layout"
            ],
            0
          ],
          [
            "Flutter 'TextField' widget is used for?",
            [
              "Getting text input from the user",
              "Displaying read-only text",
              "Navigation",
              "Animation"
            ],
            0
          ],
          [
            "Control and read a TextField's text value using?",
            [
              "TextEditingController",
              "TextController",
              "InputController",
              "FieldManager"
            ],
            0
          ],
          [
            "Flutter 'ElevatedButton' is?",
            [
              "A Material Design button with a shadow/elevation effect",
              "A flat borderless button",
              "An icon button",
              "A toggle switch"
            ],
            0
          ]
        ]
      ],
      [
        "Flutter #6: Animations & Local Storage",
        "hiZcVbyukBo",
        [
          [
            "Flutter's 'Hero' animation creates?",
            [
              "A shared-element transition between two screens for a smooth navigation effect",
              "A fade animation",
              "A slide from left animation",
              "A loading spinner"
            ],
            0
          ],
          [
            "'AnimatedContainer' automatically animates?",
            [
              "Property changes like size, color, padding over a specified duration",
              "Only opacity changes",
              "Only position changes",
              "Only color changes"
            ],
            0
          ],
          [
            "Flutter SQLite package 'sqflite' is used for?",
            [
              "Storing structured relational data locally on device",
              "Network calls",
              "State management",
              "Image processing"
            ],
            0
          ],
          [
            "Flutter 'SharedPreferences' can store which data types?",
            [
              "Strings, ints, doubles, booleans, and string lists",
              "Only strings",
              "Any Dart object",
              "Only integers"
            ],
            0
          ],
          [
            "What is Flutter State Management and why is it needed?",
            [
              "Managing app data/state across widgets efficiently to avoid code complexity",
              "Only for animations",
              "Only for API calls",
              "Only for navigation"
            ],
            0
          ]
        ]
      ]
    ]
  }
];
