Assessment Task: Nearby Locations API

Objective:

Develop a REST API in Nodejs/express that provides functionalities for managing and searching location data based on categories and proximity.

Database:

PostgreSQL or MongoDB
----------------------------------PART--------------------------------
API Response Format:

Measure the time taken by each endpoint in nanoseconds using some time package. Every API request should return a JSON with a response time in nanoseconds.

{
  // API response data
  ...
  "time_ns": "<time_taken_in_nanoseconds>"
}

----------------------------------PART--------------------------------
API endpoints:

POST /locations (Adding / Creating location data): 
Input: JSON object containing location data.
Data structure:

{
  "name": "Hospital XYZ",
  "address": "123 Main Street",
  "latitude": 37.783333,
  "longitude": -122.416667,
  "category": "hospital"
}

Response: JSON object with status and location ID.

{
 ...
 "id": "1"
}


GET /locations/{category} (reading existing location data):
Input: URL parameter specifying the category (e.g. restaurant, hospital).
Response: JSON object containing an array of all locations for the specified category.
Data structure:
 
{
  "locations": [
    {
      "id": "1",
      "name": "Ristorante Italia",
      "address": "123 Main Street",
   "latitude": 37.783333,
   "longitude": -122.416667,
      "category": "restaurant"
    },
    {
      "id": "2",
      "name": "Cafe De Paris",
      "address": "456 Elm Street",
   "latitude": 37.783333,
   "longitude": -122.416667,
      "category": "restaurant"
    },
    ...
  ]
}


POST /search (finding nearby locations):
Input: JSON object containing search parameters.
Data structure:

{
  "latitude": 37.783333,
  "longitude": -122.416667,
  "category": "cafe",
  "radius_km": 2,
}

Response: JSON object containing an array of nearby locations within the specified category and radius(in km).
Data structure:

{
  "locations": [
    {
      "id": "1",
      "name": "Starbuck's",
      "address": "123 Main Street",
      "distance": 0.3,
      "category": "cafe"
    },
    {
      "id": "2",
      "name": "Cafe Latte",
      "address": "456 Elm Street",
      "distance": 1.8, 
      "category": "cafe"
    },
    ...
  ]
}

POST /trip-cost/{location_id}:
Input: URL parameter specifying the destination location ID and JSON object containing the user's current location .
Use TollGuru API to fetch the cost for the trip. Store the TollGuru API key as an environment variable.
Data structure:

{
  "latitude": 37.783333,
  "longitude": -122.416667,
}

Response: JSON Object containing total cost of the trip along with fuel and toll cost.

{
 "total_cost": 25.34,
 "fuel_cost": 18.73,
 "toll_cost": 6.61,
}

----------------------------------PART--------------------------------

Dockerization:
Containerize your express server using Docker.
Provide a Dockerfile for building the Docker image.

Submission:
Push the Docker image to Docker Hub.
Push the source code on GitHub and deploy the API on the platform of your choice.
Submit the GitHub repository link, Docker Hub link and the demo link for evaluation.
Remember to store any API keys used in the project as environment variables.

----------------------------------PART--------------------------------

Evaluation Criteria:
Efficiency and performance of your solution.
Code quality, organization, and adherence to Node/express/javascript best practices.
Proper Dockerization of the application.
