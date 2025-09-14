

document.querySelector('video').playbackRate = 2.0;


const stack = document.getElementById("stack");

const HTMLCSS = document.createElement("img");
HTMLCSS.setAttribute("src", "images/techStackImages/htmlCSS.png");
HTMLCSS.classList.add("stackImg");
// HTMLCSS.style.marginBottom = "60px";

const Java = document.createElement("img");
Java.setAttribute("src", "images/techStackImages/java.png");
Java.classList.add("stackImg");

const Python = document.createElement("img");
Python.setAttribute("src", "images/techStackImages/python.png");
Python.classList.add("stackImg");

const CSharp = document.createElement("img");
CSharp.setAttribute("src", "images/techStackImages/csharp.png");
CSharp.classList.add("stackImg");

const React = document.createElement("img");
React.setAttribute("src", "images/techStackImages/React.png");
React.classList.add("stackImg");

const JS = document.createElement("img");
JS.setAttribute("src", "images/techStackImages/JS.png");
JS.classList.add("stackImg");

const GoogleCloud = document.createElement("img");
GoogleCloud.setAttribute("src", "images/techStackImages/GoogleCloud.png");
GoogleCloud.classList.add("stackImg");

const PHP = document.createElement("img");
PHP.setAttribute("src", "images/techStackImages/PHP.png");
PHP.classList.add("stackImg");

const MySQL = document.createElement("img");
MySQL.setAttribute("src", "images/techStackImages/MySQL.png");
MySQL.classList.add("stackImg");






const skillNames = ["HTML/CSS", "Java", "Python", "C#", "React.js", "JavaScript", "Google Cloud", "PHP", "MySQL"];
const skillProjects = [["Portfolio", "SoundScribe", "TeamUp", "Abstract Operators Internship"], ["No complete projects yet, but check back in the future!"], ["SoundScribe", "Abstract Operators Internship"], ["No complete projects yet, but check back in the future!"], ["EventSync Internship", "Abstract Operators Internship"], ["Portfolio", "SoundScribe", "TeamUp", "Abstract Operators Internship", "EventSync Internship"], ["TeamUp"], ["TeamUp"], ["TeamUp"]];


const infoPanel = document.querySelector(".techStackInfoPanel");
const title = document.createElement("h3");
const projectList = document.createElement("p");
projectList.classList.add("techProjects");
title.innerText = "See my tech stack!"
projectList.innerText = "See which projects I used my skills on!";
title.classList.add("techTitle");
infoPanel.appendChild(title);
infoPanel.appendChild(projectList);

const stackDataFirst = [HTMLCSS, Java, Python, CSharp]; // List of items to push
const stackDataSecond = [React, JS, GoogleCloud, PHP];
const stackDataThird = [MySQL];
let stackDataCollection = [stackDataFirst, stackDataSecond, stackDataThird];
let stackCollectionIndex = 0;
let index = 0;
// let totalCount = 0;
const state = {
    _totalCount: 0,

    get totalCount() {
        return this._totalCount;
    },

    set totalCount(newVal) {
        this._totalCount = newVal;
        if (!isClearingForNextStack && !isRestacking) {
            if (newVal == 0 && index == 0 && currentCount == 0) {
                title.innerText = "See my tech stack!";
                projectList.innerText = "See which projects I used my skills on!";
            }
            else {
                title.innerText = skillNames[newVal - 1];
            }
            let projectArray = skillProjects[newVal - 1];
            let projectListString = "";
            for (let i = 0; i < projectArray.length - 1; i++) {
                projectListString += "- " + projectArray[i] + "\n";
            }
            projectListString += "- " + projectArray[projectArray.length - 1];
            projectList.innerText = projectListString;
        }
    }
};

let currentCount = 0;
let stackData = stackDataCollection[stackCollectionIndex];
let isClearingForNextStack = false;
let isRestacking = false;

document.querySelector("#popButton").disabled = true;

let totalLength = 0;
for (let i = 0; i < stackDataCollection.length; i++) {
    totalLength += stackDataCollection[i].length;
}


function pushElement() {
    if (state.totalCount < totalLength) { //If totalCount is less than the lengths of all the stacks combined, continue. Otherwise you can't push anymore

        if (currentCount == stackData.length) { //If the stack is filled (4)
            if (stackDataCollection.length > stackCollectionIndex + 1) { //If there is still another stack of data to go next, clear and use that
                // console.log("Clear now");
                isClearingForNextStack = true;
                clearStack();
                setTimeout(() => {
                    stackCollectionIndex++;
                    state.totalCount += 4;
                    index = 0;
                    stackData = stackDataCollection[stackCollectionIndex];
                    isClearingForNextStack = false;
                    pushElement();
                }, 1000);
            }
        }
        else {
            // STUFF TO ACTUALLY ADD AN ELEMENT
            document.querySelector("#popButton").disabled = false;
            const el = document.createElement("div");
            el.className = "element";
            el.appendChild(stackData[index++]);
            stack.appendChild(el);
            currentCount++;
            state.totalCount++;

            console.log("current index: ", index);
            console.log("current count", currentCount);
            console.log("total count: ", state.totalCount);
        }

        // If you have now reached the very end of all the lists, you can't push anymore
        if (state.totalCount == totalLength) {
            document.querySelector("#pushButton").disabled = true;
        }

    }
}

function popElement() {

    document.querySelector("#pushButton").disabled = false;
    const last = stack.lastElementChild;
    if (last) {
        last.style.animation = "popOut 0.3s ease-out forwards";
        setTimeout(() => last.remove(), 200);
        index--; // Optional: step back in the list if you want to re-push same items
        currentCount--;
        state.totalCount--;
        if (currentCount == 0 && state.totalCount != 0 && !isClearingForNextStack) {
            console.log("restack here");
            isRestacking = true;
            // console.log(isRestacking);
            setTimeout(() => {
                refillStack(stackCollectionIndex - 1);
                setTimeout(() => {
                    isRestacking = false;
                }, 1000)

            });

        }
    }
    if (index == 0) {
        document.querySelector("#popButton").disabled = true;
    }
    console.log("POPPED");
    console.log("Pop index: ", index);
    console.log("Current count: ", currentCount);
    console.log("Total count: ", state.totalCount);

    if (state.totalCount == 0) {
        document.querySelector("#popButton").disabled = true;
    }
}





function clearStack() {
    popElement();

    setTimeout(() => {

        popElement();

    }, 250);

    setTimeout(() => {

        popElement();

    }, 500);

    setTimeout(() => {

        popElement();
        // index += 4;
        currentCount = 0;
    }, 750);
}



function refillStack(newCollectionIndex) {
    stackCollectionIndex = newCollectionIndex;
    stackData = stackDataCollection[stackCollectionIndex];

    const itemsToPush = stackData.length;
    index = 0;
    currentCount = 0;

    for (let i = 0; i < itemsToPush; i++) {
        setTimeout(() => {
            pushElement();
        }, i * 250);
    }

    state.totalCount -= (itemsToPush - 1);
    state.totalCount--;
}












const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});



