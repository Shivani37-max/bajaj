document.getElementById('jsonForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseContainer = document.getElementById('responseContainer');
    const responseContent = document.getElementById('responseContent');
    
    errorElement.textContent = '';
    dropdownContainer.classList.add('hidden');
    responseContainer.classList.add('hidden');
    responseContent.innerHTML = '';
    
    try {
        const parsedInput = JSON.parse(jsonInput);
        
        const response = await fetch('http://127.0.0.1:5000/process_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedInput),
        });
        
        const data = await response.json();
        dropdownContainer.classList.remove('hidden');

        document.getElementById('options').addEventListener('change', function() {
            responseContent.innerHTML = '';
            const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);

            if (selectedOptions.includes('Alphabets')) {
                responseContent.innerHTML += `<h4>Alphabets:</h4><p>${data.alphabets_array.join(', ')}</p>`;
            }
            if (selectedOptions.includes('Numbers')) {
                responseContent.innerHTML += `<h4>Numbers:</h4><p>${data.numbers_array.join(', ')}</p>`;
            }
            if (selectedOptions.includes('Highest lowercase alphabet')) {
                responseContent.innerHTML += `<h4>Highest Lowercase Alphabet:</h4><p>${data.highest_lowercase_alphabet}</p>`;
            }

            responseContainer.classList.remove('hidden');
        });
        
    } catch (err) {
        errorElement.textContent = 'Invalid JSON format. Please correct and try again.';
    }
});
