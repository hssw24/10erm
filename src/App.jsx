<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mathe Lernapp</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; transition: background-color 0.5s; }
        .btn { padding: 10px 20px; margin: 10px; font-size: 18px; cursor: pointer; }
        .hidden { display: none; }
        .wrong { background-color: red; }
    </style>
</head>
<body>
    <h1>Mathe Lernapp</h1>
    <h2 id="question">Lade Aufgabe...</h2>
    <div id="buttons"></div>
    <p id="stats" class="hidden"></p>
    <button id="restart" class="btn hidden" onclick="startGame()">Nochmal spielen</button>

    <script>
        const tasks = [
            { a: 18, b: 9, result: 9 }, { a: 17, b: 8, result: 9 }, { a: 17, b: 9, result: 8 },
            { a: 16, b: 7, result: 9 }, { a: 16, b: 8, result: 8 }, { a: 16, b: 9, result: 7 },
            { a: 15, b: 6, result: 9 }, { a: 15, b: 7, result: 8 }, { a: 15, b: 8, result: 7 },
            { a: 15, b: 9, result: 6 }, { a: 14, b: 5, result: 9 }, { a: 14, b: 6, result: 8 },
            { a: 14, b: 7, result: 7 }, { a: 14, b: 8, result: 6 }, { a: 14, b: 9, result: 5 },
            { a: 13, b: 4, result: 9 }, { a: 13, b: 5, result: 8 }, { a: 13, b: 6, result: 7 },
            { a: 13, b: 7, result: 6 }, { a: 13, b: 8, result: 5 }, { a: 13, b: 9, result: 4 },
            { a: 12, b: 3, result: 9 }, { a: 12, b: 4, result: 8 }, { a: 12, b: 5, result: 7 },
            { a: 12, b: 6, result: 6 }, { a: 12, b: 7, result: 5 }, { a: 12, b: 8, result: 4 },
            { a: 12, b: 9, result: 3 }, { a: 11, b: 2, result: 9 }, { a: 11, b: 3, result: 8 },
            { a: 11, b: 4, result: 7 }, { a: 11, b: 5, result: 6 }, { a: 11, b: 6, result: 5 },
            { a: 11, b: 7, result: 4 }, { a: 11, b: 8, result: 3 }, { a: 11, b: 9, result: 2 }
        ];

        let questions = [];
        let currentIndex = 0;
        let correct = 0;
        let wrong = 0;
        let startTime;

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function generateAnswers(correct) {
            let answers = new Set([correct]);
            while (answers.size < 3) {
                answers.add(correct + Math.floor(Math.random() * 5) - 2);
            }
            return shuffle([...answers]);
        }

        function displayQuestion() {
            if (currentIndex >= questions.length) {
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                document.getElementById('question').innerText = "Fertig!";
                document.getElementById('buttons').innerHTML = "";
                document.getElementById('stats').innerText = `Richtig: ${correct}, Falsch: ${wrong}, Zeit: ${elapsedTime} Sekunden`;
                document.getElementById('stats').classList.remove('hidden');
                document.getElementById('restart').classList.remove('hidden');
                return;
            }
            
            const task = questions[currentIndex];
            document.getElementById('question').innerText = `(${currentIndex + 1}) ${task.a} - ${task.b} = ?`;
            const answers = generateAnswers(task.result);
            
            let buttonsHTML = '';
            answers.forEach(ans => {
                buttonsHTML += `<button class='btn' onclick='checkAnswer(${ans})'>${ans}</button>`;
            });
            document.getElementById('buttons').innerHTML = buttonsHTML;
        }

        function checkAnswer(answer) {
            if (questions[currentIndex].result === answer) {
                correct++;
                currentIndex++;
                displayQuestion();
            } else {
                wrong++;
                document.body.classList.add('wrong');
                setTimeout(() => {
                    document.body.classList.remove('wrong');
                    currentIndex++;
                    displayQuestion();
                }, 2000);
            }
        }

        function startGame() {
            // Hier die Anzahl der Wiederholungen pro Aufgabe ändern (1x, 2x, 3x etc.)
            const repetitions = 1;
            questions = shuffle(Array(repetitions).fill(tasks).flat());
            currentIndex = 0;
            correct = 0;
            wrong = 0;
            startTime = Date.now();
            document.getElementById('stats').classList.add('hidden');
            document.getElementById('restart').classList.add('hidden');
            displayQuestion();
        }

        startGame();
    </script>
</body>
</html>
