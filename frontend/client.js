document.getElementById("genderForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const count = document.getElementById("count").value;
    const probability = document.getElementById("probability").value;
    const resultDiv = document.getElementById("result");

    try {
        const response = await fetch("http://localhost:8000/api/v1/model/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, count, probability })
        });

        const data = await response.json();
        const gender=data.data.gender==="M"?"Male":"Female"
        if (response.ok) {
            resultDiv.textContent = `Predicted Gender: ${gender}`;
        } else {
            resultDiv.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.textContent = "An error occurred while predicting gender.";
    }
});
