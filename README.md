# extension-chrome-ecole241

## Description
Une extension favorisant le partage et la communication entre les apprenants de l'Ecole 241 et leurs formateurs.

## Procédure d'installation

### Cloner le dépôt
Ouvrir le dossier de son choix, et dans le terminal, exécuter la commande suivante
```bash
git clone https://github.com/mendoc/extension-chrome-ecole241.git && exit
```
Ceci créera un dossier **extension-chrome-ecole241**
### Installer l'extension
* Accéder à la zone de gestion des **Extensions** de Google Chrome. Ou saisir `chrome://extensions` dans la barre d'addresse
* Cliquer sur le bouton de **Mode développeur**
* Cliquer sur le bouton **Chargez l'extension non empaquetée** et choisir le dossier **extension-chrome-ecole241**. Une icône apparaît à côté de la barre d'adresse 
* Fermer l'onglet de gestion des extensions.
* Terminé.

## Mettre à jour de l'extension
* Lancer le terminal depuis le dossier **extension-chrome-ecole241**
* Exécuter la commande suivante
```bash
git pull origin master && exit
```
* Accéder à la zone de gestion des **Extensions** de Google Chrome. Ou saisir `chrome://extensions` dans la barre d'addresse 
* Cliquer sur l'icone de rechargement afin de réinstaller l'extension
* Fermer l'onglet de gestion des extensions. 
* Terminé.

## Domaine d'action
L'extension n'est pas disponible lorsque l'internaute se trouve sur un onglet faisant référence à un fichier stocké en local.

## License

MIT License

Copyright (c) 2018 Dimitri ONGOUA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
