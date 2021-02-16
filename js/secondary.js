// states.json > country.json

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/country.json');
    const states = await res.json();

    // Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return state.country.match(regex) || state.abbreviation.match(regex);
    });

    // Do not show results if search box has no input
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
}

// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        // Gives us an array of HTML strings
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.country} (${match.abbreviation}) <span class="text-primary"></span></h4>
            </div>`).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));