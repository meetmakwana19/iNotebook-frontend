import { createContext } from "react"

// made a new context to store all the states related to notes.
const noteContext = createContext();

export default noteContext;

// THIS FILE ONLY TELLS REACT THAT WE WANT TO USE useContext