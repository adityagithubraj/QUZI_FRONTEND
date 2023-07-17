document.addEventListener('DOMContentLoaded', () => {
    const createQuizBtn = document.getElementById('create-quiz-btn');
    const createQuizModal = document.getElementById('create-quiz-modal');
    const createQuizForm = document.getElementById('create-quiz-form');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const questionsContainer = document.getElementById('questions-container');
    const quizzesContainer = document.getElementById('quizzes-container');
  
    createQuizBtn.addEventListener('click', () => {
      createQuizModal.style.display = 'block';
    });
  
    createQuizForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const quizData = {
        creator: 'Aditya@gmail.com', // Replace with the actual user email
        title: document.getElementById('quiz-title').value,
        description: document.getElementById('quiz-description').value,
        questions: [],
      };
  
      const questionElements = questionsContainer.querySelectorAll('.question');
  
      questionElements.forEach((questionElement) => {
        const questionTitle = questionElement.querySelector('.question-title').value;
        const answerOptions = Array.from(questionElement.querySelectorAll('.answer-option')).map((option) => option.value);
        const correctOptions = Array.from(questionElement.querySelectorAll('.correct-option:checked')).map((option) => parseInt(option.value));
  
        const question = {
          title: questionTitle,
          answerOptions: answerOptions,
          correctOptions: correctOptions,
        };
  
        quizData.questions.push(question);
      });
  
      try {
        const response = await fetch('https://quz.onrender.com/Dashboard/quizzes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quiz: quizData }),
        });
  
        if (response.ok) {
          createQuizModal.style.display = 'none';
          createQuizForm.reset();
          questionsContainer.innerHTML = '';
          fetchQuizzes();
        } else {
          throw new Error('Failed to create quiz');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to create quiz');
      }
    });
  
    addQuestionBtn.addEventListener('click', () => {
      const questionElement = createQuestionElement();
      questionsContainer.appendChild(questionElement);
    });
  
    function createQuestionElement() {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
  
      const questionTitleInput = document.createElement('input');
      questionTitleInput.classList.add('question-title');
      questionTitleInput.setAttribute('type', 'text');
      questionTitleInput.setAttribute('placeholder', 'Question Title');
      questionTitleInput.setAttribute('required', true);
  
      const answerOptionsInput = document.createElement('textarea');
      answerOptionsInput.classList.add('answer-option');
      answerOptionsInput.setAttribute('placeholder', 'Answer Options (One option per line)');
      answerOptionsInput.setAttribute('rows', 4);
      answerOptionsInput.setAttribute('required', true);
  
      const correctOptionsInput = document.createElement('input');
      correctOptionsInput.classList.add('correct-option');
      correctOptionsInput.setAttribute('type', 'checkbox');
      correctOptionsInput.setAttribute('value', 1);
  
      const correctOptionsLabel = document.createElement('label');
      correctOptionsLabel.textContent = 'Correct Option';
  
      questionElement.appendChild(questionTitleInput);
      questionElement.appendChild(answerOptionsInput);
      questionElement.appendChild(correctOptionsInput);
      questionElement.appendChild(correctOptionsLabel);
  
      return questionElement;
    }
  
    async function fetchQuizzes() {
      try {
        const response = await fetch('https://quz.onrender.com/Dashboard/quizzes');
        if (response.ok) {
          const quizzes = await response.json();
          renderQuizzes(quizzes);
        } else {
          throw new Error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch quizzes');
      }
    }
  
    function renderQuizzes(quizzes) {
      quizzesContainer.innerHTML = '';
  
      quizzes.forEach((quiz) => {
        const quizCard = createQuizCard(quiz);
        quizzesContainer.appendChild(quizCard);
      });
    }
  
    function createQuizCard(quiz) {
      const quizCard = document.createElement('div');
      quizCard.classList.add('quiz-card');
  
      const creatorElement = document.createElement('p');
      creatorElement.textContent = `Creator: ${quiz.creator}`;
  
      const titleElement = document.createElement('h3');
      titleElement.textContent = quiz.title;
  
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = quiz.description;
  
      const questionCountElement = document.createElement('p');
      questionCountElement.textContent = `Questions: ${quiz.questions.length}`;
  
      const takeQuizBtn = document.createElement('button');
      takeQuizBtn.textContent = 'Take Quiz';
      takeQuizBtn.addEventListener('click', () => {
        // Handle taking the quiz
      });
  
      const leaderboardBtn = document.createElement('button');
      leaderboardBtn.textContent = 'Leaderboard';
      leaderboardBtn.addEventListener('click', () => {
        // Handle showing the leaderboard
      });
  
      quizCard.appendChild(creatorElement);
      quizCard.appendChild(titleElement);
      quizCard.appendChild(descriptionElement);
      quizCard.appendChild(questionCountElement);
      quizCard.appendChild(takeQuizBtn);
      quizCard.appendChild(leaderboardBtn);
  
      return quizCard;
    }
  
    fetchQuizzes();
  });
  