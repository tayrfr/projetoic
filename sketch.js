function setup() {
  const keyboard = document.getElementById("keyboard");
  var textbox = document.getElementById("textbox");
  const backspace = document.getElementById("backspace");
  const deleteAll = document.getElementById("delete-all");
  const synth = window.speechSynthesis;
  let speakButton = document.getElementById("speak-button");
  let currentKey = null;

  // Função para selecionar uma letra do teclado
  function selectKey(key) {
    if (key === deleteAll) {
      textbox.value = "";
    } else if (key === backspace) {
      textbox.value = textbox.value.substring(0, textbox.value.length - 1);
    } else if (key === speakButton) {
      speakButton.click();
    }    
    else {
      textbox.value += key.textContent;
    }
  }

  // Evento para lidar com o clique em qualquer lugar do documento
  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("key")) {
      currentKey = event.target;
    } else if (currentKey) {
      selectKey(currentKey);
      currentKey = null;
  });

  // Evento para percorrer o teclado automaticamente
  let keys = keyboard.getElementsByClassName("key");
  let currentIndex = 0;

  function autoScan() {
    currentKey = keys[currentIndex];
    currentKey.focus();
    currentIndex = (currentIndex + 1) % keys.length;
  }

  setInterval(autoScan, 1000); // A cada segundo, o foco será movido para a próxima chave

  // Evento para lidar com o botão de backspace
  backspace.addEventListener("click", function() {
    textbox.value = textbox.value.substring(0, textbox.value.length - 1);
  });

  // Evento para lidar com o botão de delete-all
  deleteAll.addEventListener("click", function() {
    textbox.value = "";
  });

  // Evento para lidar com o botão de speak
    speakButton.addEventListener("click", function() {
    let textToSpeak = textbox.value;
    if (!textToSpeak) return;
    let speech = new SpeechSynthesisUtterance(textToSpeak);
    let voices = synth.getVoices();
    let selectedVoice = voices.find(
      (voice) => voice.name === "Google português do Brasil"
    );
    speech.voice = selectedVoice;
    speech.rate = 0.8;
    speech.pitch = 1;
    synth.speak(speech);
  });
}
