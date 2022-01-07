//https://teachablemachine.withgoogle.com/models/KT-_leKEN/

prediction = "";

Webcam.set({
    width: 392,
    height: 294,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("webcamImage");
Webcam.attach("#webcamImage");

function takePicture() {
    Webcam.snap(function (dataURI) {
        document.getElementById("capturedImage").innerHTML = '<img id="newCapturedImg" src="' + dataURI + '">';
    })
}

console.log('ml5 Version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KT-_leKEN/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    synthesis = window.speechSynthesis;
    speakData = "The prediction is " + prediction;
    utterThis = new SpeechSynthesisUtterance(speakData);
    synthesis.speak(utterThis);
}

function identify() {
    img = document.getElementById("newCapturedImg");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        document.getElementById("handGesturePredictionName").innerHTML = results[0].label;
        prediction = results[0].label;
        if (results[0].label == "Thumbs Up") {
            document.getElementById("handGesturePredictionIcon").innerHTML = "&#128077;";
            console.log("Thumbs Up");
        }
        if (results[0].label == "Peace Sign") {
            document.getElementById("handGesturePredictionIcon").innerHTML = "&#9996;";
            console.log("Peace Sign");
        }
        if (results[0].label == "Okay Sign") {
            document.getElementById("handGesturePredictionIcon").innerHTML = "&#128076;";
            console.log("Okay Sign");
        }
    }
}