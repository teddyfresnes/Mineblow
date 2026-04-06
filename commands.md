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
- `/weather <clear|cloudy_light|cloudy_heavy|overcast|rain|rain_light|rain_heavy|snow|snow_heavy|storm>`
- `/weather auto`
- `/weather setClouds <0-100|0-1|auto>`
- `/weather setRain <0-100|0-1|auto>`
- `/weather setSky <auto|blue|soft|gray|storm>`
- `/weather debug`

### `/weather <preset>`

Force un preset meteo complet avec transition visuelle propre.

Presets:

- `clear`
- `cloudy_light`
- `cloudy_heavy`
- `overcast`
- `rain`
- `rain_light`
- `rain_heavy`
- `snow`
- `snow_heavy`
- `storm`

Exemples:

- `/weather clear`
- `/weather cloudy_light`
- `/weather rain`
- `/weather rain_heavy`
- `/weather snow`
- `/weather snow_heavy`
- `/weather storm`

### `/weather auto`

Reactive l'evolution automatique de la meteo.

### `/weather setClouds <0-100|0-1|auto>`

Force uniquement la couverture nuageuse.

Exemples:

- `/weather setClouds 15`
- `/weather setClouds 0.65`
- `/weather setClouds auto`

### `/weather setRain <0-100|0-1|auto>`

Force uniquement l'intensite de pluie.

Exemples:

- `/weather setRain 20`
- `/weather setRain 0.8`
- `/weather setRain auto`

### `/weather setSky <auto|blue|soft|gray|storm>`

Force uniquement le preset ciel.

Exemples:

- `/weather setSky blue`
- `/weather setSky gray`
- `/weather setSky storm`
- `/weather setSky auto`

### `/weather debug`

Affiche l'etat meteo courant, le mode auto/manuelle et les overrides actifs.
