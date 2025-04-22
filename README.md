# 📌 TASKLY API

A RESTful API for managing tasks (cards) and their notes. Built with a focus on modern backend development practices, using **Node.js**, **TypeScript** and **Prisma ORM**.

---

## 🚀 Technologies Used
- **Node.js: v22.13.1**
- **TypeScript: ^5.8.3**
- **Express: ^5.1.0**
- **Prisma: ^6.6.0**
- **SQLite: used via Prisma ORM**
- **Zod: ^3.24.3**

---

## 🛠 Configuration and Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/BrendaSaulit/ANMAR25_DSUP_TASKLY.git
cd ANMAR25_DSUP_TASKLY
```

### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣  Configure Environment Variables
Create a `.env` file in the root of the project with the following content:
```bash
DATABASE_URL="file:../database/dev.db"
```
This value is used by Prisma to connect to the SQLite database.

### 4️⃣ Execute the Prisma Database Migrations
```bash
npx prisma migrate dev
```
This will create (or recreate) your database based on the Prisma schema.

### 5️⃣ Generate the Prisma client
```bash
npx prisma generate
```
Generates the client that your application uses to interact with the database.

### 6️⃣ Build and Start
```bash
npm run build
npm run start
```
### 7️⃣ Access via Prisma Studio (optional)
```bash
npx prisma studio
```
This command opens a graphical interface to view and edit data directly in the database.

---

## 📌 API Endpoints

### 🔹  Create a new task card
**Endpoint:**

**POST** `/tasks`

This endpoint receives task information, registers it, and returns success or error.
**Request Example:**

POST /tasks/1

### *Example request body:*
```json
{
  "title": "Finish report",
  "priority": "HIGH",
  "category": "WORK",
  "status": "TODO"
}
```

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `201` and an object containing the registered task information.
```json

{
    "id": 1,
    "title": "Finish report",
    "category": "WORK",
    "status": "TODO",
    "priority": "HIGH",
    "created_at": "2025-04-22T14:03:57.521Z",
    "update_at": "2025-04-22T14:03:57.521Z"
}

```
### **Common Errors**

The API may return errors in the following cases:

 **Data validation (status 400):**  Invalid Input Type
If the API receives a field with the wrong data type, it will return a validation error like the one below:

 ```json
{
 {
    "error": [
        {
            "code": "invalid_type",
            "expected": "string",
            "received": "number",
            "path": [
                "title"
            ],
            "message": "Expected string, received number"
        }
    ]
}
}
```
This means the field title was expected to be a string, but a number was sent instead.

---

### 🔹  Create a new note
**Endpoint:**

**POST** `/tasks/:taskId/notes`

This endpoint receives note information, registers it, and returns success or error.

**Request Example:**

POST /tasks/1/notes

### *Example request body:*
```json
{
  "note": "Complete the final sections and submit the report"
}
```
### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `201` and an object containing the registered note information.
```json
{
    "id": 1,
    "note": "Complete the final sections and submit the report",
    "task_id": 1,
    "created_at": "2025-04-22T14:36:13.500Z",
    "update_at": "2025-04-22T14:36:13.500Z"
}

```
### **Common Errors**

The API may return errors in the following cases:

 **Data validation (status 400):**  Invalid Input Type
If the API receives a field with the wrong data type, it will return a validation error like the one below:

 ```json
 {
    "error": [
        {
            "code": "invalid_type",
            "expected": "string",
            "received": "number",
            "path": [
                "note"
            ],
            "message": "Expected string, received number"
        }
    ]
}
```
This means the field note was expected to be a string, but a number was sent instead.

---

### 🔹  Update a task card
**Endpoint:**

**PUT** `/tasks/:id`


This endpoint receives the updated task information, applies the changes, and returns success or an error if something goes wrong.

**Request Example:**

PUT /tasks/1

### *Example request body:*
```json
{
  "title": "Finish report",
  "priority": "HIGH",
  "category": "WORK",
  "status": "IN_PROGRESS"
}
```
### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing the updated task information.

```json
{
    "data": {
        "id": 1,
        "title": "Finish report",
        "category": "WORK",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "created_at": "2025-04-22T14:03:57.521Z",
        "update_at": "2025-04-22T14:48:50.239Z"
    }
}

