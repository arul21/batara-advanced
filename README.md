# batara-advanced

## Usage

```bash
git clone https://github.com/arul21/batara-advanced.git
```

```bash
cd batara-advanced
```

Run in the root folder

```bash
npm install
```

```javascript

create new file ".env" in the root folder, base key ".env-template"

```

Run in the root folder

```bash
npm run dev
# or
yarn dev
```

Open [localhost](http://localhost:3000) to view it in the browser.

---

Username & Password

```bash
username: "demo",
password: "demo",
```

---

## List of API Routers

| Route                    | HTTP | Description                            |
| ------------------------ | ---- | -------------------------------------- |
| /api/user/register       | POST | Route used to register a new user      |
| /api/user/login          | POST | Route used to let user signin to app   |
| /api/poke/:offset/:limit | GET  | Route used to get poke with pagination |
| /api/poke/:pokeId        | GET  | Route used to get poke detail          |

### Usage

---

POST
`/api/user/register `

- **Body**

```
{
    "username": "yourusername",
    "password": "yourpassword",
}
```

- **Response**

```
{
    "success": true,
    "message": "success create user",
    "data": {
        "username": "yourusername",
        "role": "member",
        "_id": "623e6f4a400d875d8c3be729",
        "createdAt": "2022-03-26T01:41:30.409Z",
        "updatedAt": "2022-03-26T01:41:30.409Z",
        "__v": 0
    }
}
```

---

POST
`/api/user/login `

- **Body**

```
{
    "username": "demo",
    "password": "demo",
}
```

- **Response**

```
{
    "success": true,
    "message": "Succesfully Login",
    "data": {
        "_id": "623e6f4a400d875d8c3be729",
        "username": "demo",
        "role": "member",
        "createdAt": "2022-03-26T01:41:30.409Z",
        "updatedAt": "2022-03-26T01:41:30.409Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNlNmY0YTQwMGQ4NzVkOGMzYmU3MjkiLCJyb2xlIjoibWVtYmVyIiwidXNlcm5hbWUiOiJkZW1vIiwiaWF0IjoxNjQ4MjU5MTUwfQ.r653VvnQEtWdv2MP3JLZMGvslNNxOL4I_QSEh_KtqH8"
}
```

---

GET
`/api/poke/:offset/:limit`

- **Params**

```
/api/poke/0/1
```

- **Headers**

```
Authorization : Bearer <Token>

example:
Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNlNmY0YTQwMGQ4NzVkOGMzYmU3MjkiLCJyb2xlIjoibWVtYmVyIiwidXNlcm5hbWUiOiJkZW1vIiwiaWF0IjoxNjQ4MjU5MTUwfQ.r653VvnQEtWdv2MP3JLZMGvslNNxOL4I_QSEh_KtqH8
```

- **Response**

```
{
    "success": true,
    "message": "success get pokes",
    "data": {
        "count": 1126,
        "results": [
            {
                "_id": "623eb32ad70a2d03ef4e6442",
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/",
                "pokeId": 1,
                "createdAt": "2022-03-26T06:31:06.910Z",
                "updatedAt": "2022-03-26T06:31:06.910Z",
                "__v": 0
            }
        ]
    }
}
```

---

GET
`/api/poke/:pokeId`

- **Params**

```
/api/poke/1
```

- **Headers**

```
Authorization : Bearer <Token>
```

- **Response**

```
{
    "success": true,
    "message": "success get pokes",
    "data": {
        "abilities": [
            {
                "ability": {
                    "name": "overgrow",
                    "url": "https://pokeapi.co/api/v2/ability/65/"
                },
                "is_hidden": false,
                "slot": 1
            },
            {
                "ability": {
                    "name": "chlorophyll",
                    "url": "https://pokeapi.co/api/v2/ability/34/"
                },
                "is_hidden": true,
                "slot": 3
            }
        ],
        etc....
    }
}
```
