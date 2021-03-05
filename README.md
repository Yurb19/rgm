# test-crud
A small CRUD API using MongoDB and JWTs

this app can be tested at https://crud-test-vnme.herokuapp.com/

## how to install

just run this command in the root folder

```bash
 npm install
```

## Routes

The API has two main Routes

- api/auth
- api/users

1. ***api/auth*** - contains two subroutes
    - POST **api/auth/signup** - creates a new user 

    ```json
    //Request must have this body template
    {
      "username": "test_username",
      "password": "12345678"
    }
    ```

    - POST **api/auth/signin** - logs in and return a Bearer Token

    ```json
    //Request must have this body template
    {
      "username": "test_username",
      "password": "12345678"
    }
    ```
    
2. ***api/users*** - contains four subroutes
    - GET **api/users/** - gets all the users 
    - GET **api/users/:_id** - gets an user with the specified id
    
    ```js
      api/users/60419ac9a484b82ea8f25e36
    ```
    - PUT **api/users/:_id** - updates an user with the specified id
    ```json
    // Request must have this body template 
    {
      "name": "Ramon",
      "currentPassword": "12345678",
      "newPassword": "193jsXl.?$asJ"
    }
    ```
    
    - DELETE **api/users/:_id** - logically deletes an user with the specified id  
    ```js
      api/users/60419ac9a484b82ea8f25e36
    ```
    
    
 ## Note
 In order to access the users route, Authorization header must be filled with the Bearer Token
