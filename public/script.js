var localRank = [];
var tempIds = [];
var localCount = [];
let lastCalledTime = 0;


function startState() {

  var number = 100;

  var html = `<div class="container ali">
    <div class="row">
      <div class="col">
          <span class="ranking-number mr-2" style="float: left;">1</span>
        <img class="switcherIMG" src="https://via.placeholder.com/60x60" alt="Placeholder image" >
        <span class="switchTEXT" style="color: white; display:inline-block;margin-left:10px; margin-top: 20px;"></span>
        <span class="switchP" style="float:right; margin-top: 20px; color: white;">Text on right</span>
      </div>
    </div>`

  const div = document.getElementById('rank');
  for (let i = 0; i < number; i++) {
    div.innerHTML += html;
  }








  const switchElement = document.getElementById("toggle");


  switchElement.checked = false;

  const bgDarkDiv = document.querySelector(".bg-dark");
  bgDarkDiv.style.border = "none";
  bgDarkDiv.style.borderRadius = "none";
  bgDarkDiv.style.boxShadow = "none";




}


function populatePage() {
  mountRank();

  var flag = 1;

  const myOnOffSwitch2 = document.getElementById("myonoffswitch2");

  const inputText1 = document.getElementById("input-text");

  var inputText = inputText1.value;



  myOnOffSwitch2.addEventListener("change", function() {
    if (this.checked) {
      inputText1.setAttribute("placeholder", "Ep.");
      flag = 0;
    } else {
      inputText1.setAttribute("placeholder", "Cap.");
      flag = 1;
    }
  });

  return new Promise((resolve, reject) => {
    // Load the JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        // Pick a random instance of an object

        //console.log(flag);


        randomIndex1 = Math.floor(Math.random() * data.length);
        randomObject = data[randomIndex1];

        var switchElement = document.getElementById("toggle");

        if (switchElement.checked) {

          inputText = parseInt(inputText)
          //console.log(inputText);

          switch (flag) {
            case 0:
              //console.log(randomObject.name + " " + randomObject.debut_ep + " > " + inputText);
              while (randomObject.debut_ep > inputText) {
                //console.log(randomObject.name + " " + randomObject.debut_ep + " > " + inputText);
                randomIndex1 = Math.floor(Math.random() * data.length);
                randomObject = data[randomIndex1];
              }
              break;

            case 1:
              //console.log(randomObject.name + " " + randomObject.debut_ch + " > " + inputText);
              while (data[randomIndex1].debut_ch > inputText) {
                //console.log(randomObject.name + " " + randomObject.debut_ch + " > " + inputText);
                randomIndex1 = Math.floor(Math.random() * data.length);
                randomObject = data[randomIndex1];
              }
              break;

            default:
              console.log("default");
          }
        }







        //console.log(data[randomIndex1].name + " " + randomIndex1);






        // Populate the page with the object's attributes
        title = document.querySelector('#title1');
        image = document.querySelector('#image1');

        title.textContent = randomObject.name;

        image.src = randomObject.image_url;

        randomIndex2 = Math.floor(Math.random() * data.length);
        randomObject = data[randomIndex2];

        if (switchElement.checked) {

          inputText = parseInt(inputText)
          //console.log(inputText);



          switch (flag) {
            case 0:
              //console.log(randomObject.name + " " + randomObject.debut_ep + " > " + inputText);
              while (randomObject.debut_ep > inputText || randomIndex2 == randomIndex1) {
                //console.log(randomObject.name + " " + randomObject.debut_ep + " > " + inputText);
                randomIndex2 = Math.floor(Math.random() * data.length);
                randomObject = data[randomIndex2];
              }
              break;

            case 1:
              //console.log(randomObject.name + " " + randomObject.debut_ch + " >" + inputText);
              while (data[randomIndex2].debut_ch > inputText || randomIndex2 == randomIndex1) {
                //console.log(randomObject.name + " " + randomObject.debut_ch + " > " + inputText);
                randomIndex2 = Math.floor(Math.random() * data.length);
                randomObject = data[randomIndex2];
              }
              break;

            default:
              console.log("default");
          }
        }



        //console.log(data[randomIndex2].name + " " + randomIndex2);

        // Populate the page with the object's attributes
        title = document.querySelector('#title2');
        image = document.querySelector('#image2');

        title.textContent = randomObject.name;

        image.src = randomObject.image_url;

        const id = [];
        id[0] = randomIndex1;
        id[1] = randomIndex2;

        tempIds[0] = randomIndex1;
        tempIds[1] = randomIndex2;


        resolve(id);
      })
      .catch((error) => {

        populatePage();
      });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function registerVote() {

  var tempFlag1 = 1;


  const clickable = document.querySelector('.clickable');

  clickable.addEventListener('click', () => {

    clickable.classList.add('highlight');
    setTimeout(() => {
      clickable.classList.remove('highlight');
    }, 600); // adjust time as needed
  });


  const clickable2 = document.querySelector('.clickable2');

  clickable2.addEventListener('click', () => {
    clickable2.classList.add('highlight');
    setTimeout(() => {
      clickable2.classList.remove('highlight');
    }, 600); // adjust time as needed
  });

  await new Promise(r => setTimeout(r, 300));


  const flipButton = document.getElementById('flip-button');
  const imageContainer = document.querySelector('.flip');
  const imageContainer2 = document.querySelector('.flip2');




  try {



    imageContainer.classList.toggle('flipper');
    imageContainer2.classList.toggle('flipper');

    var fetchArray = await populatePage();

    await new Promise(r => setTimeout(r, 200));

    imageContainer.classList.toggle('flipper');
    imageContainer2.classList.toggle('flipper');



  } catch (error) {
    // handle the error here
    console.error(error);
  }



}

async function click1() {



  let now = Date.now();
  if (now - lastCalledTime < 1000) {
    return;
  }

  lastCalledTime = now;

  var myKey = 0

  // await fetch('/api/rankDB')
  //   .then(response => response.json())
  //   .then(data => {
  //     rankPC = data.values;
  //     console.log(myKey);
  //   })
  //   .catch(error => console.error(error));

  // rankPC[tempIds[0]] += 1;




  //var rankPCString = JSON.stringify(rankPC);

  // countPC = [];

  //var storedArrayString2 = localStorage.getItem('countPC');
  // await fetch('/api/countDB')
  //   .then(response => response.json())
  //   .then(data => {
  //     countPC = data.values;
  //     console.log(myKey);
  //   })
  //   .catch(error => console.error(error));



  // var countPC = JSON.parse(storedArrayString2);

  // countPC[tempIds[0]] += 1;
  // countPC[tempIds[1]] += 1;

  sender = [tempIds[0], tempIds[1], tempIds[0]];

  // console.log({sender});
  // console.log(sender);

  //countPC = JSON.stringify(countPC);
  //rankPC = JSON.stringify(rankPC);

  //var countPCString = JSON.stringify(countPC);

  //console.log(JSON.stringify({ values: countPC }))

  // console.log(rankPC);
  // console.log(countPC)

  // console.log(JSON.stringify(rankPC));
  // console.log(JSON.stringify(countPC));

  //console.log(JSON.stringify({ values: rankPC }))

  // var dataRank = {rankPC}
  // var dataCount = {countPC}

  fetch('/apiPost/rankDB', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender })
  })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error(error));











  fetch('/apiPost/countDB', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender })
  })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error(error));



  // localStorage.setItem("countPC", countPCString);
  // localStorage.setItem("rankPC", rankPCString);

  await registerVote();
}


