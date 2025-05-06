# CYPRESS TESTING - BOOKING TRAINS IN PORTUGAL


## Introduction
The objective of the project is to perform a simple automation test:
Write an automated solution that will:
- Navigate to [https://www.cp.pt/passageiros/en/buy-tickets](https://www.cp.pt/passageiros/en/buy-tickets)
- Submit a request for online tickets with:
  -  **Departing from**: Lagos
  -  **Arriving at**: Porto - Campanha
  -  **Departure date**: 3 days from today
  -  **Return date**: 5 days from today
- Click **“Cancel”** to return to the “Buy Tickets” screen
-  Validate that the following values are preserved:
  -  Departure station
  -  Arrival station
  -  Departure date
  -  Return date

## Framework and choice of language 
Cypress for automation. TypeScript for better tooling and static typing. 
Additionally, Linter and Prettier were set up. [Source](https://medium.com/@beginners_log/set-up-linter-and-prettier-for-your-cypress-project-flat-config-a4af886f4101) ensuring no heated arguments about spaces vs tabs, or where to start the curly braces. Actually a big fan of this. You could set up checks on PRs to ensure the code wouldn't merge until the prettier issues are resolved. Infact can do those checks at commit using husky.  

## Directories
- ```cypress/data``` - contains data holding ts files. Why ts and no json or txt? ts files allow for logic to be incorporated into the script for more complex data generation. 
- ```cypress/e2e``` - where the test files reside 
- ```cypress/models``` - the data structor repository 
- ```cypress/page-objects``` - POM files
- ```.github/workflows``` - yamls for sclaing and CI

I have added comments in the code where necessary to explain whys and why nots

## Observations about buy ticket page
1. The [page](https://www.cp.pt/passageiros/en/buy-tickets) loads in a reasonable time. No fancy interactive modals, no login required, straight to the point. Even if the submission form was in any other language, one would have no troubles booking tickets.  
2. However, there are few areas of improvement starting with hard to tell what the icons mean in mobile view. 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/ef35b9ba-030b-4228-b1f4-179eefbea46e" />

3. Speaking of these icons, Next Trains seems to be an important link and should be listed somewhere more prominent instead of being listed with booking.com

4. The warnings (potential delays, cancellations etc) are tedious to go through on desktop than in mobile. In mobile view, all of them are listed, while in desktop you have to click through the carousel.
<img width="300" alt="image" src="https://github.com/user-attachments/assets/b7f0e44c-7234-49f4-87c1-ec15ec152214" />
   
5. Hard to navigate to children discount and other offers. Ideally, they should be listed right where the booking details are entered. 
6. A tooltip would be mighty helpful as to what these options entail - Alfa Pendular, Intercidades, Regional, Urban 

## Scaling 
How and where to run once the automation tests bloat to hundreds? Well, using GitHub actions (or equivalent in GitLab, BitBucket etc.

Run on either GitHub runners or self-hosted runners (depending on the cost). By leveraging reusable workflows, the tests could be integrated into the CI pipelines of other projects. 

Could use matrix runners and cypress action '''parallel''' flag to distribute the tests across multiple runners for a faster execution.  

There are multiple ways to tag the tests into various groups and run specific groups depending on what we wish to run. See [this](https://stackoverflow.com/questions/65045102/how-to-add-test-case-grouping-in-cypress)

Feel free to run the test in the action tab of the repo. 

## Areas of improvment
I am sure there are many, but lack of a mobile viewport test is a major one. Majority of the users will be on mobile. Easy to set up in cypress. I will set it up once I find time. 

Cypress logging is shambolic. However can set up our own custom logging. Another to do for me. 
