document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let userMessage = this.value;
        let chatMessages = document.getElementById('chatbot-messages');
        
        let userMsgElement = document.createElement('p');
        userMsgElement.textContent = "👩: " + userMessage;
        chatMessages.appendChild(userMsgElement);
        
        let botMsgElement = document.createElement('p');
        botMsgElement.textContent = "🤖: Thank you for your question! I'm still learning. 😊";
        chatMessages.appendChild(botMsgElement);

        this.value = '';
    }
});
