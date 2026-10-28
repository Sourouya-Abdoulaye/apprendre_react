import { useState } from "react";


export default function App() {
    console.log("Render");

    const [teams, SetTeams] = useState<string[]>([
        "Epervier",
        "black start",
        "Les Elephant"
    ])


    // fontion delete last teams

    const deleteLastTeam = () => {
       teams.pop()
    //    SetTeams(Array.from(teams))
     SetTeams([...teams])
    }






    return <>
        <h3>Les Equipe</h3>
        <div>
            <ul>
                {teams.map((team,index)=>{
                    return <li key={index} >{team}</li>
                })}
            </ul>
        </div>

        <button onClick={deleteLastTeam} >Delete last</button>
    </>
}