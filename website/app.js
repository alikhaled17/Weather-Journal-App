/* Global Variables */
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=c3db8175b8696fc0aa661c1728d87524&units=metric';

const generatebutt = document.getElementById('generate');

//Get the date
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// function to get Data
const getWeathData = async (apiUrl, zipCode, apiKey) => {
  const result = await fetch(apiUrl + zipCode + apiKey);
  const weathData = await result.json();
  return weathData;
}

// function to POST data
const postWeathData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      feelings: data.feelings
    })
  })

  const newData = await req.json();
  return newData;
};

// Event listener on generate
generatebutt.addEventListener('click', (e) => {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value; // get Zip from user
  const feelings = document.getElementById('feelings').value; // get feelings from user

  getWeathData(apiUrl, zipCode, apiKey)
  .then(function (weathData) {
    postWeathData('/add', { date: newDate, temp: weathData.main.temp, feelings: feelings }) //  data to POST request
  }).then(function (newData) {
    updateUi() // update browser info.
  })

});

const updateUi = async () => {
  const req = await fetch('/all');
  const WethData = await req.json();
  // update browser values 
  document.getElementById('date').textContent = `Date: ${WethData.date}`;
  document.getElementById('temp').textContent = `Weather temp: ${WethData.temp} ^C`;
  document.getElementById('content').textContent = `Feelings: ${WethData.feelings}`;
};
