# Simple Node, Express, TS, SQLite, TypeORM Customers API

## Installation

Obtain a copy of this repo and then:

1. Run `yarn` command
2. Run `yarn start` command. Alternatively, use `yarn start:dev` to run a development version of the server that watches for changes, recompiles and restarts the server.

## API Endpoints

| Endpoint           | Functionality                     |
| ------------------ | --------------------------------- |
| GET /customers     | List all the available customers. |
| POST /customers    | Create a new customer.            |
| GET /customers/:id | Retrieve a customer.              |

## Requests and Response Examples

The examples below are using [httpie](https://httpie.org/) in a single session. By default, the API accepts a `JSON` payload and returns a `JSON` response.

### _POST_ /customers

Create a customer.

```bash
$ echo '{"name": "James", "phoneNumber": "+724 711 11"}' | http POST :8080/customers
```

**Response**

```json
{
  "id": 5,
  "name": "James",
  "phoneNumber": "+724 711 11"
}
```

Missing request body params yield a `400`:

```bash
$ echo '{"name": "James" }' | http POST :8080/customers
```

**Response**

```txt
HTTP/1.1 400 Bad Request

{
    "message": "`phoneNumber` is required."
}
```

### _GET_ /customers/:id

Retrieve a customer by their id.

```bash
$ http :8080/customers/1
```

**Response**

```json
{
  "id": 1,
  "name": "James",
  "phoneNumber": "+254 711 11"
}
```

Missing customers yield `404`

````bash
```bash
$ http :8080/customers/10
````

**Response**

```txt
HTTP/1.1 404 Not Found

{
    "message": "Customer not found."
}
```

### _GET_ /customers

List all available customers.

```bash
$ http :8080/customers
```

**Response**

```json
[
  {
    "id": 1,
    "name": "James",
    "phoneNumber": "+724 711 11"
  }
]
```

Customers can be filtered by providing either one or both of `name` and `phoneNumber` as query parameters:

```bash
$ http :8080/customers name==Jacob
```

**Response**

```json
[]
```

```bash
http :8080/customers name==James
```

**Response**

```json
[
  {
    "id": 1,
    "name": "James",
    "phoneNumber": "+724 711 11"
  }
]
```
