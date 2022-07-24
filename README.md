## Instructions to run the code

In the project directory, first run:

### `npm install`

This creates a "node_module" folder in the root directory of the app.

### `npm start`

This will start the local server at "localhost:3000"

## Approach

### 1. Technology stack used.

    -> Reactv18.2.0
    -> MaterialUIv5.9.1

### 2. High-level architectural diagram.
    -> There will be 1 tables named COMMENTS
        --> Comments
            >> The first level comments will be stored in the COMMENTS TABLE with reply_id field as null.
            >> All the furthur replies will be stored in the COMMENTS TABLE with the link to the comments in the same table using the ID.

### 3. Description of the solution.

    -> I am preparing the data for the comments and replies, with created time and date for furthur computation.
    -> A responsive UI will be created using the mobile first approach. For that i will be using figma now and then where required.
    -> For the random comment json data, I have used mockaroo.com


## short coming  
    - current user is identified using the "fullname" instead it should use a uniqueID of the user.
    -