async function click2() {



  let now = Date.now();
  if (now - lastCalledTime < 1000) {
    return;
  }

  lastCalledTime = now;

  var myKey = 0

  // await fetch('/api/rankDB')
  //   .then(response => response.json())
  //   .then(data => {
  //     rankPC = data.values;
  //     console.log(myKey);
  //   })
  //   .catch(error => console.error(error));

  // rankPC[tempIds[1]] += 1;




  //var rankPCString = JSON.stringify(rankPC);

  // countPC = [];

  //var storedArrayString2 = localStorage.getItem('countPC');
  // await fetch('/api/countDB')
  //   .then(response => response.json())
  //   .then(data => {
  //     countPC = data.values;
  //     console.log(myKey);
  //   })
  //   .catch(error => console.error(error));



  // var countPC = JSON.parse(storedArrayString2);

  // countPC[tempIds[0]] += 1;
  // countPC[tempIds[1]] += 1;

  sender = [tempIds[0], tempIds[1], tempIds[1]];

  //countPC = JSON.stringify(countPC);
  //rankPC = JSON.stringify(rankPC);

  //var countPCString = JSON.stringify(countPC);

  //console.log(JSON.stringify({ values: countPC }))

  // console.log(rankPC);
  // console.log(countPC)

  // console.log(JSON.stringify(rankPC));
  // console.log(JSON.stringify(countPC));

  //console.log(JSON.stringify({ values: rankPC }))

  // var dataRank = {rankPC}
  // var dataCount = {countPC}

  fetch('/apiPost/rankDB', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender })
  })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error(error));











  fetch('/apiPost/countDB', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender })
  })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error(error));



  // localStorage.setItem("countPC", countPCString);
  // localStorage.setItem("rankPC", rankPCString);

  await registerVote();
}

