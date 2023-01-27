function setup() {
const keyboard = document.getElementById("keyboard");
const textbox = document.getElementById("textbox");
const backspace = document.getElementById("backspace");
const deleteAll = document.getElementById("delete-all");

keyboard.addEventListener("click", function(event) {
  if (event.target.classList.contains("key")) {
    if (event.target === deleteAll) {
      textbox.value = "";
    }
    if (event.target === backspace) {
      textbox.value = textbox.value.substring(0, textbox.value.length - 1);
    } else {
      textbox.value += event.target.textContent;
    }
  }
});

const synth = window.speechSynthesis;
let speakButton = document.getElementById("speak-button");

speakButton.addEventListener("click", function() 
{
  let textToSpeak = textbox.value;
  if (!textToSpeak) return;
  let speech = new SpeechSynthesisUtterance(textToSpeak);
  let voices = synth.getVoices();
  let selectedVoice = voices.find(voice => voice.name === "Google português do Brasil");
speech.voice = selectedVoice;
  speech.rate = 0.8;
  speech.pitch = 1;
  synth.speak(speech);
});
  

const suggestionRow = document.getElementById("suggestion-row");

textbox.addEventListener("keyup", function() {
  let currentWord = textbox.value.split(" ").slice(-1)[0];

  const options = {
  method: 'GET',
  url: 'https://omrivolk-autocomplete-v1.p.rapidapi.com/complete',
  params: {s: 'un'},
  headers: {
    'X-RapidAPI-Key': 'c26a30855bmshf1a2561254023a8p112d8ajsnc50a244ff6c8',
    'X-RapidAPI-Host': 'omrivolk-autocomplete-v1.p.rapidapi.com'
  }}
  // Use the currentWord to make an API call to a word suggestion service
  // and retrieve suggestions
  axios.get(`https://omrivolk-autocomplete-v1.p.rapidapi.com/complete`)
    .then(response => {
      // Clear previous suggestions
      suggestionRow.innerHTML = "";

      // Add new suggestions as buttons
      response.data.suggestions.forEach(suggestion => {
        let button = document.createElement("button");
        button.innerHTML = suggestion;
        button.classList.add("suggestion-button");
        button.addEventListener("click", function() {
          textbox.value += suggestion + " ";
        });
        suggestionRow.appendChild(button);
      });
    });
});


}
