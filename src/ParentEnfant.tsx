import { useState } from "react"
import { RegisterForm } from "./ControlleInput";


export function Parent() {
    const [message, setMessage] = useState<string>("message depuis parrent")



    const validateur_chaine = (chaine: string) => {

        if (chaine.length > 30) {
            throw new Error("La chaine est trop long. taille attendu: 30");
        }
        setMessage(chaine)
    }


    return <>
        <RegisterForm/>

        <Enfant
            text={message}
            setText={
                // (new_text) => console.log(new_text)
                validateur_chaine
            }
        />
    </>
}


// definire 
interface EnfantProps {
    text: string,
    // typer une fonction
    setText: (new_text: string) => void
}




export function Enfant({ text, setText }: EnfantProps) {

    const [initial] = useState<string>(text);

    const handleClear = () => setText("");
    const handleReset = () => setText(initial)


    return (
        <div>
            <p>{text}</p>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}