```
### **Common Errors**

The API may return errors in the following cases:

 **Data validation (status 400):**  Invalid Input Type
If the API receives a field with the wrong data type, it will return a validation error like the one below:

 ```json
 {
    "error": [
        {
            "code": "invalid_type",
            "expected": "string",
            "received": "number",
            "path": [
                "title"
            ],
            "message": "Expected string, received number"
        }
    ]
}
```
This means the field title was expected to be a string, but a number was sent instead.

**Resource not found (status 404):** Task not found
If the API receives a request to update a task that does not exist in the database, it will return a 404 error with a message like the one below:

 ```json
{
    "error": "Task not found"
}
```

---


### 🔹 Update a note

**Endpoint:**

**PUT** `/notes/:id`

This endpoint receives the updated note information, applies the changes, and returns success or an error if something goes wrong.

**Request Example:**

**PUT** `/notes/1`

### *Example request body:*
```json
{
  "note": "Review and revise the final sections before submission"
}
```
### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing the updated note information.

```json
{
    "data": {
        "id": 1,
        "note": "Review and revise the final sections before submission",
        "task_id": 1,
        "created_at": "2025-04-22T14:36:13.500Z",
        "update_at": "2025-04-22T15:15:39.121Z"
    }
}
```
### **Common Errors**

The API may return errors in the following cases:

 **Data validation (status 400):**  Invalid Input Type
If the API receives a field with the wrong data type, it will return a validation error like the one below:

 ```json
 {
    "error": [
        {
            "code": "invalid_type",
            "expected": "string",
            "received": "number",
            "path": [
                "note"
            ],
            "message": "Expected string, received number"
        }
    ]
}
```
This means the field note was expected to be a string, but a number was sent instead.


**Resource not found (status 404):** Note not found
If the API receives a request to update a note that does not exist in the database, it will return a 404 error with a message like the one below:

 ```json
{
    "error": "Note not found"
}
```
---


### 🔹 Get a task by Id

**Endpoint:**

**GET** `/tasks/:id`

This endpoint receives a task ID, retrieves the corresponding task from the database, and returns the task data or an error if the task is not found.

**Request Example:**

**GET** `/tasks/1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing the task data (If the task has any related notes, it will also return the notes.).

```json
{
    "data": {
        "id": 1,
        "title": "Finish report",
        "category": "WORK",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "created_at": "2025-04-22T14:03:57.521Z",
        "update_at": "2025-04-22T14:48:50.239Z",
        "notes": [
            {
                "id": 1,
                "note": "Review and revise the final sections before submission",
                "task_id": 1,
                "created_at": "2025-04-22T14:36:13.500Z",
                "update_at": "2025-04-22T15:15:39.121Z"
            }
        ]
    }
}
```

### **Common Errors**

The API may return errors in the following cases:

**Resource not found (status 404):** Task not found
If the API receives a request to get a task that does not exist in the database, it will return a 404 error with a message like the one below:

 ```json
{
    "error": "Task not found"
}
```

---

### 🔹 Get a note by Id

**Endpoint:**

**GET** `/notes/:id`

This endpoint receives a note ID, retrieves the corresponding note from the database, and returns the note data or an error if the note is not found.

**Request Example:**

**GET** `/notes/1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing the note data.

```json
{
    "data": {
        "id": 1,
        "note": "Review and revise the final sections before submission",
        "task_id": 1,
        "created_at": "2025-04-22T14:36:13.500Z",
        "update_at": "2025-04-22T15:15:39.121Z"
    }
}
```

### **Common Errors**

The API may return errors in the following cases:

**Resource not found (status 404):** Note not found
If the API receives a request to get a note that does not exist in the database, it will return a 404 error with a message like the one below:

 ```json
{
    "error": "Note not found"
}
```
---

### 🔹 Get a task by status

**Endpoint:**

**GET** `/tasks/status/:status`

This endpoint receives a task status, retrieves the corresponding tasks from the database, and returns the tasks data or an error if the status is invalid.

```bash
Valid statuses:

