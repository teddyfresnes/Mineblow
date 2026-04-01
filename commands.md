# Commands Wiki

## Chat

- `C` ouvre le chat texte.
- `H` ouvre le chat avec un `/` deja present pour taper une commande plus vite.
- Si un message commence par `/`, il est traite comme une commande.
- `Entree` valide.
- `Echap` ferme le chat.

## Commandes disponibles

### `/time clock <0-24>`

Regle l'heure du cycle jour/nuit.

- `0` = minuit
- `8` = levee du soleil
- `14` = midi
- `20` = coucher du soleil
- `24` = minuit

Exemples:

- `/time clock 0`
- `/time clock 8`
- `/time clock 14`
- `/time clock 20`

### `/time nextday`

Avance d'un jour complet. Pour l'instant, cela sert surtout a faire progresser correctement la phase de la lune.

Exemple:

- `/time nextday`

### `/time moon <1-8>`

Force directement la phase de lune a afficher.

- `1` = phase 1
- `8` = phase 8

Exemples:

- `/time moon 1`
- `/time moon 8`

## Usage en jeu

Si la commande `/time` echoue, le chat affiche l'usage adapte directement.

Formats actuels:

- `/time clock <0-24>`
- `/time nextday`
- `/time moon <1-8>`
