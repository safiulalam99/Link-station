<h1 align="center">Link station</h1>

---
# Problem

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


---
# Solution
## Tech Stack
![Javascript!](https://img.icons8.com/color/48/000000/javascript.png "Javascript") &nbsp;&nbsp;&nbsp;
![Terraform!](https://img.icons8.com/color/48/000000/terraform.png "San Juan Mountains") &nbsp;&nbsp;&nbsp;
![AWS!](https://img.icons8.com/color/48/000000/amazon-web-services.png "AWS") &nbsp;&nbsp;&nbsp;
![AWS!](https://img.icons8.com/color/48/000000/google-cloud.png "google") &nbsp;&nbsp;&nbsp;
![rsz_2jest-logo-png-transparent](https://user-images.githubusercontent.com/82179767/200190202-bff7a8b2-31a1-4275-b7d2-22aa6eff4025.png) &nbsp;&nbsp;&nbsp;

## Project structure

```
.
├── AWS_Terraform
│   └── main.tf                 //Zips and deploys code to AWS Lambda using terraform.
├── GCP_Terraform   
│   └── main.tf                 //Zips and deploys code to Google Cloud functions.
└── src
    ├── index.js
    ├── test.index.js           // Unit tests for index.js
    └── package.js
```
## Google Cloud functions & AWS Lambda

### How to deploy using Terraform
Terraform allows developers to define the desired state of the infrastructure.
To demonstrate how easy it is to deploy code using **Terraform**, I have deployed the code simultaneously to **AWS Lambda** and **Google Cloud Functions** with just a few configurations.

Prerequisites 

- Download **Terraform** to local machine from [here](https://developer.hashicorp.com/terraform/downloads).
Connect cloud providers CLI in local terminal.

`main.tf` contains the provider methods for the application infrastructure to be deployed to the cloud. Terraform documentation for different cloud providers can be found [here](https://developer.hashicorp.com/terraform/tutorials).  

Commands to deploy code using terraform:

``` sh
# Initialize the main.tf file
terraform init
# Checkout the deployment files
terraform plan
# Deploy
terraform apply
```
This compresses the code files in a zip folder and deploys it to the cloud. More details [here](https://developer.hashicorp.com/terraform/). 

### Google cloud

Packaged and deployed the code to Google Storage Bucket. Google Cloud Functions then retrives the package from the storage bucket, then compiles and deploy's it.
We can check the results by making a request at the link provided or using cURL or Postman: https://us-central1-things-367718.cloudfunctions.net/terraform-function

cURL
```sh
curl https://us-central1-things-367718.cloudfunctions.net/terraform-function
```
Response
```sh
[
"Best link station for (0,0) is (0,0) with power 100.00",
"No Link Station within reach for point (100,100)",
"No Link Station within reach for point (15,10)",
"Best link station for (18,18) is (20,20) with power 4.72"
]
```

### AWS Lambda

- Define AWS IAM role and policy. 
- Provide resources to create a Lambda function.
Visit
https://pb6vo63bt4qn3fkmofuuvho2da0hetpl.lambda-url.us-east-1.on.aws/
Or cURL the URL in your console to get the results.

**cURL**
```sh
curl https://pb6vo63bt4qn3fkmofuuvho2da0hetpl.lambda-url.us-east-1.on.aws/
```
**Response**
```sh
[
"Best link station for (0,0) is (0,0) with power 100.00",
"No Link Station within reach for point (100,100)",
"No Link Station within reach for point (15,10)",
"Best link station for (18,18) is (20,20) with power 4.72"
]
```
## About the Code
### CI/CD Pipeline - GitHub Actions Workflow
- The project is configured to run a CI pipeline on every push to the "main" branch. 
- There are 2 jobs defined in the .yml file, "build" and "super-lint". "Build" job installs the necessary dependancies and runs the unit tests.  "Super-lint" job checks the project ESLint code standards.
- The .yml file can be found in [./.github/workflows/CI.yml](https://github.com/safiulalam99/Link-station/tree/main/.github/workflows)

### Tests
- Unit tests are written to verify the working of the functions. They are described in [./src/index.test.js](https://github.com/safiulalam99/Link-station/tree/main/src). 
- [Jest](https://jestjs.io/), a Nodejs a library is used to write the unit tests.


### Src
- There are 4 primary methods: distance, power, printing the output and sending the output as a HTTP response. The 'main' method's functionality is to show the output as HTTP response in the cloud.
- There are terraform directories, `./AWS_Terraform/main.tf` and `./GCP_Terraform/main.tf`. They contain the terraform configurations `main.tf` files, responsible for deploying the solutions to the cloud.
- Subsequently, you can also run the program locally. Follow the steps below.




### Run locally

Requires [Node.js](https://nodejs.org/en/) version 12 and above
```sh
# Clone repo
git clone https://github.com/safiulalam99/Link-station.git
# Enter `./src` directory
cd link-station/src
# Install npm packages
npm install
# Run code
npm start
```


### Run unit tests

After cloning the `link-station` directory, go to `./src/`

```sh
npm test
```
