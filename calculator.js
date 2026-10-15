/*
    Name: Shreya Kannepalli
    Date: 09/06/25
    This is my calculator.js that does the mathematical computations behind the color
    contraster and also holds key button functions.
*/

window.onload = function() {
    let color1History;
    let color2History; 

    let savedColor1 = localStorage.getItem("color1History");
    let savedColor2 = localStorage.getItem("color2History");

    

    if(savedColor1){
        color1History = JSON.parse(savedColor1);
    }else{
        color1History = [];
    }

    if(savedColor2){
        color2History = JSON.parse(savedColor2);
    }else{
        color2History = [];
    }


    let button = document.getElementById('color-check');
    let lock1Button = document.getElementById('lock1');
    let lock2Button = document.getElementById('lock2');
    let switchButton = document.getElementById('switch-button');

    lock1Button.onclick = function() {
        let colorInput1 = document.getElementById('input1');
        let color1 = colorInput1.value;
        let circle1 = document.getElementById('color1');
        circle1.style.backgroundColor = color1;

        let boxBackground = document.getElementById('contrast-display');
        boxBackground.style.backgroundColor = color1;


         color1History.push(color1);
         localStorage.setItem("color1History", JSON.stringify(color1History));
    };

    lock2Button.onclick = function() {
        let colorInput2 = document.getElementById('input2');
        let color2 = colorInput2.value;
        let circle2 = document.getElementById('color2');
        circle2.style.backgroundColor = color2;

        let boxText = document.getElementById('display-text');
        boxText.style = "color: " + color2 + ";";

         color2History.push(color2);

         localStorage.setItem("color2History", JSON.stringify(color2History));

    };


       
       

        
        
     


    /*
    On switch, the color of display text and display background switch between the
    two colors the user chose
    */
    switchButton.onclick = function() {
        let colorInput1 = document.getElementById('input1');
        let color1 = colorInput1.value;
        console.log("color1 is: " + color1);

        let boxText = document.getElementById('display-text');
        boxText.style = "color: " + color1 + ";";

        let colorInput2 = document.getElementById('input2');
        let color2 = colorInput2.value;
        console.log("color2 is: " + color2);

       
        let boxBackground = document.getElementById('contrast-display');
        boxBackground.style.backgroundColor = color2;

        colorInput1.value = color2;
        colorInput2.value = color1;

        let circle1 = document.getElementById('color1');
        circle1.style.backgroundColor = color2;

        let circle2 = document.getElementById('color2');
        circle2.style.backgroundColor = color1;
    };

    button.onclick = function() {
        let colorInput1 = document.getElementById('input1');
        let color1 = colorInput1.value;
        console.log("color1 is: " + color1);
        let circle1 = document.getElementById('color1');
        circle1.style.backgroundColor = color1;

        let red1 = breakHexCodeRed(color1);
        let green1 = breakHexCodeGreen(color1);
        let blue1 = breakHexCodeBlue(color1);
        console.log("Color 1 red: " + red1);
        console.log("Color 1 green: " + green1);
        console.log("Color 1 blue: " + blue1);

        let newRed1 = red1 / 255;
        console.log(newRed1);
        let newGreen1 = green1 / 255;
        console.log(newGreen1);
        let newBlue1 = blue1 / 255;
        console.log(newBlue1);

        let normRed = norm(newRed1);
        let normGreen = norm(newGreen1);
        let normBlue = norm(newBlue1);

        let color1Lum = lum(normRed, normGreen, normBlue);
        console.log("lum of color1: " + color1Lum);

        let colorInput2 = document.getElementById('input2');
        let color2 = colorInput2.value;
        console.log("color2 is: " + color2);
        let red2 = breakHexCodeRed(color2);
        let green2 = breakHexCodeGreen(color2);
        let blue2 = breakHexCodeBlue(color2);
        console.log("Color 2 red: " + red2);
        console.log("Color 2 green: " + green2);
        console.log("Color 2 blue: " + blue2);

        let newRed2 = red2 / 255;
        console.log(newRed2);
        let newGreen2 = green2 / 255;
        console.log(newGreen2);
        let newBlue2 = blue2 / 255;
        console.log(newBlue2);

        let normRed2 = norm(newRed2);
        let normGreen2 = norm(newGreen2);
        let normBlue2 = norm(newBlue2);

        let color2Lum = lum(normRed2, normGreen2, normBlue2);
        console.log("lum of color2: " + color2Lum);

        let contrastValue = contrast(color1Lum, color2Lum);
        console.log("contrast is: " + contrastValue + ":1");

        let history = JSON.parse(localStorage.getItem("contrastHistory")) || [];

        history.push({
            color1: color1,
            color2: color2,
            contrast: contrastValue
        });

        localStorage.setItem("contrastHistory", JSON.stringify(history));

        let resultBox = document.getElementById('result');
        resultBox.innerHTML = "<p> Contrast Value is " + contrastValue + ":1</p>";

        let textBox = document.getElementById('result-text');
        let resultText = result(contrastValue);
        textBox.innerHTML = "<p>" + resultText + "</p>";
    };

    function breakHexCodeRed(color) {
        let colorRed = color[1] + color[2];
        let newHex = "0x" + colorRed;
        let redValue = Number(newHex);
        return redValue;
    }

    function breakHexCodeGreen(color) {
        let colorGreen = color[3] + color[4];
        let newHex = "0x" + colorGreen;
        let greenValue = Number(newHex);
        return greenValue;
    }

    function breakHexCodeBlue(color) {
        let colorBlue = color[5] + color[6];
        let newHex = "0x" + colorBlue;
        let blueValue = Number(newHex);
        return blueValue;
    }

    function norm(value) {
        if (value <= 0.04045) {
            return value / 12.92;
        } else {
            return ((value + 0.055) / 1.055) ** 2.4;
        }
    }

    function lum(red, green, blue) {
        return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    }

    function contrast(color1, color2) {
        if (color1 > color2) {
            let value = (color1 + 0.05) / (color2 + 0.05);
            return Math.ceil(value * 100) / 100;
        } else {
            let value = (color2 + 0.05) / (color1 + 0.05);
            return Math.ceil(value * 100) / 100;
        }
    }

    function result(value) {
        if (value < 4.5) {
            return "Contrast is bad, try other colors.";
        } else if (value >= 4.5 && value < 7) {
            return "Contrast is good. Any way to make it better?";
        } else if (value >= 7) {
            return "Contrast is great!";
        }
    }
};
