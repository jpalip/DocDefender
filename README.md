# Make sure you have the following applications installed on your computer:
https://nodejs.org/en/ (We are using version 18/latest)             
https://www.postgresql.org/download/

# First clone the repository

# Second create a file in the backend folder called .env and paste this code:
DATABASE_URL="postgresql://postgres:Jaxalip123!@localhost:5432/image-encryption?schema=public"          
ACCESS_TOKEN_SECRET=SecretElOhEl

# Make sure you have Postgres installed and connect to the database with the password "Jaxalip123!" and ensure its running locally
To connect to the database open up PGAdmin4 and Click Object > Connect Server 

# Then cd into the front end folder

# Run npm install - which installs all the required dependencies for the program

# Next run npm start - this will start the front end site locally and open the page in your browser

# Now open a new terminal window and CD into the backend folder

# Then again type npm install - which installs all the required dependencies for the backend

# After that you can run npm run dev - which will start up the backend which communicates with the DB to verify users