async function mountRank() {

  //var rankPC = localStorage.getItem('rankPC');
  var rankArray = [];

  await fetch('/api/rankDB')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      rankArray = data.values;



      //console.log(rankArray);
    })
    .catch(error => console.error(error));



  //var rankArray = JSON.parse(rankPC);

  //   var arrayString = JSON.stringify(localRank);
  //  localStorage.setItem("rankPC", arrayString);

  //  rankPC = localStorage.getItem('rankPC');
  //  rankArray = JSON.parse(rankPC);

  countArray = [];


  await fetch('/api/countDB')
    .then(response => response.json())
    .then(data => {
      countArray = data.values;
      //console.log(countArray);
    })
    .catch(error => console.error(error));

  //console.log(typeof(countArray));

  //var countPC = localStorage.getItem('countPC');
  //var countArray = JSON.parse(countPC);

  // var arrayString3 = JSON.stringify(localCount);
  // localStorage.setItem("countPC", arrayString3);

  //  countPC = localStorage.getItem('countPC');
  //countArray = JSON.parse(countPC);

  let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //console.log(testArray);

  var auxArray = [];


  for (let i = 0; i < rankArray.length; i++) {
    if (countArray[i] > 0) {
      auxArray[i] = (rankArray[i] / countArray[i]) * 100;
    }
    else {
      auxArray[i] = 0;
    }
  }



  var numRank = 200;

  if (rankArray != null) {


    var copy = [...auxArray];


    copy.sort((a, b) => b - a);

    var tempValue = copy.reduce((acc, val) => val === copy[numRank - 1] ? acc + 1 : acc, 0);

    var top = copy.slice(0, numRank);


    for (let g = numRank; g < numRank + tempValue + 10; g++) {
      if (copy[g] == copy[numRank - 1]) {
        top.push(copy[g]);
      }
      else {
        break;
      }
    }


    var auxArray2 = [...auxArray];



    var ttIndex = [];

    for (let j = 0; j < top.length; j++) {


      for (let i = 0; i < auxArray2.length; i++) {
        if (top[j] == 0) { break; }
        if (top[j] == auxArray2[i]) {
          ttIndex.push(i);
          auxArray2[i] = -1;
          break;
        }



      }
    }


    var n = ttIndex.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {

        if (auxArray[ttIndex[j]] == auxArray[ttIndex[j + 1]]) {
          if (countArray[ttIndex[j]] < countArray[ttIndex[j + 1]]) {

            var tempor = ttIndex[j];
            ttIndex[j] = ttIndex[j + 1];
            ttIndex[j + 1] = tempor;
          }
        }


      }

    }






    //console.log(topThree);
    //console.log(ttIndex);

    return new Promise((resolve, reject) => {
      // Load the JSON file
      fetch('/data.json')
        .then(response => response.json())
        .then(data => {


          var rObject = [];
          var counter = 0;
          var counter2 = 0;
          var counter3 = 0;
          var counter0 = 0;

          for (let h = 0; h < ttIndex.length; h++) {
            rObject[h] = data[ttIndex[h]]
          }

          const elementsRank = document.querySelectorAll('.ranking-number');

          elementsRank.forEach((element) => {
            if (rObject[counter0]) {
              element.textContent = (counter0 + 1).toString();
              counter0++;
            }
          });


          const elements = document.querySelectorAll('.switcherIMG'); // replace 

          elements.forEach((element) => {
            if (rObject[counter]) {
              element.src = rObject[counter].image_url;
              counter++;
            }
          });


          const elementsTxt = document.querySelectorAll('.switchTEXT');

          elementsTxt.forEach((element) => {
            if (rObject[counter2]) {
              element.textContent = rObject[counter2].name;
              counter2++;
            }
          });

          var percent = 0;


          const elementsPercent = document.querySelectorAll('.switchP');

          elementsPercent.forEach((element) => {
            if (rObject[counter3]) {

              if (((rankArray[ttIndex[counter3]] / countArray[ttIndex[counter3]]) * 100) > 100) {
                percent = 100;
              }
              else {
                percent = (rankArray[ttIndex[counter3]] / countArray[ttIndex[counter3]]) * 100;
              }

              element.textContent = (percent).toFixed(3) + "% " + countArray[ttIndex[counter3]];
              counter3++;
            }





          });




        })
        .catch(error => reject(error));
    });
  }


}

function applyNeonBorder() {
  // get the switch element by its id
  const switchElement = document.getElementById("toggle");

  const antispoiler = document.getElementById("anti-spoiler-text");

  // get the div with class "bg-dark"
  const bgDarkDiv = document.querySelector(".bg-dark");

  // apply neon blue border if switch is on, otherwise remove border
  if (switchElement.checked) {
    bgDarkDiv.style.border = "3px solid #4fd17d";
    bgDarkDiv.style.borderRadius = "10px";

  } else {
    bgDarkDiv.style.border = "none";
    bgDarkDiv.style.borderRadius = "none";
    bgDarkDiv.style.boxShadow = "none";
  }

  // constantly check switch state so that it responds instantly
  switchElement.addEventListener("change", function() {
    if (switchElement.checked) {
      bgDarkDiv.style.border = "3px solid #4fd17d";
      bgDarkDiv.style.borderRadius = "10px";
      antispoiler.textContent = "Spoilers Desativados!";

    } else {
      bgDarkDiv.style.border = "none";
      antispoiler.textContent = "Desativar Spoilers?";
      bgDarkDiv.style.borderRadius = "none";
      bgDarkDiv.style.boxShadow = "none";
    }
  });
}









