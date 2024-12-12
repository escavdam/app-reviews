# Flujo de trabajo con ramas

1. **Trabajar en una rama del repositorio principal**
   - Cada tarea se realiza en una rama específica creada desde la rama principal (`main`).
   - Crear una nueva rama con:
     ```bash
     git checkout -b <nombre-de-la-rama>
     ```

2. **Mantener la rama principal actualizada**
   - Antes de empezar a trabajar, asegúrate de que tu rama principal local esté actualizada:
     ```bash
     git pull origin main
     ```

3. **Integrar los cambios de la rama principal en tu rama de trabajo**
   - Si la rama principal ha recibido cambios mientras trabajas, integra esos cambios en tu rama:
     ```bash
     git merge main
     ```

4. **Documentar cambios**
   - Antes de fusionar tu rama a la rama principal, documenta los cambios realizados en el archivo `README.md` u otros documentos relevantes.

5. **Crear un pull request desde tu rama**
   - Una vez completada la tarea, crea un pull request para fusionar tu rama en la rama principal.

Cumplir con estas reglas nos ayudará a mantener un flujo de trabajo eficiente y ordenado.

/////////////////////   In English   //////////////////// 

# Workflow with Branches

1. **Work on a branch of the main repository**
   - Each task is carried out in a specific branch created from the main branch (`main`).
   - Create a new branch with:
     ```bash
     git checkout -b <branch-name>
     ```

2. **Keep the main branch updated**
   - Before starting work, ensure your local main branch is up to date:
     ```bash
     git pull origin main
     ```

3. **Integrate changes from the main branch into your working branch**
   - If the main branch receives changes while you are working, integrate those changes into your branch:
     ```bash
     git merge main
     ```

4. **Document changes**
   - Before merging your branch into the main branch, document the changes made in the `README.md` file or other relevant documents.

5. **Create a pull request from your branch**
   - Once the task is complete, create a pull request to merge your branch into the main branch.

Following these rules will help us maintain an efficient and organized workflow.