document.addEventListener('DOMContentLoaded', function() {
    const foodSlider = document.getElementById('foodSlider');
    const foodValue = document.getElementById('foodValue');
    const transportSelect = document.getElementById('transportSelect');
    const result = document.getElementById('result');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn');

    let currentQuestion = 1;
    let scores = {
        food: 50,
        transport: 30,
        home: 50
    };

    function updateValue(slider, valueSpan) {
        valueSpan.textContent = slider.value;
    }

    function showPreviousQuestion() {
        document.getElementById(`question${currentQuestion}`).style.display = 'none';
        currentQuestion--;
        document.getElementById(`question${currentQuestion}`).style.display = 'block';
    }

    function showNextQuestion() {
        document.getElementById(`question${currentQuestion}`).style.display = 'none';
        currentQuestion++;
        const nextQuestion = document.getElementById(`question${currentQuestion}`);
        if (nextQuestion) {
            nextQuestion.style.display = 'block';
        } else {
            calculateFootprint();
        }
    }

    function calculateFootprint() {
        scores.food = parseInt(foodSlider.value);
        scores.transport = parseInt(transportSelect.value);
        scores.home = parseInt(document.querySelector('input[name="homeEfficiency"]:checked').value);

        const totalScore = scores.food + scores.transport + scores.home;

        let footprint;
        if (totalScore < 100) {
            footprint = "Low";
        } else if (totalScore < 200) {
            footprint = "Medium";
        } else {
            footprint = "High";
        }

        result.textContent = `Your carbon footprint is: ${footprint}`;
        result.style.display = 'block';
    }

    foodSlider.oninput = function() {
        updateValue(this, foodValue);
    };

    prevButtons.forEach(button => {
        button.addEventListener('click', showPreviousQuestion);
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', showNextQuestion);
    });

    // Initialize values
    updateValue(foodSlider, foodValue);
});