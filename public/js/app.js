console.log('Sever side Javascript is working');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    // the local host is not existing on HEROKU
    // fetch(`http://localhost:3000/weather?address=${location}`)

    // This will work with local host and heroku
    fetch(`/weather?address=${location}`)
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error;                
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        })    
    })
})