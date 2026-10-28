import { useState } from "react";


export function RegisterForm() {

    const [username, setUsername] = useState<string>("");

    const get_data = (e) => {

        let champ_value=e.target.value;
        console.log(typeof(e))
        setUsername(champ_value)
    }

    return (
        <div>
            <label htmlFor="username">Username</label> <br />
            <input type="text"
                onChange={get_data}
                value={username}
            />
            <p>username saisie: {username} </p>
        </div>
    )
}