- TODO
- IN_PROGRESS
- DONE
```

```bash
Pagination:

This search allows pagination. You can customize the search by defining:

- limit: the data limit per page
- page: which page will be returned

If no page or limit is defined, the default value will be:  

page = "1"
limit = "5".
```
**Request Example:**

**GET** `/tasks/status/IN_PROGRESS?page=1&limit=1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing the task data with pagination.

```json
{
    "count": 1,
    "page": 1,
    "pages": 1,
    "data": [
        {
            "id": 1,
            "title": "Finish report",
            "category": "WORK",
            "status": "IN_PROGRESS",
            "priority": "HIGH",
            "created_at": "2025-04-22T14:03:57.521Z",
            "update_at": "2025-04-22T14:48:50.239Z",
            "notes": [
                {
                    "id": 1,
                    "note": "Review and revise the final sections before submission",
                    "task_id": 1,
                    "created_at": "2025-04-22T14:36:13.500Z",
                    "update_at": "2025-04-22T15:15:39.121Z"
                }
            ]
        }
    ]
}
```

### **Common Errors**

The API may return errors in the following cases:

**Invalid status (status 400):** Invalid status provided
If the API receives an invalid status for filtering the search, it will return a 400 error with a message like the one below:

 ```json
{
    "error": "Invalid status"
}
```
---

### 🔹 Get a task by category

**Endpoint:**

**GET** `/tasks/category/:category`

This endpoint receives a task category, retrieves the corresponding tasks from the database, and returns the tasks data or an error if the category is invalid.

```bash
Valid categories:

- WORK
- STUDY
- PERSONAL
- OTHER
```

```bash
Pagination:

This search allows pagination. You can customize the search by defining:

- limit: the data limit per page
- page: which page will be returned

If no page or limit is defined, the default value will be:  

page = "1"
limit = "5".
```
**Request Example:**

**GET** `/tasks/category/WORK?page=1&limit=1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing the task data with pagination.

```json
{
    "count": 1,
    "page": 1,
    "pages": 1,
    "data": [
        {
            "id": 1,
            "title": "Finish report",
            "category": "WORK",
            "status": "IN_PROGRESS",
            "priority": "HIGH",
            "created_at": "2025-04-22T14:03:57.521Z",
            "update_at": "2025-04-22T14:48:50.239Z",
            "notes": [
                {
                    "id": 1,
                    "note": "Review and revise the final sections before submission",
                    "task_id": 1,
                    "created_at": "2025-04-22T14:36:13.500Z",
                    "update_at": "2025-04-22T15:15:39.121Z"
                }
            ]
        }
    ]
}
```

### **Common Errors**

The API may return errors in the following cases:

**Invalid category (status 400):** Invalid category provided
If the API receives an invalid category for filtering the search, it will return a 400 error with a message like the one below:

 ```json
{
    "error": "Invalid category"
}
```

---

### 🔹 List all task cards
This endpoint retrieves all tasks with pagination (it supports advanced search filters) and returns the task data or an error if the parameters are invalid.

**Endpoint:**

**GET** `/tasks`

```bash
Advanced searches:

This endpoint allows advanced searches. You can search for a text or part of a text, and it will return all tasks and notes that contain the search text.

- If the searched text is present in a note, it will return the note and the complete task related to it.

- If the searched text is present in a task, it will return the task with all the related notes.


```

```bash
Pagination:

This search allows pagination. You can customize the search by defining:

- limit: the data limit per page
- page: which page will be returned

If no page or limit is defined, the default value will be:  

page = "1"
limit = "5".
```
**Request Example:**

**GET** `/tasks?page=1&limit=1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing all the tasks data with pagination.

