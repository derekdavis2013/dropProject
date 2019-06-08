# Drop Interview API Project
## Running the application
Prerequisites:

* node v10+

1. Clone the respository

    `git clone https://github.com/derekdavis2013/dropProject.git`

2. Navigate to new directory
    
    `cd dropProject`

3. Install dependencies

    `npm install`

4. Start the application

    `npm run start`

## Usage
Prerequisites:
* REST client (Postman, RESTED for firefox, etc)

Make sure Headers are set to:
`Content-Type: application/x-www-form-urlencoded`
### Routes:

* new_job
* findById
* all_jobs

#### new_job
##### POST /api/v1/new_job
Creates a new job for the given URL

| Parameters   | Required | Data Type | Param Type  | Description  |
| -------------|:--------:| :--------:|:-----------:|:------------:|
| url          | `true`   | String    | body        | URL to fetch |
|              |          |           |             |              |

##### Return Values

| Field          | Data Type            | Description                      |
| ---------------|:--------------------:|:--------------------------------:|
| success        | boolean              | The success of the post.         |
| message        | String               | Description of data returned.    |
| result         | Object               | The result of a successful post. |
| result.url     | String               | The url for the requested job.   |
| result.status  | String               | Status of newly created job.     |
| result._id     | Unique Identifier    | ID for job.                      |
|                |                      |                                  |

#### find_by_id
##### GET /api/v1/find_by_id
Returns a single job found by ID

| Parameters | Required | Data Type         | Param Type | Description       |
| -----------|:--------:| :----------------:|:----------:|:-----------------:|
| id         | `true`   | Unique Identifier | query      | ID od job to find |
|            |          |                   |            |                   |

##### Return Values

| Field   | Data Type | Description                               |
| --------|:---------:|:-----------------------------------------:|
| message | String    | Description of data returned.             |
| status  | String    | Status of requested job.                  |
| url     | String    | URL of requested job.                     |
| html    | String    | HTML of requested URL if job is complete. |
|         |           |                                           |

#### all_jobs
##### GET /api/v1/all_jobs
Returns all submitted jobs
##### Return Values

| Field          | Data Type | Description                   |
| ---------------|:---------:|:-----------------------------:|
| message        | String    | Description of data returned. |
| jobs           | Array     | An array of all saved jobs.   |
|                |           |                               |

### Technologies used
* [Nodejs](https://nodejs.org/en/)
* [Expressjs](https://expressjs.com/)
* [Mongodb](https://www.mongodb.com/)
* [Mongo-Mock](https://www.npmjs.com/package/mongo-mock)

