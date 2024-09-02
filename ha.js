const webhooks = {
    "living room": "http://192.168.0.155:8123/api/webhook/living-room-remote-toggle-lights-on-a-oOfKjGx5T5EOg7Igo0LdsE7e",
    "family room": "http://192.168.0.155:8123/api/webhook/family-room-toggle-lights-with-a-on-remote-HgVsng-rw8KjbC3B2wQ8BKfl",
    "bedroom": "http://192.168.0.155:8123/api/webhook/bedroom-remote-controls-light-DXkiWiOggCOM99FAuRgatDXS",
    "kitchen": "http://192.168.0.155:8123/api/webhook/kitchen-toggle-light-with-captouch-dXxqXL1n8J6I5SFQFh-zYoLt",
};
const params = new URLSearchParams(window.location.search);
const room = params.get("room");

if (room) {
    for (var hook in webhooks) {
        if (hook.indexOf(room) > -1) {
            webhooks["light"] = webhooks[hook];
        }
    }

}


const commands = {
    "time": speakCurrentTime
};

$(document).ready(function() {
    $('#button').click(); // Start hotword recognition
});

function trigger_webhook(webhook) {
$.ajax({
    url: webhooks[webhook],
    type: "GET",
    success: function(data) {
        console.log("Request succeeded:", data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
    }
});
}

window.callback = () => {
    getSpeech();
}

function speakCurrentTime() {
    // Get the current time
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours || 12; // Convert hour '0' to '12'

    const timeString = `Its ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    return timeString;
}
