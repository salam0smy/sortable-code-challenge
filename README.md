# matching-service
This repo is an application based on Node.js, npm. It is a solution for the code challenge at Sortable.
http://sortable.com/challenge/

## Installation
Make sure node.js and npm are installed (https://nodejs.org/en/)

Then, run the command line inside the project directory:
```sh
npm install
```
  
### Running the application:
```sh
node app.js <products_fileName> <listings_fileName> <output_fileName>
```
* products_fileName: products path file.
* listings_fileName: listings path file.
* output_fileName (*optional*): output file path.

##### Example:
```sh
node app.js products.txt listings.txt results.txt
```
