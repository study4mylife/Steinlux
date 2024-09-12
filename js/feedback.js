// 初始化 emailjs
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("DkSbB9bF-Rdk7QVrY");
});

document.getElementById('feedback-submit').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('請填寫所有欄位');
        return;
    }

    var templateParams = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send('service_scjhw1v', 'template_azx7ayk', templateParams)
        .then(function(response) {
            alert('感謝您的意見與回饋！');
            document.getElementById('feedback-form').reset(); // 清除表單資料
        }, function(error) {
            alert('發送失敗，請重新發送。');
        });
});