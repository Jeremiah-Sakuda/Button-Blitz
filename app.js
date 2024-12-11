document.addEventListener('DOMContentLoaded', () => {
    // Page elements
    const firstPage = document.getElementById('firstPage');
    const secondPage = document.getElementById('secondPage');
    const thirdPage = document.getElementById('thirdPage');
    const fourthPage = document.getElementById('fourthPage');
    const fifthPage = document.getElementById('fifthPage');
    const instructionsPage = document.getElementById('instructionsPage'); 
    const settingsPage = document.getElementById('settingsPage');

    // Header
    const header = document.querySelector('.header');

    // Buttons and interactive elements
    const playButton1 = document.getElementById('playButton1');
    const playButton2 = document.getElementById('playButton2');
    const mainButton = document.getElementById('mainButton');
    const upgradesButton = document.getElementById('upgradesButton');
    const buttonPics = document.getElementById('buttonPics');
    const backgroundsButton = document.getElementById('backgroundsButton');
    const buttonpic1 = document.getElementById('buttonpic1');
    const buttonpic2 = document.getElementById('buttonpic2');
    const buttonpic3 = document.getElementById('buttonpic3');
    const backgroundPic1 = document.getElementById('backgroundPic1');
    const backgroundPic2 = document.getElementById('backgroundPic2');
    const backgroundPic3 = document.getElementById('backgroundPic3');
    const default1 = document.getElementById('default1');
    const default2 = document.getElementById('default2');  
    const movingButton = document.getElementById('movingButton');
    const clearCacheButton = document.getElementById('clearCacheButton');
    const instructionsButton = document.getElementById('instructionsButton');
    const backFromInstructions = document.getElementById('backFromInstructions');
    const toggleWhackModeButton = document.getElementById('toggleWhackModeButton');
    const backButton4 = document.getElementById('backButton4');
    const settingsButton = document.getElementById('settingsButton');

    // Display elements
    const pointsDisplay = document.getElementById('points');
    const highScoreDisplay = document.getElementById('highScore');
    const floatingContainer = document.getElementById('floatingContainer');

    // Check for necessary elements
    if (!floatingContainer) {
        console.error('floatingContainer element not found!');
        return;
    }

    if ('serviceWorker' in navigator) { // Checks if broswer supports service worker
        navigator.serviceWorker.register('/service-worker.js') // Registers service worker file
        .then(registration => {
           console.log('Service Worker registered:', registration);
        })
        .catch(error => {
           console.error('Service Worker registration failed:', error);
        });
     }


    // Game state variables
    let points = 0;
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    let clickValue = 1;
    let buttonVisible = false;
    let whackMode = false;

    // Frenzy Mode Variables
    let frenzyMode = false;
    let oldClickValue = clickValue;
    let frenzyTimeout = null;
        
    // State for Upgrades Button
    let upgradesButtonState = 'upgrades'; // 'upgrades' or 'back'

    // Initialize displays
    pointsDisplay.textContent = points;
    highScoreDisplay.textContent = highScore;

    // Function to update points
    function updatePoints() {
        points += clickValue;
        pointsDisplay.textContent = points;

        // Update high score if necessary
        if (points > highScore) {
            highScore = points;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.textContent = highScore;
        }
    }

    // Function to show a specific page
    function showPage(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.add('hidden'));
        // Show the requested page
        page.classList.remove('hidden');

        // Manage header visibility
        if (page === firstPage) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        // Update Upgrades Button based on current page
        if (page === thirdPage) {
            setUpgradesButtonToBack();
        } else {
            setUpgradesButtonToUpgrades();
        }
    }

    // Function to set Upgrades Button to Upgrades
    function setUpgradesButtonToUpgrades() {
        upgradesButtonState = 'upgrades';
        upgradesButton.src = "images/upgradesbutton.png";
        upgradesButton.alt = "Upgrades Button";
        upgradesButton.title = "Open Upgrades"; // Tooltip for accessibility
    }

    // Function to set Upgrades Button to Back
    function setUpgradesButtonToBack() {
        upgradesButtonState = 'back';
        upgradesButton.src = "images/backbutton1.png"; // Ensure this image exists in the images folder
        upgradesButton.alt = "Back Button";
        upgradesButton.title = "Go Back"; // Tooltip for accessibility
    }

    // Upgrades Button click event
    upgradesButton.addEventListener('click', () => {
        if (upgradesButtonState === 'upgrades') {
            showPage(thirdPage);
        } else if (upgradesButtonState === 'back') {
            showPage(secondPage);
        }
    });

    // Show second page and header when play button is clicked
    playButton1.addEventListener('click', () => {
        showPage(secondPage);
    });

    playButton2.addEventListener('click', () => {
        showPage(secondPage);
    });

    // Navigate to fourth page (button pics) when buttonPics is clicked
    buttonPics.addEventListener('click', () => {
        showPage(fourthPage);
    });

    // Navigate to fifth page (backgrounds) when backgroundsButton is clicked
    backgroundsButton.addEventListener('click', () => {
        showPage(fifthPage);
    });

    settingsButton.addEventListener('click', () => {
        showPage(settingsPage);
    });

    backButton4.addEventListener('click', () => {
        showPage(secondPage);
    });
    
    // Purchase buttonpic1
    buttonpic1.addEventListener('click', () => {
        if (mainButton.src.includes("jueqi.png")) {
            alert("You already own this button pic!");
            return;
        }
        else if (points >= 20) {
            points -= 20; // Deduct 20 points
            pointsDisplay.textContent = points;
            mainButton.src = "images/jueqi.png"; // Change main button image
            alert("Purchased!");
            showPage(secondPage); // Show second page 
        } else {
            alert("Not enough points!");
        }
    });

    // Purchase backgroundPic1
    backgroundPic1.addEventListener('click', () => {
        const defaultBackground = document.querySelector('.defaultBackground');
        if (defaultBackground.style.background === 'linear-gradient(180deg, #FFFFFF 0%, #abfdb3 72.5%, #45ff07 100%)') {
            alert("You already own this background!");
            return;
        }
        else if (points >= 20) {
            points -= 20; // Deduct 20 points
            pointsDisplay.textContent = points;    
            const defaultBackground = document.querySelector('.defaultBackground');
            defaultBackground.style.background = 'linear-gradient(180deg, #FFFFFF 0%, #abfdb3 72.5%, #45ff07 100%)';
            alert("Purchased!");
            showPage(secondPage); // Show second page 
        } else {
            alert("Not enough points!");
        }   
    });

       // Purchase buttonpic2
    buttonpic2.addEventListener('click', () => {
        if (mainButton.src.includes("james.png")) {
            alert("You already own this button pic!");
            return;
        }
        else if (points >= 50) {
            points -= 50; // Deduct 20 points
            pointsDisplay.textContent = points;
            mainButton.src = "images/james.png"; // Change main button image
            alert("Purchased!");
            showPage(secondPage); // Show second page 
        } else {
            alert("Not enough points!");
        }
    });

    // Purchase backgroundPic2
    backgroundPic2.addEventListener('click', () => {
        const defaultBackground = document.querySelector('.defaultBackground');
        if (defaultBackground.style.background === 'linear-gradient(180deg, #FFFFFF 0%, #FBAAFF 72.5%, #B107FF 100%)') {
            alert("You already own this background!");
            return;
        } 
        else if (points >= 50) {
            points -= 50; // Deduct 50 points
            pointsDisplay.textContent = points;    
            const defaultBackground = document.querySelector('.defaultBackground');
            defaultBackground.style.background = 'linear-gradient(180deg, #FFFFFF 0%, #FBAAFF 72.5%, #B107FF 100%)';
            alert("Purchased!");
            showPage(secondPage); // Show second page 
        } else {
            alert("Not enough points!");
        }   
    });

       // Purchase buttonpic3
    buttonpic3.addEventListener('click', () => {
        if (mainButton.src.includes("ari.png")) {
            alert("You already own this button pic!");
            return;
        }
        else if (points >= 100) {
            points -= 100; // Deduct 100 points
            pointsDisplay.textContent = points;
            mainButton.src = "images/ari.png"; // Change main button image
            alert("Purchased!");
            showPage(secondPage); // Show second page 
        } else {
            alert("Not enough points!");
        }
    });

    // Purchase backgroundPic3
    backgroundPic3.addEventListener('click', () => {
        const defaultBackground = document.querySelector('.defaultBackground');
        if (defaultBackground.style.background === 'linear-gradient(180deg, #FFFFFF 0%, #fdabab 72.5%, #ff0707 100%)') {
            alert("You already own this background!");
            return;
        } 
        else if (points >= 100) {
            points -= 100; // Deduct 100 points
            pointsDisplay.textContent = points;    
            const defaultBackground = document.querySelector('.defaultBackground');
            defaultBackground.style.background = 'linear-gradient(180deg, #FFFFFF 0%, #fdabab 72.5%, #ff0707 100%)';
            alert("Purchased!");
            showPage(secondPage); // Show second page 
        } else {
            alert("Not enough points!");
        }   
    });

    // Default Button 1
    default1.addEventListener('click', () => {
        mainButton.src = "images/mainbutton.png";
        alert("Reverted back to original!");
        showPage(secondPage); 
    });

    // Default Button 1
    default2.addEventListener('click', () => {
        const defaultBackground = document.querySelector('.defaultBackground');
        defaultBackground.style.background = 'white';
        alert("Reverted back to original!");
        showPage(secondPage);
    });

    // Main button click event
    mainButton.addEventListener('click', () => {
        updatePoints();

        // Play sound
        const sound = document.getElementById('button-sound');
        sound.currentTime = 0; // Reset the audio to the beginning
        sound.play(); // Play the audio

        // Create a floating +1 element
        const floatingPlusOne = document.createElement('div');
        floatingPlusOne.textContent = `+${clickValue}`;
        floatingPlusOne.classList.add('floating');

        // Position the +1 near the button
        const buttonRect = mainButton.getBoundingClientRect();
        floatingPlusOne.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
        floatingPlusOne.style.top = `${buttonRect.top}px`;

        // Append and remove after animation
        floatingContainer.appendChild(floatingPlusOne);
        setTimeout(() => {
            floatingPlusOne.remove();
        }, 1000);

        if (whackMode) {
            setButtonToRandomPosition();
        }

        if (!whackMode){
            mainButton.style.left = '50%';
            mainButton.style.top = '150px';
        }
        // Spawn clickValue falling buttons (non-clickable)
        if (clickValue < 25){
        spawnFallingButtons(clickValue);
        }
        else {
            spawnFallingButtons(15);
        }
    });

    function spawnFallingButtons(count) {
        for (let i = 0; i < count; i++) {
            const fallingImg = document.createElement('img');
            fallingImg.src = mainButton.src;
            fallingImg.classList.add('falling-button');
            fallingImg.style.width = '50px';

            const windowWidth = window.innerWidth;
            const imgWidth = 50;
            const randomX = Math.floor(Math.random() * (windowWidth - imgWidth));
            fallingImg.style.left = `${randomX}px`;
            fallingImg.style.top = `0px`;

            document.body.appendChild(fallingImg);

            // Force reflow
            fallingImg.offsetWidth;

            // Move down the screen
            const windowHeight = window.innerHeight;
            fallingImg.style.transform = `translateY(${windowHeight + 200}px)`;

            // Remove after 3s
            setTimeout(() => {
                if (document.body.contains(fallingImg)) {
                    fallingImg.remove();
                }
            }, 3000);
        }
    }

    function setButtonToRandomPosition() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = mainButton.offsetWidth;
        const buttonHeight = mainButton.offsetHeight;

        const randomX = Math.floor(Math.random() * (windowWidth - buttonWidth));
        const randomY = Math.floor(Math.random() * (windowHeight - buttonHeight));

        mainButton.style.left = `${randomX}px`;
        mainButton.style.top = `${randomY}px`;
    }

    // Frenzy Mode logic:
    movingButton.addEventListener('click', () => {
        if (!frenzyMode) {
            startFrenzyMode();
        }
    });

    function startFrenzyMode() {
        frenzyMode = true;
        oldClickValue = clickValue; // Store old value
        clickValue = 10; // Set to 10 during frenzy
        document.body.classList.add('frenzy-mode');

        // End frenzy after 30s
        frenzyTimeout = setTimeout(() => {
            endFrenzyMode();
        }, 30000);
    }

    function endFrenzyMode() {
        frenzyMode = false;
        clickValue = oldClickValue; // Restore old click value
        document.body.classList.remove('frenzy-mode');
    }

    toggleWhackModeButton.addEventListener('click', () => {
        whackMode = !whackMode;
        alert(`Whack Mode is now ${whackMode ? 'ON' : 'OFF'}.`);
        showPage(secondPage);
    });

    // Moving bonus button logic
    let positionX = 0;
    let positionY = 50;
    let directionX = 4;
    let directionY = 4;

    function moveButton() {
        positionX += directionX;
        positionY += directionY;

        // Reverse direction at edges
        if (positionX > window.innerWidth - movingButton.offsetWidth || positionX < 0) {
            directionX *= -1;
        }
        if (positionY > window.innerHeight - movingButton.offsetHeight || positionY < 0) {
            directionY *= -1;
        }

        // Update button position
        movingButton.style.left = `${positionX}px`;
        movingButton.style.top = `${positionY}px`;

        if (buttonVisible) {
            requestAnimationFrame(moveButton);
        }
    }

    function showMovingButton() {
        buttonVisible = true;
        movingButton.style.display = 'block';
        positionX = Math.random() * (window.innerWidth - movingButton.offsetWidth);
        positionY = Math.random() * (window.innerHeight - movingButton.offsetHeight);
        movingButton.style.left = `${positionX}px`;
        movingButton.style.top = `${positionY}px`;

        moveButton();

        // Hide after 10 seconds
        setTimeout(hideMovingButton, 10000);
    }

    function hideMovingButton() {
        buttonVisible = false;
        movingButton.style.display = 'none';

        // Show again after 20 seconds
        setTimeout(showMovingButton, 20000);
    }

    // Initialize moving button
    movingButton.style.position = 'absolute';
    movingButton.style.display = 'none';
    showMovingButton();

    movingButton.addEventListener('click', () => {
        points += 50;
        pointsDisplay.textContent = points;
        console.log('Bonus button clicked! Points awarded.');
        hideMovingButton();

        // Display bonus message
        const bonusMessage = document.createElement('div');
        bonusMessage.textContent = '+50 Bonus!';
        bonusMessage.classList.add('bonus-message');
        bonusMessage.style.left = `${positionX + 50}px`;
        bonusMessage.style.top = `${positionY}px`;
        document.body.appendChild(bonusMessage);

        setTimeout(() => {
            bonusMessage.remove();
        }, 1000);
    });

    // Cheat mode activation
    document.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.key.toUpperCase() === 'K') {
            const cheatValue = prompt("You have found the cheats! How much do you want each click to be worth?");
            const parsedValue = parseInt(cheatValue, 10);

            if (parsedValue > 0) {
                clickValue = parsedValue;
                alert(`Cheat activated! Each click is now worth ${clickValue} points.`);
            } else {
                alert("Invalid input! Enter a positive number.");
            }
        }
    });

    // High score reset with Shift + C
    document.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.key.toUpperCase() === 'C') {
            localStorage.removeItem("highScore");
            highScore = 0;
            highScoreDisplay.textContent = highScore;
        }
    });

    // Clear high score button
    clearCacheButton.addEventListener('click', () => {
        localStorage.removeItem("highScore");
        highScore = 0;
        highScoreDisplay.textContent = highScore;
        alert(`High score cleared using Shift + C!`);
        showPage(secondPage);
    });

    // Handle window resize to prevent moving button from going out of bounds
    window.addEventListener('resize', () => {
        if (positionX > window.innerWidth - movingButton.offsetWidth) {
            positionX = window.innerWidth - movingButton.offsetWidth;
        }
        if (positionY > window.innerHeight - movingButton.offsetHeight) {
            positionY = window.innerHeight - movingButton.offsetHeight;
        }
        movingButton.style.left = `${positionX}px`;
        movingButton.style.top = `${positionY}px`;
    });

    // --- Instructions Button Functionality ---

    // Function to show Instructions Page
    function showInstructions() {
        showPage(instructionsPage);
    }

    // Function to go back to Second Page from Instructions Page
    function backToSecondPage() {
        showPage(secondPage);
    }

    // Event Listener for Instructions Button
    instructionsButton.addEventListener('click', showInstructions);

    // Event Listener for Back Button on Instructions Page
    backFromInstructions.addEventListener('click', backToSecondPage);
});

