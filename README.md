# Galileo

## Overview

Galileo connects parking spot owners with renters. It gives owners the ability to generate revenue off of their unused space. It allows renters quickly find and book a parking spot.  Galileo is a web application with an emphasis on mobile support.

## Table of Contents
* [Login](#login)
* [Registration and Profile](#registration-and-profile)
* [Rent](#rent)
* [Host](#host)
* [Bookings](#bookings)

## Installation

### Create a .env file and add the following keys
```bash
NODE_ENV="development"
PG_DB_USER_DEV="<YOUR_USERNAME>"
PG_DB_PASS_DEV="<YOUR_PASSWORD>"
PG_DB_PASS_TEST="<CIRCLECI_DB_PASSWORD>"
GOOGLE_API="<YOUR_API_KEY>"
AWS_ACCESS_KEY_ID="<YOUR_AWS_ACCESS_KEY>"
AWS_ACCESS_KEY_ID="<YOUR_AWS_SECRET_ACCESS_KEY>"
S3_BUCKET_NAME="<YOUR_S3_BUCKET_NAME>"
```

### To get a Google Map API, please check out this link: https://developers.google.com/maps/gmp-get-started#create-project

### To set up AWS Access Keys, please check out this link: https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html

### AWS S3 Bucket setup for photo storage
1. Create new S3 Bucket https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
2. Allow all public access
3. Go to bucket permissions and add the following Bucket Policy:
```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>/*"
        }
    ]
}
```

### To intialize the db:
1. Install PostGIS using homebrew (preferred). https://postgis.net/install/
2. Create a db called 'galileo'.
3. Run 'psql galileo < schema.sql' in the terminal.

### To initialize the project:
Install dependencies:
```bash
npm install
```
Start webpack to compile bundle:
```bash
npm run react-dev
```
Run server:
```bash
npm start
```

Go to http://localhost:3000 to view the project.

## Testing
Run tests once:
```bash
npm test
```
Run tests in watch-mode:
```bash
npm run test-w
```
Check coverage of tests:
```bash
npm run coverage
```

## Contents

### [Login](#login)
![Login](readme/login.png?raw=true "Login")

Login page requires a username and password in order to prevent unauthorized access to confidential data. When a login fails (i.e, the username doesn't exist, the username and password combination does not match a user account), the corresponding error message will be displayed and the user is disallowed access. After a successful login, the user is redirected to the Rent/Map screen.

The link to create a new account is displayed beneath the Login Form Widget.

### [Registration and Profile](#registration-and-profile)
![Registration and Profile](readme/account.png?raw=true "Registration and Profile")

Registration page and Profile page share the same React controlled form, requiring username, password, email, first name and last name. Form fields will be validated where appropriate when the button beneath the form is clicked. After passing the validation check, a success message is displayed and the user profile is created or updated.

Registration page requires entries to create a new account, and contains a "Finish Registration" button. The "Back to Login" link redirects users to Login page.

Profile page displays account information associated with the user currently logged in. It contains a "Save Information" button and allows users to update all their account information except username. The sidebar allows users to navigate other pages. The "Log Out" link redirects users to Login page and restricts webpage access.

### [Rent](#rent)
![Rent](readme/rent.png?raw=true "Rent")

### [Host](#host)
![Host](readme/hostpage.png?raw=true "Host")

The Spot Management home page is where users can go see the spots they have currently have listed for rent. The home page displays a scrollable list of current spots the user is hosting. From there users can either add a new parking spot by clicking the botton button or edit a parking spot by clicking the right arrow icon on any spot displayed in the list. The navigation bar is still visible on this home page for users to jump elsewhere.

The Add Spot page allows users to upload a local image of their parking spot, select the type of spot they are listing, as well as the hourly price the new spot will be. Clicking "Confirm" will upload the new spot info and redirect back to the Spot Management home page where the new parking spot will now be shown. Clicking the back arrow will cancel the current add spot session and return to Spot Management home page.

The Edit Spot page is where users can change either the image or the hourly price for currently selected spot. The address cannot be changed. Clicking "Save" will update the spot information and redirect back to the Spot Management home page. Clicking the back arrow will cancel the current edit session and return to Spot Management home page.

### [Bookings](#bookings)
![Bookings](readme/bookings.png?raw=true "Bookings")

## Galileo Members

* Andrew Hamilton - https://github.com/ahamilton454
* Farhan Ali - https://github.com/farhanali3193
* Huiqing Li - https://github.com/sharplessHQ
* Jason Carr - https://github.com/carrjsn
* Jennifer Yang - https://github.com/jenniferjinyoungyang
* Matt Wrobel - https://github.com/matthewwrobel
* Raphael Li - https://github.com/raphaelwho
