const API_KEY = 'a96ac7730cmshcb00081c08b25a6p1fa8dcjsn2f373598832d';
const API_HOST = 'wft-geo-db.p.rapidapi.com';

const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const limitInput = document.getElementById('limitInput');
const spinner = document.getElementById('spinner');

let currentPage = 0;
let limit = 5;
let searchText = '';
let totalResults = 0;

function setLoading(isLoading) {
  spinner.classList.toggle('hidden', !isLoading);
  searchInput.disabled = isLoading;
}

function showMessage(message) {
  tableBody.innerHTML = `<tr><td colspan="3">${message}</td></tr>`;
}

function renderTable(cities) {
  if (!cities.length) {
    showMessage('No result found');
    return;
  }

  tableBody.innerHTML = cities.map((city, index) => `
    <tr>
      <td>${index + 1 + currentPage * limit}</td>
      <td>${city.city}</td>
      <td>
        <img src="https://flagsapi.com/${city.countryCode}/flat/32.png" alt="${city.country} Flag" />
        ${city.country}
      </td>
    </tr>
  `).join('');
}

function togglePagination(resultLength) {
  prevBtn.style.display = currentPage === 0 ? 'none' : 'inline-block';
  nextBtn.style.display = resultLength < limit ? 'none' : 'inline-block';
}

async function fetchData() {
  if (!searchText) {
    showMessage('Start searching');
    return;
  }

  setLoading(true);
  try {
    const offset = currentPage * limit;
    const url = `https://${API_HOST}/v1/geo/cities?namePrefix=${searchText}&limit=${limit}&offset=${offset}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });

    if (!response.ok) throw new Error('API fetch error');

    const data = await response.json();
    renderTable(data.data);
    totalResults = data.metadata.totalCount;
    togglePagination(data.data.length);
  } catch (error) {
    console.error(error);
    showMessage('Error fetching data');
  } finally {
    setLoading(false);
  }
}

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchText = searchInput.value.trim();
    if (!searchText) {
      showMessage('Please type a city name and press Enter');
      return;
    }
    currentPage = 0;
    fetchData();
  }
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === '/' || e.code === 'Slash')) {
    e.preventDefault();
    searchInput.focus();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    fetchData();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchData();
});

limitInput.addEventListener('change', () => {
  let val = parseInt(limitInput.value, 10);
  if (val > 10) {
    alert('Max limit is 10');
    limitInput.value = 10;
    val = 10;
  }
  limit = val;
});
