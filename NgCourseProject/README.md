# Pizza Delivery

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Тype:

Pizza shop. Order management from submit to dispatch.

## Description:

Deals with the relationship between the customer and the pizzeria.

## Functionality

The platform supports two roles: `user` and `staff`.  
Each `user` can see the menu - a list of offered pizzas with their data. But in order to place an order, it must be registered.  
The registration is done on the registration page, where the user has to provide his/her credentials and a delivery address selected by google map. He may change this information later in the account page.  
Registered users can monitor the status of their own orders. They may also terminate their registration in the system.

Each `staff` member can add a new Pizza to the menu, and to edit existing Pizza details. He also can change the status of the orders, and edit his own profile details.

## Backend

Parse Server at [Back4App](https://www.back4app.com) is used for data storage and for user authentication.

## Entities

### User

```json
{
  "objectId": "4BwpMWdCnm",
  "username": "A string",
  "email": "A string",
  "useMasterKey": true,
  "fullName": "A string",
  "address": "A string",
  "location": { "__type": "GeoPoint", "latitude": 40.0, "longitude": -30.0 },
  "phone": 1,
  "role": "A string",
  "sessionToken": "A string",
  "password": "#Password123",
  "createdAt": "2018-11-06T00:52:01.520Z",
  "updatedAt": "2018-11-06T00:52:04.713Z"
}
```

### Pizza

```json
{
  "types": [1, "a string"],
  "name": "A string",
  "weight": 1,
  "photo": { "__type": "File", "name": "photo.jpg" },
  "description": "A string",
  "onSale": true,
  "createdAt": "2018-11-06T00:52:01.520Z",
  "updatedAt": "2018-11-06T00:52:04.713Z"
}
```

### Order

```json
{
  "user": { "__type": "Pointer", "className": "_User", "objectId": "<THE_REFERENCED_OBJECT_ID>" },
  "pizza": { "__type": "Pointer", "className": "Pizza", "objectId": "<THE_REFERENCED_OBJECT_ID>" },
  "quantity": "A string",
  "price": 1,
  "weight": 1,
  "size": "A string",
  "status": "A string"
}
```
