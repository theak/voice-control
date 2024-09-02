/*const grammar =
      "#JSGF V1.0; grammar commands; public <command> = turn on living room | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
*/
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


var recognition = new SpeechRecognition();
/*const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;*/
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function getSpeech() {
    recognition.start();
}

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    for (var hook in webhooks) {
        if (transcript.indexOf(hook) > -1) {
            window.sounds['ok'].play();
            return trigger_webhook(hook);
        }
    }
    for (var command in commands) {
        if (transcript.indexOf(command) > -1) {
            const utterance = new SpeechSynthesisUtterance(commands[command]());
            window.speechSynthesis.speak(utterance);
            return;
        }
    }
};
