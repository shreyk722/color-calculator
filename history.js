window.onload = function() {
 


    let savedHistory = localStorage.getItem("contrastHistory");

    if (!savedHistory) {
        return;
    }

    let history = JSON.parse(savedHistory);

    let historyContainer = document.getElementById("history-container");

    for (let i = 0; i < history.length; i++) {

        let color1 = history[i].color1;
        let color2 = history[i].color2;
        let contrastValue = history[i].contrast;

        let card = document.createElement("div");
        card.className = "history-card";

        let result;
        let resultColor;

        if (contrastValue < 4.5) {
            result = "Poor Contrast :(";
            resultColor = "red";
        } else if (contrastValue < 7) {
            result = "Good Contrast :)";
            resultColor = "orange";
        } else {
            result = "Great Contrast!";
            resultColor = "green";
        }

        card.innerHTML = `
            <h2 style="text-decoration: underline dashed;">Color Combination</h2>

            <div class="color-pair">

                <div class="color">
                    <div class="color-display" style="background-color: ${color1};"></div>
                    <p>${color1}</p>
                </div>

                <div class="color">
                    <div class="color-display" style="background-color: ${color2};"></div>
                    <p>${color2}</p>
                </div>

            </div>

            <div class="contrast-info">
                <p style="font-size: 20px;">Contrast Ratio:</p>
                <h3>${contrastValue}:1</h3>
                <p style="font-weight: bold; color: ${resultColor}; text-decoration: underline; font-size: 20px">${result}</p>
            </div>
        `;

        historyContainer.appendChild(card);
    }
};