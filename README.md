# Pre-requisites

1. NodeJS
2. npm or yarn
3. `create-react-app` package

# Imp Facts about ReactJS :

- A component imported will always end with backward slash eg.   ```<Component/>```
- Whatever is in curly braces that will be resolved as JS as it is JS. Eg. ````<h1>Hello {name}</h1>```` has ```let name = "Meet"``` as JS statement.

- Rect has 2 types of components -
  - Class based (old and can be confusing)
  - Function based (New easy trend, also easy syntax)
  
Therefore, now create-react-app also uses function based components. Eg. App.js has function App()
```bash
function App() {
    return(
        JSX (HTML which has worn a Javascript's crown with little change in tags naming convention)
        JSX is basically a syntax extension to write HTML with Javascript.

        This return() must only contain 1 primary div/element and then all other nested inside it. 
        Can't use div, h1, h2 multiple elements together.
        If want to use multiple tags then use 
        JSX fragment <>...h1,div,etc....</> to wrap multiple tags within return()

        Javascript uses semi-colon to end statement and semi colon after every statment in JSX might look bad 
        that's why return() has parenthesis (); 
        So we don't need to write ; for JS statements in JSX.
    )
}
```
- Babel compiles JSX down to React.createElement() calls.

These two examples are identical:

```bash
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
The above one is easy syntax for us to write and Babel converts the above syntax to the below one of React. Otherwise without this above syntax writing React would be a nightmare : (
```bash
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

## Tips : 

- If emmet for JSX is not enabled in vs code then,
  - Go to settings by ```Ctrl``` + ```,```
  - Search for emmets
  - In includeLanguages section, add key:value pair as ```javascript```: ```javascriptreact``` 
  - Or in settings.json do ```"javascript": "javascriptreact"``` in ```emmet.includeLanguages``` section
  
  This means when .js file extension is there then it will work as  javascriptreact.

### `App.js`

It imports App.css so can make custom elements in App.js and write their css in App.css
(* Can directly access any imported file in vs code by pressing ```Ctrl``` and then clicking on it.)

Imported logo so it gives a warning as it's code is commented. So will comment logo import logo statement too.

### `manifest.json` in public folder

manifest.json provides metadata used when your web app is installed on a
user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/

# Lifecycle of React components:

The series of events that happen from the mounting of a React component to its Unmounting.

•Mounting - Birth of your component 

•Update - Growth of your component

•Unmount - Death of your component

# Methods in Lifecycle of React components:

1. The **render()** method is used to render HTML of the component in react. This method is required for a class based component to render the DOM. It runs during the mounting and updating of your component. Render() method should be pure le you cannot modify state inside it!

2. The **componentDidMount()** method runs after the component output has been rendered to the DOM means after render() method. So mostly used when fetching(from API) and all such works need be done.

3. The **componentDidUpdate()** method is invoked as soon as the updating happens. The most common use case for the componentDidUpdate() method is updating the DOM in response to prop or state changes.

4. The **componentWillUnmount()** lifecycle method is called just before the component is unmounted and destroyed. Usually used to perform cleanups like when dont want to use that component again so will unmount it.

## Diagram version of above things - [Click here](projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

---
---

## Commonly used React Hooks :

### 1. **`useState`** -

Can update states and set inital state. Can use more than one time. Lets us use state in RFC.

Syntax -

```bash
const [ activeIndex, setActiveIndex] = useState(initialValue)

// shorthand syntax
const activeIndex = useState(initialValue)
```

useState usage in RCC vs RFC :
| RCC | RFC |
|-----------------------------------|------------------------------------------------------|
| `this.state = { activeIndex:0}` | `const [ activeIndex, setActiveIndex] = useState(0)` |
| `this.setState({ activeIndex:0})` | `setActiveIndex(2)` |
| `state = {activeIndex:0}` | `useState(0)` |

### 2. **`useEffect`** - 

Lets us use lifecycle methods of RCC in RFC Used for perform side-effect. Things which we do in `componentDidMount()`. Eg. to show alert on button click. Or can also do network calls

`useEffect` has 2 arguements -

```bash
useEffect(whatToExecute, whenToExecute)
    useEffect(() => {
        // do something like lifecycle method/network call
        console.log("useEffect ran");
        // for eg, make network call here only when searchString changes 

    }, []) //runs at only initial render
    }, ) //runs at every re-render
    }, [searchString]) //runs only when searchString changes
    }, [searchString, filter]) //can also give multiple conditions

```

The code inside useEffect hook's 2nd arguement(whenToExecute) can be configured to run in one of the three scenarios.
| [ ] | Nothing as 2nd argument | [data] |
|:--------------------------:|:--------------------------:|:------------------------------------------------------------------:|
| ↓ | ↓ | ↓ |
| Run only an initial render | Run only an initial render | Run only an initial render |
| | ↓ | ↓ |
| | Run after every re-render | Run after every re-render if data has changed since last re-render |

