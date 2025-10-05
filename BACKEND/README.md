# API: POST /users/register

Description
- Register a new user and return an authentication token.
- Endpoint validates input, hashes the password, creates the user, and returns a JWT token plus the created user object.

HTTP
- Method: POST
- Path: /users/register

Request body (JSON)
- Required fields:
  - fullName.firstName (string) — required, 3–30 chars
  - email (string) — required, valid email
  - password (string) — required
- Optional:
  - fullName.lastName (string) — optional, if provided 3–30 chars

Example request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

Validation rules (as implemented)
- fullName.firstName: trimmed, min 3, max 30
- fullName.lastName: optional, if present trimmed, min 3, max 30
- email: must be a valid email format
- password: required (service will throw if missing)

Responses

- 201 Created
  - Description: User registered successfully.
  - Body:
    ```json
    {
      "token": "<jwt-token>",
      "user": {
        "_id": "64f1c2e5b9a1c2d3e4f5g6h7",
        "fullName": { "firstName": "John", "lastName": "Doe" },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```

- 400 Bad Request
  - Description: Validation failed (missing/invalid fields).
  - Body:
    ```json
    {
      "errors": [
        { "msg": "First name must be between 3 and 30 characters", "param": "fullName.firstName", ... }
      ]
    }
    ```

- 409 Conflict
  - Description: Email already in use (user exists).
  - Body (example):
    ```json
    { "error": "User already exists with this email" }
    ```

- 500 Internal Server Error
  - Description: Unexpected server error.
  - Body (example):
    ```json
    { "error": "Internal Server Error" }
    ```

Example curl
```bash
Method POST http://localhost:4000/users/register
  -H "Content-Type: application/json" \
  -d '{"fullName":{"firstName":"John","lastName":"Doe"},"email":"john.doe@example.com","password":"Secret123!"}'
```

Notes
- The server hashes the password before saving.
- The returned `user` object should not include the raw password (password is stored with select:false in the model).
- The actual status for "email exists" depends on your global error handler; adjust error handling to map service errors to 409 if you want consistent conflict


## API: POST /users/login

Description
- Authenticate a user and return a JWT token.
- Endpoint validates input, checks credentials, sets a `token` cookie and returns a JSON response with the token and user object.

HTTP
- Method: POST
- Path: /users/login

Request body (JSON)
- Required fields:
  - email (string) — required, valid email
  - password (string) — required

Example request
```json
{
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

Validation rules (as implemented)
- email: must be a valid email format
- password: must not be empty

Behavior notes
- The controller looks up the user including the password hash (.select('+password')) to verify credentials.
- On success the endpoint sets an HTTP cookie named `token` and returns the token in the response body.
- Current implementation returns the `user` object in the response. Because the password is explicitly selected for verification, the returned user may include the hashed password — avoid returning password in production responses.

Responses

- 200 OK
  - Description: Login successful.
  - Body:
    ```json
    {
      "token": "<jwt-token>",
      "user": {
        "_id": "64f1c2e5b9a1c2d3e4f5g6h7",
        "fullName": { "firstName": "John", "lastName": "Doe" },
        "email": "john.doe@example.com",
        "socketId": null
      }
    }
    ```
  - Also sets cookie: `Set-Cookie: token=<jwt-token>; HttpOnly; Path=/`

- 400 Bad Request
  - Description: Validation failed (missing/invalid fields).
  - Body (example):
    ```json
    {
      "errors": [
        { "msg": "Please enter a valid email", "param": "email", ... }
      ]
    }
    ```

- 401 Unauthorized
  - Description: Invalid email or password.
  - Body (example):
    ```json
    { "message": "Invalid Email or Password" }
    ```

- 500 Internal Server Error
  - Description: Unexpected server error.
  - Body (example):
    ```json
    { "error": "Internal Server Error" }
    ```

Example curl
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"Secret123!"}'
```

Recommendation
- Remove password from returned user object before responding (e.g., delete user.password or re-query without password) to avoid exposing the password


## API: GET /users/profile

Description
- Retrieve the authenticated user's profile.
- Protected route — requires a valid JWT token (cookie `token` or `Authorization: Bearer <token>`).

HTTP
- Method: GET
- Path: /users/profile
- Auth: Required

Behavior
- Uses auth middleware to verify token and ensure it's not blacklisted.
- Returns the user document attached to req.user by the middleware.

Responses

- 200 OK
  - Description: Profile returned successfully.
  - Body:
    ```json
    {
      "_id": "64f1c2e5b9a1c2d3e4f5g6h7",
      "fullName": { "firstName": "John", "lastName": "Doe" },
      "email": "john.doe@example.com",
      "socketId": null
    }
    ```
  - Note: Password should never be returned.

- 401 Unauthorized
  - Description: Missing/invalid/blacklisted token.
  - Body (example):
    ```json
    { "message": "Unauthorized" }
    ```

- 500 Internal Server Error
  - Description: Unexpected server error.
  - Body (example):
    ```json
    { "error": "Internal Server Error" }
    ```

Example curl (using cookie)
```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Cookie: token=<jwt-token>"
```

Example curl (using Authorization header)
```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt-token>"
```


## API: GET /users/logout

Description
- Log out the authenticated user by clearing the `token` cookie and blacklisting the token for 24 hours (TTL in blacklist collection).
- Protected route — requires a valid JWT token.

HTTP
- Method: GET
- Path: /users/logout
- Auth: Required

