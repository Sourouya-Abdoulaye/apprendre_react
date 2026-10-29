# Réflexion sur l'API de gestion d'équipes de football

## Le modèle ressource

L'entité **équipe** est modélisée comme une **ressource** accessible via une URL.
La collection `/teams` représente l'ensemble, et `/teams/:id` une instance précise.
C'est le principe fondamental de REST : on manipule des **noms** (au pluriel),
jamais des verbes — le verbe est porté par la méthode HTTP.

##  Les endpoint ?

| Méthode | Rôle | Idempotence |
|---------|------|-------------|
| **GET** `/teams` | Lire la collection (sans effet de bord) | Oui |
| **GET** `/teams/:id` | Lire une ressource | Oui |
| **POST** `/teams` | Créer (génère un nouvel identifiant) | Non |
| **PUT** `/teams/:id` | **Remplacer** l'intégralité de la ressource | Oui |
| **PATCH** `/teams/:id` | **Modifier partiellement** (seuls les champs envoyés changent) | Non garantie |
| **DELETE** `/teams/:id` | Supprimer | Oui |


## Diagramme de classe
### Equipe
    id : entier,
    cover : image
    name : chaine
    players_number : nombre minimale
    coach : chaine de caractere
    capitaine :chaine de caractere
    quine: chaine de caractere


## Representation Json 
### Equipe
{  
    id : entier,  
    cover : image  
    name : chaine  
    players_number : nombre minimale  
    coach : chaine de caractere  
    capitaine :chaine de caractere  
    quine: chaine de caractere  
}  

