# React Costumized Navigation Bar

> it's a react component for creating fully functionnal stylish menu bar

Look at the header of most of websites, don't you often see that there is a menu that contains ( profile , principal sections of the website , login ... ), dear developer now you can implement quickly this solution and you are free to style it according to your preferences 😁
<!-- <br>
[Click me to see a demonstration ✋ !](https://demo-site.netlify.com/)
<br> -->
Let's Begin  😎 !
## Table of Contents
---
<div style="font-size:18px"> <a style="color: currentColor" href="#intro"> ➡️  Introduction </a> </div>
<ul>
    <a style="color: currentColor" href="#specs"><li>Specifications</li></a>
    <a style="color: currentColor" href="#features"><li>Actual & Upcoming Features</li></a>
</ul>
<div style="font-size:18px"> <a  style="color: currentColor" href="#start"> ➡️  Getting Started </a></div>
    <ul><a style="color:currentColor" href="#prerequisites"><li>Prequisities</li></a>
    <a style="color:currentColor" href="#install"><li>Installing</li></a>
    <a style="color:currentColor" href="#example"><li>Example</li></a><a style="color:currentColor" href="#props"><li>Bar Menu Properties</li></a></ul>
<div style="font-size:18px"><a style="color:currentColor" href="#styling">➡️ Styling the bar menu</a></div>
<ul><a style="color:currentColor" href="#styling1"><li>Material Design Theme</li></a>
<a style="color:currentColor" href="#styling2"><li>Inline Css Styles</li></a></ul>
<div style="font-size:18px"><a style="color:currentColor" href="#author"> ➡️  Authors </a></div>
<div style="font-size:18px"><a style="color:currentColor" href="#licence"> ➡️  Licence </a></div>

<div id="intro">

## Introduction
------



<!-- Here A gif that demonstrate the outcome of the lib -->
<br>
![image]

<div id="specs">

### ► Specifications :
• Easy to use 😉
<br> • Support material design themes 📔
<br> • Full style customization ✂️
<br> • Place it anywhere in your code, it'll work 🎯
<br> • All Browsers(IE, Firefox, Chrome ...) Support 🚀

</div>
<div id ="features">

###  ►  Actual & Upcoming Features :
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;☑️ Support both vertical and horizontal mode<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;☑️ Rendering Multiple Sub Items of each Bar Item <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;☑️ Add-on material design theme for styling <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⏹️ Support Rendering Sub Items of Each Sub Items <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⏹️ Add-on Styled Profile Section with support of design theme system <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⏹️ Add-on Styled Notification Section with support of design theme system <br>

</div>
</div>
<div id="start">

## Getting Started
------
It's simple whether you are a newbie or expert with React, just by following the instructions below you'll be able to use this library and do this cool stuff !
<div id="prerequisites">

###  ►  Prerequisites
</div>

Since you are working with react, it's fine you'll not need to install any other dependancy, 'React >= 16.0' is the only dependancy of this helper 🤗.
<div id="install">

###  ►  Installing
</div>

This package is available in npm repository as react-costumized-nav-bar.
`````
npm install react-costumized-nav-bar --save
`````
Or by Using Yarn.
`````
yarn add react-costumized-nav-bar --save
`````
Now wherever you want in your project, you can import it
`````
import {Bar, BarItem, SubBarItem} from 'react-costumized-nav-bar';
`````
<div id="example">

###  ►  Example
</div>

*It's so simple, The name of each Tag is pretty understandable 😉 ; For more clarification ↓↓↓ check the example below ↓↓↓*

The sample code :
```
import {Bar, BarItem, SubBarItem} from 'react-costumized-nav-bar';

...
<Bar itemWidth={80}>
<BarItem title={"Section 1"}>
    <SubBarItem title={"SubItem 1.1"} />
    <SubBarItem title={"SubItem 1.2"} />
</BarItem>
<BarItem title={"Section 2"}></BarItem>
<BarItem title={"Section 3"}>
    <SubBarItem title={"SubItem 3.1"} />
</BarItem>
<BarItem title={"Section 4"} />
</Bar>
...
```
The output result :
<br><br>
<!-- ![image] -->
<div id="props">

###  ►  Bar Menu Properties
</div>

<table>
    <tr><td>Property</td><td>Value</td><td>Description</td></tr>
</table>
<br>

<div id="styling">

##  Styling the bar menu
</div>

-------

<br>
<div id="author">

## Authors
</div>

-------
* **Boumhicha El Mehdi** - *Initial work* - [Elmehdibm](https://github.com/elmehdibm/)
<br>
(*Dear developers you're welcome to contribute in this work or just try this solution and leave some comments or maybe some stars to make the helper more available to everyone * 🙏)

<div id="licence">

## License
</div>

--------
This project is licensed under the MIT License - see the [LICENSE.md](.\LICENSE.md) file for details
