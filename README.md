<h2>Ejecución de API Rest</h2>

<p>Para levantar el servicio, se ejecutaran los siguientes comandos con la terminal ubicada dentro de la carpeta del proyecto:</p>

```npm
    npm install
    npm run tsc
    npm run start
```

<p>Se debe tener en cuenta que por defecto se ejecuta en localhost en el puerto 8080.</p>

<h3>Acerca de la prueba de endpoints</h3>

<p>Para probar los endpoints disponibles, se recomienda instalar la extensión 'Thunder Client' de VSCode e importar la colección correspondientes al modelo 'user' con las peticiones ya armadas para su prueba, dicha colección se encuentra en el path "src/thunder-client/users-collection.json".</p>

<p>El formato de los usuarios obtenidos es el siguiente:</p>

```typescript
interface User {
  id: number; // Autogenerado, solo se utiliza para actualizar un usuario o eliminarlo
  name: string;
  email: string;
  create_date: string; // Autogenerado, su valor es un date-string con el siguiente patrón -> 'YYYY-mm-dd HH:mm:ss'
}
```

<h2>Endpoints</h2>

<p><b>/list</b> | Devuelve un array con todos los usuarios disponibles:</p>

```typescript
router.get('/list', (_req, res) => {
  res.status(200).send(service.getUsers());
});
```

<p><b>/add</b> | Crea un usuario, recibiendo un json por el body con 'name' y 'email' (demás atributos son autogenerados):</p>

```json
{
  "name": "",
  "email": ""
}
```

```typescript
router.post('/add', (req, res) => {
  try {
    const newUser = service.getNewUser(req.body);
    const addedUser = service.addUser(newUser);
    res
      .status(200)
      .json({ data: addedUser, message: 'User created successfully!' });
  } catch (e: any) {
    if (e instanceof Error) res.status(400).send(e.message);
    else res.sendStatus(400);
  }
});
```

<p><b>/update</b> | Actualiza un usuario, recibiendo un json por el body con 'id', 'name', 'email' 
e incluso 'create_date' (todos los atributos deben enviarse por el body, aunque 
únicamente el id es requerido, demás atributos pueden viajar vacios):</p>

```json
{
  "id": 0,
  "name": "",
  "email": "",
  "create_date": ""
}
```

```typescript
router.put('/update', (req, res) => {
  try {
    const editUser = service.getEditUser(req.body);
    const updatedUser = service.updateUser(editUser);
    res.status(200).json({
      data: updatedUser,
      message: 'User edited successfully!',
    });
  } catch (e: any) {
    if (e instanceof Error) {
      let code = e.message.includes('not found') ? 404 : 400;
      res.status(code).send(e.message);
    } else res.sendStatus(400);
  }
});
```

<p><b>/delete/:id</b> | Recibe como path-var el 'id' del usuario a eliminar:</p>

```typescript
router.delete('/delete/:id', (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const deletedUser = service.deleteUser(id);
    res.status(200).json({
      data: deletedUser,
      message: 'User successfully deleted!',
    });
  } catch (e: any) {
    if (e instanceof Error) {
      let code = e.message.includes('not found') ? 404 : 400;
      res.status(code).send(e.message);
    } else res.sendStatus(400);
  }
});
```
