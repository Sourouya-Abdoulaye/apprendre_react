import { useState, useEffect } from "react";

interface Team {
    id: number;
    cover: string;
    name: string;
    players_number: number;
    coach: string;
    capitaine: string;
    slogan: string;
}

const API = "http://127.0.0.1:3000";

export function TeamForm() {
    const [team, setTeam] = useState<Team>({
        id: 0,
        cover: "",
        name: "",
        players_number: 0,
        coach: "",
        capitaine: "",
        slogan: "",
    });

    const [teams, setTeams] = useState<Team[]>([]);

    // ✅ Récupérer la liste au montage
    const fetchTeams = async () => {
        try {
            const res = await fetch(`${API}/teams`);
            const data = await res.json();
            setTeams(data);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const newTeam: Team = {
            id: 0,
            cover: form.get("cover") as string,
            name: form.get("name") as string,
            players_number: Number(form.get("players_number")),
            coach: form.get("coach") as string,
            capitaine: form.get("capitaine") as string,
            slogan: form.get("slogan") as string,
        };

        try {
            const response = await fetch(`${API}/teams`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTeam),
            });

            const data = await response.json();
            setTeam(data);

            // ✅ Rafraîchir la liste après création
            fetchTeams();

            // Réinitialiser le formulaire
            e.currentTarget.reset();
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };

    return (
        <>
            <h2>Créer une équipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom de l'équipe</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label htmlFor="cover">Image de couverture</label>
                    <input type="text" name="cover" placeholder="images/ghana.jpg" />
                </div>
                <div>
                    <label htmlFor="players_number">Nombre de joueurs</label>
                    <input type="number" name="players_number" />
                </div>
                <div>
                    <label htmlFor="coach">Entraîneur</label>
                    <input type="text" name="coach" />
                </div>
                <div>
                    <label htmlFor="capitaine">Capitaine</label>
                    <input type="text" name="capitaine" />
                </div>
                <div>
                    <label htmlFor="slogan">Slogan</label>
                    <input type="text" name="slogan" />
                </div>
                <div>
                    <button type="submit">Enregistrer</button>
                </div>
            </form>

            {/* ✅ Liste des équipes */}
            <h2>Équipes</h2>
            {teams.length === 0 ? (
                <p>Aucune équipe trouvée.</p>
            ) : (
                <ul>
                    {teams.map((t) => (
                        <li key={t.id}>
                            <strong>{t.name}</strong> — {t.slogan}{" "}
                            <span>({t.coach}, {t.capitaine})</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* <Info team={team} /> */}
        </>
    );
}

function Info({ team }: { team: Team }) {
    if (!team.name) return null;
    return (
        <div>
            <strong>Nom :</strong> <span>{team.name}</span> <br />
            <strong>Couverture :</strong> <span>{team.cover}</span> <br />
            <strong>Joueurs :</strong> <span>{team.players_number}</span> <br />
            <strong>Entraîneur :</strong> <span>{team.coach}</span> <br />
            <strong>Capitaine :</strong> <span>{team.capitaine}</span> <br />
            <strong>Slogan :</strong> <span>{team.slogan}</span>
        </div>
    );
}   