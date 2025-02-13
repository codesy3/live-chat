const ably = new Ably.Realtime('pM-ddA.ZbUG5g:uJoBm_lSQjCl8VZlAcVSaEGMH9ZcYFfJHZLKAtVCfps'); // Replace with your Ably API key
const channel = ably.channels.get('chat');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const musicInput = document.getElementById('music-input');
const audioPlayer = document.getElementById('audio-player');
const usernameInput = document.getElementById('username-input');

// Listen for messages
channel.subscribe('chat', (message) => {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', 'received');
    msgElement.innerHTML = `<strong>${message.data.username}:</strong> ${message.data.text}`;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight; 
});

// Send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const username = usernameInput.value || 'Anonymous'; 
    if (message) {
        const msgElement = document.createElement('div');
        msgElement.classList.add('message', 'sent');
        msgElement.innerHTML = `<strong>${username}:</strong> ${message}`;
        chatBox.appendChild(msgElement);
        
        
        channel.publish('chat', { username: username, text: message });
        
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; 
    }
});

// Handle music upload
musicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.play();
    }
});
