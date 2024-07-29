document.addEventListener('DOMContentLoaded', function() {
    const surahListElement = document.getElementById('surahList');
    const surahTitleElement = document.getElementById('surahTitle');
    const surahTextElement = document.getElementById('surahText');

    // Fetch the list of surahs from the API
    fetch('http://api.alquran.cloud/v1/surah')
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                const surahs = data.data;

                surahs.forEach(surah => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${surah.number}. ${surah.name}`;
                    listItem.dataset.surahNumber = surah.number;
                    listItem.addEventListener('click', () => loadSurah(surah.number));
                    surahListElement.appendChild(listItem);
                });
            } else {
                console.error('No data found or data format is incorrect');
            }
        })
        .catch(error => console.error('Error fetching surahs:', error));

    function loadSurah(surahNumber) {
        fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    const surah = data.data;
                    surahTitleElement.textContent = surah.name;
                    surahTextElement.innerHTML = surah.ayahs.map(ayah => `<p>${ayah.text}</p>`).join('');
                } else {
                    console.error('No data found or data format is incorrect');
                }
            })
            .catch(error => console.error('Error fetching surah:', error));
    }
});
