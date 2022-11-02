const textarea = document.querySelector('#text');
let voicelist = document.querySelector('#voice');
let speechbtn = document.querySelector('.submit');

let synth = speechSynthesis; // web API 저장
let isSpeaking = true;

function voicespeech() {
  for (let voice of synth.getVoices()) {
    // 있는 소리를 다 가져오고, 그 소리마다 option태그로 넣어주기
    /* SpeechSynthesis.getVoices();
    Returns a list of SpeechSynthesisVoice objects 
representing all the available voices on the current device. */
    console.log(voice);
    let option = document.createElement('option');
    option.text = voice.name;
    /*SpeechSynthesisVoice {
        voiceURI: 'Microsoft Heami - Korean (Korean)', 
        name: 'Microsoft Heami - Korean (Korean)', 
        lang: 'ko-KR', 
        localService: true, 
        default: true}

        default: true
        lang: "ko-KR"
        localService: true
        name: "Microsoft Heami - Korean (Korean)"
        voiceURI: "Microsoft Heami - Korean (Korean)"
        [[Prototype]]: SpeechSynthesisVoice
     */
    voicelist.add(option);
    console.log(option);
  }
}

synth.addEventListener('voiceschanged', voicespeech); // 소리 바꾸면 일어나는 일
/* Events
Listen to this event using addEventListener() or by assigning an event listener 
to the oneventname property of this interface.

voiceschanged
Fired when the list of SpeechSynthesisVoice objects that would be returned 
by the SpeechSynthesis.getVoices() method has changed. 
Also available via the onvoiceschanged property. */

function texttospeech(text) {
  let utternance = new SpeechSynthesisUtterance(text); // text를 읽게 만들어주는 객체 만들어오기
  /* This Web Speech API interface represents a speech request. 
  It contains the content the speech service should read and information 
  about how to read it (e.g. language, pitch and volume.) */
  for (let voice of synth.getVoices()) {
    if (voice.name === voicelist.value) {
      utternance.voice = voice;
    }
  }
  speechSynthesis.speak(utternance);
}

speechbtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (textarea.value != '') {
    if (!synth.speaking) {
      texttospeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechbtn.innerHTML = 'Pause Speech';
      } else {
        synth.pause();
        isSpeaking = true;
        speechbtn.innerHTML = 'Resume Speech';
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechbtn.innerHTML = 'Convert To Speech';
        }
      });
    } else {
      speechbtn.innerHTML = 'Convert To Speech';
    }
  }
});
