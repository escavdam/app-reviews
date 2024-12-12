# Funcionamiento con las ramas

1. Creo la rama desde github
2. Clono el repo
3. Entro en mi rama con `git checkout <nombre rama>` o con el boton de vscode.
4. Añado/modifico codigo
5. Añado cambios con `git add .` o `git add <nombre archivo>`
6. Confirmo cambios con `git commit -m "mensaje"`, esto solo sube los cambios a la rama en la que estes
7. Pusheo cambios con `git push origin <nombre rama>`
8. Creo un pull request en github
9. Alguien deberá de recoger esta rama y `git merge main <nombre de rama>` (esto se hace desde el main)

# Workflow with Branches

1. I create the branch from GitHub.
2. I clone the repo.
3. I switch to my branch with git checkout <branch name> or using the button in VSCode.
4. I add/modify code.
5. I stage changes with git add . or git add <file name>.
6. I commit changes with git commit -m "message", which only uploads the changes to the branch I’m on.
7. I push changes with git push origin <branch name>.
8. I create a pull request on GitHub.
9. Someone will need to pick up this branch and git merge main <branch name> (this is done from the main branch).