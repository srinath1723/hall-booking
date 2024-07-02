## Hall Booking API Task.

The task is to write API for hall booking app for

1. Creating a Room with

   - Number of seats available
   - amenities in room
   - price per hour

2. Booking a room with

   - Customer Name
   - Date
   - Start Time
   - End Time
   - Room name

3. List all Rooms with Booked data with

   - Room Name
   - Booked Status
   - Customer Name
   - Date
   - Start Time
   - End Time

4. List all customers with booked data with

   - Customer Name
   - Room Name
   - Date
   - Start Time
   - End Time

5. List how many times a customer has booked the room with below details
   - Customer Name
   - Room Name
   - Date
   - Start Time
   - End Time
   - Booking ID
   - Booking Date
   - Booking Status

Models:

1. rooms

   - room_name
   - number_of_seats
   - amenities
   - price_per_hour

2. bookings

   - room_name
   - customer_name
   - date
   - start_time
   - end_time
   - booking_id
   - booking_date
   - booking_status

APIs:

1. Create Room

   - POST /rooms
   - Request Body: {room_name, number_of_seats, amenities, price_per_hour}
   - Response: {room_name, number_of_seats, amenities, price_per_hour}

2. Book Room

   - POST /bookings
   - Request Body: {room_name, customer_name, date, start_time, end_time}
   - Response: {room_name, customer_name, date, start_time, end_time, booking_id, booking_date, booking_status}

3. List all Rooms with Booked data

   - GET /rooms
   - Response: [{room_name, booked_status, customer_name, date, start_time, end_time}]

4. List all customers with booked data

   - GET /customers
   - Response: [{customer_name, room_name, date, start_time, end_time}]

5. List how many times a customer has booked the room

   - GET /customers/:customer_name
   - Response: [{customer_name, room_name, date, start_time, end_time, booking_id, booking_date, booking_status}]
  
**Description**
  
   * In [index.js](./index.js)

       - **Setup and Middleware**: Uses the Express framework and middleware to parse JSON request bodies.

       - **Data Storage**: Stores room details in the `rooms` array and booking details in the `bookings` array.

       - **ID Generation**: Utilizes a helper function `generateId` to create unique IDs for rooms and bookings by incrementing the last ID in the respective arrays.

       - **Create a Room**:
            - **Endpoint**: `/rooms`
            - **Method**: `POST`
            - **Request Body**: Includes `name`, `seats`, `amenities`, `pricePerHour`.
            - **Functionality**: Adds a new room to the `rooms` array and returns the room details.

       - **Book a Room**:
            - **Endpoint**: `/booking`
            - **Method**: `POST`
            - **Request Body**: Includes `customerName`, `date`, `startTime`, `endTime`, `roomId`.
            - **Functionality**: Checks room availability and booking conflicts, then adds the booking to the `bookings` array if available.

       - **List All Booked Rooms**:
             
            - **Endpoint**: `/bookedRooms`
            - **Method**: `GET`
            - **Functionality**: Retrieves and returns all booked room details, including room name and booking information.

       - **List All Customers with Booked Data**:
             
            - **Endpoint**: `/customerData`
            - **Method**: `GET`
            - **Functionality**: Retrieves and returns all customer booking details, including room name and booking information.

       - **List Bookings by Customer**:
             
            - **Endpoint**: `/rooms/:customer`
            - **Method**: `GET`
            - **Functionality**: Filters and returns all bookings made by a specified customer, including booking ID and status.

       - **Error Handling**:
            - Returns a 404 status and error message if a room is not found during booking.
            - Returns an error message if a room is already booked for the specified time.

       - **Server Setup**: The server listens on port 3005 and logs a message when it starts running.

### Steps to setup the application:

   1. Create an empty directory
   2. Generate a package.json file by running `npm init -y` or `npm init`
   3. Install the required dependencies:
          - `npm install express`
   4. Create an entry point file (e.g. `index.js`) in the root directory
   5. In the index.js file:
          - Import express
          - Create an express app
          - Define a basic root route for the app inside index.js after creating the express app
      ```javascript
      app.get("/", (req, res) => {
        res.send("Hello World");
        });
      ```
         - listen for incoming http requests on a specific port
   6. Run the application by running `node index.js`

### Enable git version control

   1. Initialize a git repository by running `git init`
   2. Create a `.gitignore` file and add the following entries:
      ```
      node_modules/
      .env
      package-lock.json
      ```
   3. Rename the branch to `main` by running `git branch -M main`
   4. Add the changes to the staging area by running `git add .`
   5. Commit the changes by running `git commit -m "Initial commit"`
   6. Create a new repository on GitHub and copy the repository URL
   7. Add the remote repository in the vscode terminal by running `git remote add origin <repository-url>`
   8. Push the changes to the remote repository by running `git push -u origin main`

### Create a README.md file

   1. Create a README.md file in the root directory
   2. Add a description of the application

### Enable nodemon for automatic server restarts

   1. Install nodemon as a development dependency by running `npm install --save-dev nodemon`
   2. Add a start script in the package.json file
      ```json
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
      }
      ```
   3. To config the file in `.env` by running `npm install dovenv`
   4. Run the application in development mode by running `npm run dev`

**Postman Documentation**
   
   * Here is a link to the postman documentation for all the APIs.[Postman Documentation](https://documenter.getpostman.com/view/34880524/2sA3dvmDHs)