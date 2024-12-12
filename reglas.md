1. Creo la rama desde github
2. Clono el repo
3. Entro en mi rama con `git checkout <nombre rama>` o con el boton de vscode.
4. Añado/modifico codigo
5. Añado cambios con `git add .` o `git add <nombre archivo>`
6. Confirmo cambios con `git commit -m "mensaje"`, esto solo sube los cambios a la rama en la que estes
7. Pusheo cambios con `git push origin <nombre rama>`
8. Creo un pull request en github
9. Alguien deberá de recoger esta rama y `git merge main <nombre de rama>` (esto se hace desde el main)