Behavior
- Clears the `token` cookie and saves the token to the blacklist collection (expires after 24 hours).
- Future requests with the blacklisted token will be rejected by auth middleware.

Responses

- 200 OK
  - Description: User logged out successfully.
  - Body:
    ```json
    { "message": "User logged out successfully" }
    ```

- 401 Unauthorized
  - Description: Missing/invalid/blacklisted token.
  - Body (example):
    ```json
    { "message": "Unauthorized" }
    ```

- 500 Internal Server Error
  - Description: Unexpected server error.
  - Body (example):
    ```json
    { "error": "Internal Server Error" }
    ```

Example curl (using Authorization header)
```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt-token>"
```

Notes
- Blacklist TTL is set to 24 hours in the blacklist model.
- Ensure the frontend removes any stored token


## Captains API

### POST /captains/register

Description
- Register a new captain and return an authentication token.
- Validates input, hashes the password, creates the captain document, and returns a JWT + captain object.

HTTP
- Method: POST
- Path: /captains/register

Request body (JSON)
- Required fields:
  - fullName.firstName (string) — required, 3–30 chars
  - email (string) — required, valid email
  - password (string) — required, min 6 chars (validated in routes)
  - vehicle.color (string) — required, min 3 chars
  - vehicle.plate (string) — required, min 3 chars
  - vehicle.capacity (number) — required, min 1
  - vehicle.vehicleType (string) — required, one of: "car", "motorcycle", "auto"
- Optional:
  - fullName.lastName (string) — optional, 3–30 chars
  - status (string) — optional, enum: "active" | "inactive" (defaults to "inactive")

Example request
```json
{
  "fullName": { "firstName": "Jane", "lastName": "Rider" },
  "email": "jane.rider@example.com",
  "password": "StrongPass123",
  "status": "active",
  "vehicle": {
    "color": "Blue",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

Validation rules (as implemented in routes)
- fullName.firstName: min 3 chars
- password: min 6 chars
- vehicle.color, vehicle.plate: min 3 chars
- vehicle.capacity: integer >= 1
- vehicle.vehicleType: must be one of [ "car", "motorcycle", "auto" ]
- email: valid email format

Responses
- 201 Created
  - Body:
    ```json
    {
      "token": "<jwt-token>",
      "captain": {
        "_id": "64f1c2e5b9a1c2d3e4f5g6h7",
        "fullName": { "firstName": "Jane", "lastName": "Rider" },
        "email": "jane.rider@example.com",
        "status": "active",
        "vehicle": { "color":"Blue","plate":"XYZ123","capacity":4,"vehicleType":"car" },
        "socketId": null
      }
    }
    ```
- 400 Bad Request — validation errors
- 409 Conflict — captain already exists (service throws; map to 409 in error handler if desired)
- 500 Internal Server Error

Example curl
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":{"firstName":"Jane","lastName":"Rider"},"email":"jane.rider@example.com","password":"StrongPass123","status":"active","vehicle":{"color":"Blue","plate":"XYZ123","capacity":4,"vehicleType":"car"}}'
```

Notes
- Password is hashed before saving.
- Returned captain should not expose password (model uses select:false).


### POST /captains/login

Description
- Authenticate a captain and return a JWT token.
- Validates credentials, sets `token` cookie and returns token + captain.

HTTP
- Method: POST
- Path: /captains/login

Request body (JSON)
- Required fields:
  - email (string) — required, valid email
  - password (string) — required, min 6 chars

Example request
```json
{
  "email": "jane.rider@example.com",
  "password": "StrongPass123"
}
```

Behavior notes
- Controller queries captain with .select('+password') to verify.
- On success sets cookie `token` and returns token + captain object.
- Ensure password hash is removed from response in production.

Responses
- 200 OK
  - Body:
    ```json
    { "token": "<jwt-token>", "captain": { /* captain object without password */ } }
    ```
  - Also sets cookie: `Set-Cookie: token=<jwt-token>; HttpOnly; Path=/`
- 400 Bad Request — validation failed
- 401 Unauthorized — invalid email or password
- 500 Internal Server Error

Example curl
```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.rider@example.com","password":"StrongPass123"}'
```


### GET /captains/profile

Description
- Retrieve authenticated captain profile.
- Protected route — requires valid JWT (cookie or Authorization header).

HTTP
- Method: GET
- Path: /captains/profile
- Auth: Required (authCaptain middleware)

Behavior
- Middleware verifies token, checks blacklist, attaches captain document to req.captain.

Responses
- 200 OK
  - Body: captain object (no password)
- 401 Unauthorized — missing/invalid/blacklisted token
- 500 Internal Server Error

Example curl (cookie)
```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Cookie: token=<jwt-token>"
```

Example curl (header)
```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt-token>"
```


### GET /captains/logout

Description
- Log out captain by clearing `token` cookie and blacklisting token (TTL 24h).
- Protected route — requires valid JWT.

HTTP
- Method: GET
- Path: /captains/logout
- Auth: Required

Behavior
- Clears cookie `token`, stores token in blacklist collection (expires after 24 hours).

Responses
- 200 OK
  - Body:
    ```json
    { "message": "Captain logged out successfully" }
    ```
- 401 Unauthorized — missing/invalid/blacklisted token
- 500 Internal Server Error

Example curl
```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <jwt-token>"
```

Notes
- Ensure frontend removes any stored token after logout.
- Blacklist TTL is configured in models/blacklistToken.model.js