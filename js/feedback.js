(function() {
    emailjs.init("DkSbB9bF-Rdk7QVrY");//Public Key
})();

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };//取得input內容



    emailjs.send('service_dfrw7bo', 'template_azx7ayk', templateParams)//Service ID & Template ID
        .then(function(response) {
            alert('感謝您的意見與回饋！');
            const nameText = document.getElementById('name').value = ' '
            const emailText = document.getElementById('email').value = ' '
            const messageText = document.getElementById('message').value = ' '
        }, function(error) {
            alert('發送失敗，請重新發送。');
        });
});