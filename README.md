[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0302N4UV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856539&assignment_repo_type=AssignmentRepo)

# API DOCS - Individual Project Phase 2 - Chef Partner

### A cooking recipe app that speaks!

## Endpoints:

### User Registration and Logins

- POST /login
- POST /register
- POST /google-auth

### Recipe query and details CRUD

- GET /recipe - [Ninja API](https://api-ninjas.com/api)
- GET /favorite
- POST /favorite
- GET /favorite/:id
- PUT /favorite/:id
- DELETE /favorite/:id

### GetPocket API

[GetPocket API](https://getpocket.com/developer/)

- POST /pocketCode
- POST /pocketAuthorize
- POST /pocket

# Endpoint requests documentation

## Register

- http://localhost:3000/register

- request body

```
{
    email: chris@mail.com,
    password: 12345,
    username: chrisjs
}

```

- response - success 201

```
{
    "output": {
        "id": 11,
        "username": "chrisjs",
        "email": "chris11@mail.com"
    }
}
```

- response - error duplicate email - 400

```
{
    "message": "Unique Constraint Error"
}
```

- response - validation error(s) - 400

```
{
    "message": "Validation Error",
    "errors": [
        "username cannot be empty",
        "email cannot be empty",
        "Validation isEmail on email failed",
        "password cannot be empty"
    ]
}
```

## Login

- http://localhost:3000/login

- request body

```
{
    email: chris@mail.com,
    password: 12345,
}

```

- response - success 200

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6ImNocmlzanMiLCJlbWFpbCI6ImNocmlzMTFAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY0ODB9.YhuQPHExRmz68TEeJnxXoAIIdI9ZBQdqLIF4g6oSANA",
    "name": "chrisjs"
}
```

- response - error invalid email/password - 401

```
{
    "message": "Invalid email/password"
}
```

## Recipe

- https://chrisjsuryo.tech/recipe?query=fried+rice&offset=22

- request params

```
{
    query: "fried rice"
    offset: 22,
}

```

- request headers - Authorization

```
{
    access_token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiY2hyaXNqcyIsImVtYWlsIjoiY2hyaXNAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY5NzZ9.pglYQn-AYDx_GbvbW2CXQdnW6PYulG90f9rE8gUO9_g`
}
```

- response - success 200

```
[
    {
        "title": "Emeril's Fried Rice",
        "ingredients": "1/4 c Peanut oil|3 c Cooked white rice|1/2 c Chopped green onions|1/2 c Shredded roasted pork|1/2 c Diced shrimp|1/2 c Diced Chinese sausage|2 ts Minced garlic|3 Eggs|1 1/2 tb Soy sauce|2 tb Sesame oil|3 tb Finely chopped parsley|2 c Stir-fry vegetables|1 tb Finely chopped parsley|5 Wonton wrappers, julienne,; fried until golden brown",
        "servings": "1 Servings",
        "instructions": "Heat the oil in the wok. Toss in the rice until hot and golden. Toss in the~ green onions, pork, shrimp, and sausage. Stir in the garlic, eggs, soy sauce, sesame oil and parsley. Stir-fry for 2 minutes. Season with salt and pepper. Mound the rice in the center of the vegetables. Garnish with parsley and fried wontons. :ESSENCE OF EMERIL SHOW#EE2378"
    },
    {
        "title": "Mediterranean Fried Rice",
        "ingredients": "**FOR THE SAUCE**|2 tb Lemon juice|2 tb Tomato paste|1/4 ts Saffron; soaked*|Salt|Freshly ground pepper",
        "servings": "4 servings",
        "instructions": "~ - - - - 1 1/2 tablespoons extra-virgin olive oil (up to 2 tbsp) 2 cloves garlic (up to 3 cloves) -- minced 1 leek, cleaned and trimmed -- finely chopped 1/4 cup fennel -- thinly sliced OR celery -- thinly sliced 3 cups cooked white rice (up to 4 c) 1 tomato -- seeded and diced 1/4 cup chickpeas 2 tablespoons pine nuts -- lightly toasted 8 black olives (pref oil-cured) 3 dried tomatoes -- cut in thin slices 1 bunch basil -- stemmed * Soak saffron in 1 tabelspoon water or Basic Vegetable Stock for 15 minutes For the sauce, combine the lemon juice, tomato paste, saffron, salt, and pepper in a small bowl and whisk until smooth. Add plenty of salt and pepper. The mixture should be highly seasoned. Just before serving, heat a wok or large non-stick frying pan over a high flame. Swirl in the oil. Add the garlic and leek and stir fry for 15 seconds, or until fragrant but not brown. Add the fennel and stir fry for 1 to 2 minutes, or until the fennel is tender. Stir in the rice, tomato, chickpeas, pine nuts, olives, and dried tomatoes, and most of the basil. Stir fry for 2 minutes, or until the ingredients are thoroughly heated. Stir in the sauce and cook for thirty seconds. Correct the seasoning, adding salt or lemon juice to taste. Decorate the rice with the remaining basil leaves and serve at once. Serves 6 as a side dish or 4 as a main course."
    },
]
```

## GET Favorite

- http://localhost:3000/favorite

- request headers - Authorization

```
{
    access_token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiY2hyaXNqcyIsImVtYWlsIjoiY2hyaXNAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY5NzZ9.pglYQn-AYDx_GbvbW2CXQdnW6PYulG90f9rE8gUO9_g`
}
```

- response - success 200

```
[
    {
        "id": 9,
        "title": "12 Felvideki Finom Nulleves (Hare Soup From Northern Hungary)",
        "ingredients": "1 Hare; head, neck, kidney, heart, lung and liver|1 Parsnips|1 Celery knob|1 Kohlrabi|1 Carrots|1 pn Caraway seeds|Salt|2 tb Lard|1 sm Onions; minced|1 Garlic cloves; crushed|6 Peppercorns, black; crushed|1 tb Flour, all-purpose|1/4 c Rice; uncooked",
        "instructions": "Do not wash the hare parts overly, try to leave some blood. Put all the parts except the liver in a pot with 3 quarts water, and bring to a boil. Skim well. Peel vegetables except onion and dice. Add to pot with caraway seeds and 1 tablespoon salt. Keep heat very low and let soup simmer. Melt lard, add minced onion, crushed garlic and the hare liver, diced. Sprinkle with black pepper. Brown onion and liver fast, then dust with flour. Stir well and cook for a few minutes more. Add a ladle of broth from the soup pot. Stir well and pour into the soup pot. Put rice into the soup pot and cook till it is done. Adjust salt. Variation: add 3 tablespoons lemon juice, or whip lemon juice with sour cream at last minute.",
        "servings": "10 Servings",
        "userId": 3,
        "createdAt": "2023-11-16T16:24:36.855Z",
        "updatedAt": "2023-11-16T16:27:13.788Z"
    }
]
```

## POST Favorite

- http://localhost:3000/favorite

- request body

```
{
    title: "Mushroom Soup",
    servings: 10,
    ingredients: "Mushroom, More Mushroom"
    instructions: "Chop the mushrooms. Boil the mushrooms. Serve the mushrooms"
}



```

- response - success 201

```
{
    "message": "Mushroom Soup has been saved to favorites!"
}
```

- request headers - Authorization

```
{
    access_token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiY2hyaXNqcyIsImVtYWlsIjoiY2hyaXNAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY5NzZ9.pglYQn-AYDx_GbvbW2CXQdnW6PYulG90f9rE8gUO9_g`
}
```

- response - validation errors 400

```
{
    "message": "Validation Error",
    "errors": [
        "title cannot be empty",
        "ingredients cannot be empty",
        "instructions cannot be empty",
        "servings cannot be empty"
    ]
}
```

## GET Favorite Recipe by Id

- http://localhost:3000/favorite/4

- request headers - Authorization

```
{
    access_token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiY2hyaXNqcyIsImVtYWlsIjoiY2hyaXNAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY5NzZ9.pglYQn-AYDx_GbvbW2CXQdnW6PYulG90f9rE8gUO9_g`
}
```

- request params

```
{
    id:4
}
```

- response - success 201

```

{
"id": 4,
"title": "Felvideki Finom Nulleves (Hare Soup From Northern Hungary)",
"ingredients": "1 Hare; head, neck, kidney, heart, lung and liver|1 Parsnips|1 Celery knob|1 Kohlrabi|1 Carrots|1 pn Caraway seeds|Salt|2 tb Lard|1 sm Onions; minced|1 Garlic cloves; crushed|6 Peppercorns, black; crushed|1 tb Flour, all-purpose|1/4 c Rice; uncooked",
"instructions": "Do not wash the hare parts overly, try to leave some blood. Put all the parts except the liver in a pot with 3 quarts water, and bring to a boil. Skim well. Peel vegetables except onion and dice. Add to pot with caraway seeds and 1 tablespoon salt. Keep heat very low and let soup simmer. Melt lard, add minced onion, crushed garlic and the hare liver, diced. Sprinkle with black pepper. Brown onion and liver fast, then dust with flour. Stir well and cook for a few minutes more. Add a ladle of broth from the soup pot. Stir well and pour into the soup pot. Put rice into the soup pot and cook till it is done. Adjust salt. Variation: add 3 tablespoons lemon juice, or whip lemon juice with sour cream at last minute.",
"servings": "10 Servings",
"userId": 6,
"createdAt": "2023-11-15T18:26:52.813Z",
"updatedAt": "2023-11-15T18:26:52.813Z"
}

```

- response - error Recipe not found 404

```

{
"message": "Recipe Not Found"
}

```

## PUT (UPDATE) Favorite Recipe by Id

- http://localhost:3000/favorite/4

- request headers - Authorization

```
{
    access_token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiY2hyaXNqcyIsImVtYWlsIjoiY2hyaXNAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY5NzZ9.pglYQn-AYDx_GbvbW2CXQdnW6PYulG90f9rE8gUO9_g`
}
```

- request params

```
{
    id:4
}
```

- request body

```
{
    "title": "Felvideki Finom Nulleves (Hare Soup From Northern Hungary)",

    "ingredients": "1 Hare; head, neck, kidney, heart, lung and liver|1 Parsnips|1 Celery knob|1 Kohlrabi|1 Carrots|1 pn Caraway seeds|Salt|2 tb Lard|1 sm Onions; minced|1 Garlic cloves; crushed|6 Peppercorns, black; crushed|1 tb Flour, all-purpose|1/4 c Rice; uncooked",

    "instructions": "Do not wash the hare parts overly, try to leave some blood. Put all the parts except the liver in a pot with 3 quarts water, and bring to a boil. Skim well. Peel vegetables except onion and dice. Add to pot with caraway seeds and 1 tablespoon salt. Keep heat very low and let soup simmer. Melt lard, add minced onion, crushed garlic and the hare liver, diced. Sprinkle with black pepper. Brown onion and liver fast, then dust with flour. Stir well and cook for a few minutes more. Add a ladle of broth from the soup pot. Stir well and pour into the soup pot. Put rice into the soup pot and cook till it is done. Adjust salt. Variation: add 3 tablespoons lemon juice, or whip lemon juice with sour cream at last minute.",

    "servings": "10 Servings",
}
```

- response - success 200

```

{
    "message": "The recipe has been Updated!"
}

```

- response - error Recipe not found 404

```

{
"message": "Recipe Not Found"
}

```

## DELETE Favorite Recipe by Id

- http://localhost:3000/favorite/4

- request headers - Authorization

```
{
    access_token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiY2hyaXNqcyIsImVtYWlsIjoiY2hyaXNAbWFpbC5jb20iLCJpYXQiOjE3MDAxNTY5NzZ9.pglYQn-AYDx_GbvbW2CXQdnW6PYulG90f9rE8gUO9_g`
}
```

- request params

```
{
    id:4
}
```

- response - success 200

```

{
    "message": "The recipe has been Deleted!"
}

```

- response - error Recipe not found 404

```

{
"message": "Recipe Not Found"
}

```

## GetPocket - Get user access code - POST

- https://getpocket.com/v3/oauth/request

- request body

```
{
    consumer_key: 109579-7f6b37b533290f4eef94583,
    redirect_uri: http://localhost:5173
}
```

- response - success 200

```

{
    code=200e4a1b-e245-738b-cb01-90c1b0
}

```

- response - error Wrong app Consumer Key 403

```

{
403 Forbidden
}

```

## GetPocket - Authorize user access code to get the GetPocket user token - POST

- https://getpocket.com/v3/oauth/authorize

- request body

```
{
    consumer_key: 109579-7f6b37b533290f4eef94583,
    code: c548defd-0a56-7040-026a-af62a8
}
```

- response - success 200

```

{
    token: 17548cf1-dd6b-b3a1-47cb-0d7c0d
}

```

- response - error Wrong app Consumer Key 403

```

{
403 Forbidden
}

```

## GetPocket - Add Recipe Article to GetPocket - POST

- https://getpocket.com/v3/add

- request query params

```
{
    url: "http://localhost:3000/detail/5",
    title: "Chicken Soup",
    tags: "recipe",
    consumer_key: 109579-7f6b37b533290f4eef94583,
    access_token: 9a08b576-5f3a-40ba-2e8a-35c486
}
```

- response - success 200

```

{
    "item": {
        "item_id": "3966413987",
        "normal_url": "http://chef-partner.vercel.app/detail/18",
        "resolved_id": "3966413987",
        "extended_item_id": "3966413987",
        "resolved_url": "https://chef-partner.vercel.app/detail/18",
        "domain_id": "69353784",
        "origin_domain_id": "69353784",
        "response_code": "200",
        "mime_type": "text/html",
        "content_length": "555",
        "encoding": "utf-8",
        "date_resolved": "2023-11-16 11:18:51",
        "date_published": "0000-00-00 00:00:00",
        "title": "Vite + React",
        "excerpt": "",
        "word_count": "0",
        "innerdomain_redirect": "1",
        "login_required": "0",
        "has_image": "0",
        "has_video": "0",
        "is_index": "0",
        "is_article": "0",
        "used_fallback": "0",
        "lang": "en",
        "time_first_parsed": "1700155131",
        "authors": [],
        "images": [],
        "videos": [],
        "resolved_normal_url": "http://chef-partner.vercel.app/detail/18",
        "given_url": "https://chef-partner.vercel.app/detail/18"
    },
    "status": 1
}

```

# GLOBAL ERRORS

### 403 Forbidden

```
{
    "message": "No Access"
}
```

### 401 Unauthorized

```
{
    "message": "Invalid Token"
}
```
