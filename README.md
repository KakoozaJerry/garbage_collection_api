## THE GARBAGE MANAGERS API

This is a system for use by a waste management company to be able to :
* Track everyone's garbage collection 
* Track employees records
* Track customer issues and complaints
* Log new customers and subscription status
* Implement employee daily allowances
* Implement a discount to a 6 month subscriber customer

## How to run it on a windows machine

* You clone the repository to a local machine
* Navigate to the folder where the cloned repository is.
* Make sure you install all the node packages as in the package.json file
* Ensure you have mongo DB installed on your machine
* Create a .env file in the root directory and insert `DATABASE=mongodb://localhost:27017/<Name of DB>`
* Where `Name of DB` is the name of the database you have created in MongoDB
* Open the command prompt and start your database by running `mongod` 
* Then open another terminal , navigate to your project folder and run the command `npm start`
* Go to your browser and open the URL http://localhost:3000/login