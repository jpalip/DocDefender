# Make sure you have the following applications installed on your computer:

https://nodejs.org/en/ (We are using version 18/latest)  
https://www.postgresql.org/download/

# First clone the repository

# Second create a file in the backend folder called .env and paste this code:

DATABASE_URL="postgresql://postgres:<your PGAdmin4 password>@localhost:5432/image-encryption?schema=public"  
ACCESS_TOKEN_SECRET=SecretElOhEl

# Make sure you have Postgres installed and connect to the database with your password to PGAdmin4 and ensure its running locally

To connect to the database open up PGAdmin4 and create a new database called image-encryption
Then in terminal CD into your backend folder and run the command  
<<<<<<< HEAD
npx prisma db push  
=======
npx prisma migrate dev --name init

> > > > > > > f811600620df919f61817abb5fd08b2d93a2e3a5
> > > > > > > This command will auto-generate the database tables from our schema.prisma

# Then cd into the front end folder

# Run npm install - which installs all the required dependencies for the program

# Next run npm start - this will start the front end site locally and open the page in your browser

# Now open a new terminal window and CD into the backend folder

# Then again type npm install - which installs all the required dependencies for the backend

# After that you can run npm run dev - which will start up the backend which communicates with the DB to verify users
