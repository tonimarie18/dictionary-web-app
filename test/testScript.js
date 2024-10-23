//Define API URL
const api = `https://api.dictionaryapi.dev/api/v2/entries/en/`

//Set up event listener for the search button
    document.getElementById('search').addEventListener('click', function(){
           //(inside function) get the word from input field  
        const input = document.getElementById('wordInput');

            const word = input.value.trim();
            console.log(word)
                    //check if input is not empty
            if (word != '') {
                const apiUrl = `${api}${word}`
                fetch( apiUrl)   //make api request
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Network response was not okay')
                        }
                        return response.json()                      
                    })
                    .then (data => {
                        console.log(data) //log the fetched data
                        displayResult(data)     //call a function to display the results
                    })
                    .catch(error => {
                        console.error('Error:', error)
                    })

                        //else alert user if input is empty
            } else {
                alert('Please Enter a Word')
            }



    })


        //fucntion to display results
// Function to display results
function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    // Check if data is an array and contains entries
    if (data && Array.isArray(data)) {
        data.forEach(entry => {
            const meanings = entry.meanings.map(meaning => meaning.definitions[0].definition).join(', ');
            const wordElement = document.createElement('div');
            wordElement.innerHTML = `${entry.word}: ${meanings}`;
            wordElement.className = 'word-entry'
            resultDiv.appendChild(wordElement);
        });
    } else {
        resultDiv.innerText = 'No definitions found.';
    }
}



