
# Invoice Generator ( React - Redux )

It's a simple invoice management system build with the react.js and state is managed with the help of Redux 
 - The user can create a invoices and download the invoices.
 - All the invoices will save on the localstorage.
 - List of all invoices created by user will be showen in the home page with feature of [ view , Edit , Delete , Copy ].



## Deployment

click on the line to see the project



- https://invoice-generator-system.netlify.app/




## Installation Instructions

to run the project locally on your system


follow this steps

1) clone the repository

```base
git clone https://github.com/Arpan3211/invoice-generator.git
```

2) Install necessary packages & dependances
```base
npm install
```
3) start the local host 
```base
npm start 
```
 
**optional**

In case of project is not running and throuing *openssl* error 

- Replace you react start script with this *"--openssl-legacy-provider"*

```base
"scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
- Note: It's just a temprory solution for run the project 