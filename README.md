# link-station
## Problem
Write a program that solves the most suitable (with most power) link station for a device at given point [x,y].
This problem can be solved in 2-dimensional space. Link stations have reach and power.

A link station’s power can be calculated:
```javascript
power = (reach - device's distance from linkstation)^2
if distance > reach, power = 0
```

Program should output following line:
```
“Best link station for point x,y is x,y with power z”
```
or:
```
“No link station within reach for point x,y”
```
if power = 0.

Link stations are located at points (x, y) and have reach (r) ([x, y, r]):
- [[0, 0, 10],
- [20, 20, 5],
- [10, 0, 12]]

Print out function output from points (x, y):
- (0,0), (100, 100), (15,10) and (18, 18).
## Project structure
```
.
├── AWS_Terraform
│   └── main.tf
├── GCP_Terraform
│   └── main.tf
└── src
    ├── index.js
    └── package.js
```

## Solution
### Program is deployed to Google cloud functions using Terraform
#### Google cloud
Access the solution here:
https://us-central1-things-367718.cloudfunctions.net/terraform-function

#### Why Terraform?
Terraform lets you use the same workflow to manage multiple providers and handle cross-cloud dependencies. 
It allows developers to define the desired state of the infrastructure.
### Run locally
Requires Node.js version 12 and above

1.Clone repo
```sh
git clone https://github.com/safiulalam99/Link-station.git
```
2.Enter `./src` directory 
```sh
cd link-station/src
```
3.Install npm packages
```sh
npm install
```
4.Run code
```sh
npm start
```

### Run test program
After cloning the `link-station` directory, go to `./src` 
```sh
node index.js
```
