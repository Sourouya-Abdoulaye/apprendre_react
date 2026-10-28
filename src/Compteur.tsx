import { useState } from "react";

export default function Compteur() {

    // setNbr fonction permettent de mettre a jours la valeur de la variable
    const [nbr, setNbr] = useState<number>(0)

    const incrementer = () => {
        console.log("+1");
        // nbr +=1;
        setNbr(nbr + 1);
        console.log(nbr)
    }

    const decrementer = () => {
        console.log("-1");
        // nbr +=1;
        if (nbr > 0) {
            setNbr(nbr - 1);
            console.log(nbr)
        }

    }

}