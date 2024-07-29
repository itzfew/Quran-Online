document.addEventListener('DOMContentLoaded', function() {
    const surahListElement = document.getElementById('surahList');
    const surahTitleElement = document.getElementById('surahTitle');
    const surahTextElement = document.getElementById('surahText');

    // Fetch surahs list from the Quran API
    fetch('https://api.quran.com/v4/surah')
        .then(response => response.json())
        .then(data => {
            const surahs = data.data;

            surahs.forEach(surah => {
                const listItem = document.createElement('li');
                listItem.textContent = `${surah.number}. ${surah.name}`;
                listItem.dataset.surahNumber = surah.number;
                listItem.addEventListener('click', () => loadSurah(surah.number));
                surahListElement.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching surahs:', error));

    function loadSurah(surahNumber) {
        fetch(`https://api.quran.com/v4/surah/${surahNumber}`)
            .then(response => response.json())
            .then(data => {
                const surah = data.data;
                surahTitleElement.textContent = surah.name;
                surahTextElement.innerHTML = surah.ayahs.map(ayah => `<p>${ayah.text}</p>`).join('');
            })
            .catch(error => console.error('Error fetching surah:', error));
    }
});
