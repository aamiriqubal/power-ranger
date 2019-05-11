# POWER RANGER

![](https://media.giphy.com/media/SsUc3ec7K5g5I5ZSyB/giphy.gif)

This project solves a below specified problem.

Program that solves the most suitable (with most power) link station for a device at given
point [x,y].

This problem can be solved in 2-dimensional space. Link stations have reach and power.
A link station’s power can be calculated:

```
power = (reach - device's distance from linkstation)^2
if distance > reach, power = 0
```
Program outputs following line:
```
if power > 0 “Best link station for point x,y is x,y with power z”
else “No link station within reach for point x,y”
```
Given:
```
Link stations are located at points (x, y) and have reach (r) ([x, y, r]):
[[0, 0, 10],
[20, 20, 5],
[10, 0, 12]]
```
## Input format
The input format should be a two dimentional in either of the below ways:
```
(1,0)
(100,1)
(18,18)
```
Or

```
1,0
100,1
18,18
```
each line should contains the (x,y) co-ordinates.

## Development
You need npm / yarn to run this application.

#Setup
```
git clone git@github.com:AamirSoftwareDeveloper/power-ranger.git
cd power-ranger
yarn install
yarn start
``` 
## Visua regression test
The visual regression test works using [testcafe](https://devexpress.github.io/testcafe/)
In one console run `yarn start` wait for the application to be up and then run.
```
yarn test
```
## Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