### 3. **`useContext`** - 

Helpful to work in a nested tree of states and functions and access them globally and easily.
- React Context API helps to avoid props uplifting and props dilling.
- React Context API is used using `useContext` hook.
- Some reference diagrams 
  - [Diagram 1](https://miro.medium.com/max/2000/1*Jx8BCxZFN2SCuhQtZqfgMQ.jpeg)
  - [Diagram 2](https://dmitripavlutin.com/90649ae4bdf379c482ad24e0dd220bc4/react-context-3.svg)
  - [Diagram 3](https://miro.medium.com/max/1356/1*EjDSOqhNOqIJ9wOqqFwKJQ.png)
- First context JS file needs to be made which can manage the states..... Then by importing the `useContext` hook in any component the states can be used anywhere in the application.

### 4. **`useRef`** - 

Returns a "Mutable reference object" which has `.current` property. Is a holder whose `.current` property can store any DOM element.
- Example :
  - Used **`useRef()`** hook to refer a element.
     1. Refered the `<button>` of a modal by adding `ref={ref}` into it.
     ```bash
     <button type="button" ref={ref1} />
     ```
     
     2. Wrote the `useRef()` code with initialValue= `null`
     ```bash
    // useRef Hook
    const ref1 = useRef(null)
     ```
     
     3. Used `ref.current.click()` in the updateNote() as we can use the functio by using `.current`. `useRef` is like a “box” that can hold a mutable value in its `.current` property.
    ```bash
        const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote)}
    ```
     4. Have a look at the [docs](https://reactjs.org/docs/hooks-reference.html#useref)

### 5. **`useLocation`** of react-router-dom 

This hook returns the current location object. This can be useful if you'd like to perform some side effect whenever the current location changes. 

Example when need to set the class as `active` for any navbar button when visiting that page. So for this will need to import the `useLocation` hook from react-router-dom and implement it like the following example :
```bash
import { React } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
    let location = useLocation();
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                </li>
            </ul>
        </nav>
)}

```

### 6. **`useNavigate`** of react-router-dom v6

In the older versions, this hook was called as `useHistory`.

The `useNavigate` hook returns a function that lets you navigate programmatically, for example after a form is submitted.

```bash
import { useNavigate } from "react-router-dom";

function SignupForm() {
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    await submitForm(event.target);
    navigate("../home", { replace: true });
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```
Replace `history.push('/home')` with `navigate('/home')`

---

# Using Props in ReactJS 



---



## Scenario 1 :

### In C1.js

Passing the prop in RFC

Passing the `notes`array as `props` using a variable `notes_prop` to the `NoteItem` RFC component

```bash
export const Notes = () => {
 
        const notes = [{
        "title": "1st Note",
        "description": "Adding my 1st note to the applicatin by being logged in",
    }]
    
    return (
        <div className='container'>
            <NoteItem notes_prop={notes}/>
        </div>
)}

```

### In C2.js

Getting the prop(consuming) in RFC.

Took the prop`notes_prop` passed from `C1.js` and used it in the return() method.

Remember, the name used in the `C1.js` for the props passing should be same in the `C2.js` for consuming it.

```bash
export const NoteItem = (props) => {
    // removing content from the prop passed by Notes.js
    const { notes_prop } = props;
    return (
        <div>
		   {/* displaying passed props values */}
            {notes_prop.title}
            {notes_prop.description}
        </div>
)}
```



---



## Scenario 2 :

### In `App.js` 

```bash
function App() {
  return (
      <Alert message="Alert is here"/>
  )}

```

### In `Alert.js`

```bash
export const Alert = (props) => {
    return (
        <div class="alert alert-warning" role="alert">
            {props.message}
        </div>
)}
```

---

## Tips :

1. For following common **error** 

```bash
Each child in a list should have a unique "key" prop.
Check the render method of `Notes`.
```

Added a key to the part from where error was coming 

```bash
<NoteItem key={note._id} note={note} />
```

2. Use `e.preventDefault();` to prevent page reload on any onClick/onChange/onSubmit like :
```bash
    const handleOnClick = (e) =>{
        e.preventDefault();
    }
```

3. For errors like following in RFC
```bash
React Hook useEffect has a missing dependency
```
Paste this at next to useEffect's closing paranthesi as we want to use it like RCC's **`componentDidMount()`** in RFC.
```bash
// eslint-disable-line react-hooks/exhaustive-deps
```

4. Exporting and importing ;
   1. If Exported with `default` like
   ```bash
   export default NoteState;
   ```
    then import like 
   ```bash
   import NoteState from './context/notes/NoteState';
   ```
   
   2. If Exported without `default` like
   
   ```bash
   export const SignUp = (props) => {...}
   ```
    then import like 
   ```bash
   import { SignUp } from './components/SignUp';
   ```
   