**All tasks with paginatin and without advanced text search:**
```json
{
    "count": 2,
    "page": 2,
    "pages": 2,
    "data": [
        {
            "id": 1,
            "title": "finish report",
            "category": "WORK",
            "status": "IN_PROGRESS",
            "priority": "HIGH",
            "created_at": "2025-04-22T14:03:57.521Z",
            "update_at": "2025-04-22T17:50:07.059Z",
            "notes": [
                {
                    "id": 1,
                    "note": "Review and revise the final sections before submission",
                    "task_id": 1,
                    "created_at": "2025-04-22T14:36:13.500Z",
                    "update_at": "2025-04-22T15:15:39.121Z"
                }
            ]
        }
    ]
}
```
**Request Example with advanced search and pagination:**

**GET** `/tasks?page=1&limit=2&query=revise`

```bash
query=revise

Searches for all tasks and notes that contain the word "revise"
```

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing all the tasks data with pagination.

**All tasks with advanced text search and pagination:**
```json
{
    "count": 2,
    "page": 1,
    "pages": 1,
    "data": [
        {
            "id": 2,
            "title": "revise report",
            "category": "STUDY",
            "status": "IN_PROGRESS",
            "priority": "LOW",
            "created_at": "2025-04-22T17:37:09.484Z",
            "update_at": "2025-04-22T17:49:03.418Z",
            "notes": []
        },
        {
            "id": 1,
            "title": "finish report",
            "category": "WORK",
            "status": "IN_PROGRESS",
            "priority": "HIGH",
            "created_at": "2025-04-22T14:03:57.521Z",
            "update_at": "2025-04-22T17:50:07.059Z",
            "notes": [
                {
                    "id": 1,
                    "note": "Review and revise the final sections before submission",
                    "task_id": 1,
                    "created_at": "2025-04-22T14:36:13.500Z",
                    "update_at": "2025-04-22T15:15:39.121Z"
                }
            ]
        }
    ]
}
```

### 🔹 List task notes
This endpoint returns all the notes of a specific task with pagination.

**Endpoint:**

**GET** `/tasks/:taskId/notes`


```bash
Pagination:

This search allows pagination. You can customize the search by defining:

- limit: the data limit per page
- page: which page will be returned

If no page or limit is defined, the default value will be:  

page = "1"
limit = "5".
```
**Request Example:**

**GET** `/tasks/1/notes?limit=2&page=1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `200` and an object containing all the notes data with pagination.

```json
{
    "count": 2,
    "page": 1,
    "pages": 1,
    "data": [
        {
            "id": 2,
            "note": "Double-check the data analysis before finalizing the report",
            "task_id": 1,
            "created_at": "2025-04-22T18:16:02.059Z",
            "update_at": "2025-04-22T18:16:02.059Z"
        },
        {
            "id": 1,
            "note": "Review and revise the final sections before submission",
            "task_id": 1,
            "created_at": "2025-04-22T14:36:13.500Z",
            "update_at": "2025-04-22T15:15:39.121Z"
        }
    ]
}
```
### 🔹 Delete a Task Card

**Endpoint:**

**DELETE** `/tasks/:id`

This endpoint receives an ID and deletes the task card.

**Request Example:**

**GET** `/tasks/2`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `204` with no content.

### **Common Errors**

The API may return errors in the following cases:

**Resource not found (status 404):** Task not found
If the API receives a request to delete a task that does not exist in the database, it will return a 404 error with a message like the one below:

 ```json
{
    "error": "Task not found"
}
```
---
### 🔹 Delete a note

**Endpoint:**

**DELETE** `/notes/:id`

This endpoint receives an ID and deletes the note.

**Request Example:**

**GET** `/notes/1`

### *API Responses:*

**SUCCESS:**

In case of success, it returns the status code `204` with no content.

### **Common Errors**

The API may return errors in the following cases:

**Resource not found (status 404):** Note not found
If the API receives a request to delete a note that does not exist in the database, it will return a 404 error with a message like the one below:

 ```json
{
    "error": "Note not found"
}
```
---


### Generic Error
If any other error occurs, the status code `500` will be returned with an object containing the property errors and the following validation message: Response Body

 ```json
{
	"errors": [
		"an internal server error occurred",
	]
}
```

