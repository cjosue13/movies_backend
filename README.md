# React Back-End Movies app
This is a repository that contains the back-end of the movie application in a MySql and graphql database for managing the enpoints

## First step:
The first step that is needed to install the project is to execute the following command:

```
npm install
```

## Second step:
To be able to use the back-end it is necessary to have a MySql database, and create the following database schema called ***movies_db***

## Third step:
The next thing you should do is modify the configuration found in the .env file located in the root of the project
modifying the following parameters according to the user in the database:
***DB_USER = yourUser***
***DB_PASS = yourPassword***

## Fourth step:
Download and run the following script in the ***movies_db*** schema [MySql Script](https://1drv.ms/u/s!Aqgf4q85Wy77gzMDyl5hm1CKPV-Q?e=XaPwhf)


## Fifth step
Finally you must run the following command to install the project dependencies:

```
npm install
```

and finally we run the back-end with the command:

```
npm run dev
```