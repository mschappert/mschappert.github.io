const resources = [
  { title: 'Data Commons', description: 'Public statistics and indicators across places and topics.', type: 'Data', format: 'Platform', url: 'https://datacommons.org/' },
  { title: 'Open Data Handbook', description: 'A practical guide to publishing and using open data.', type: 'Guide', format: 'Guide', url: 'https://opendatahandbook.org/' },
  { title: 'Our World in Data', description: 'Research and visualized data on global challenges.', type: 'Data', format: 'Dataset', url: 'https://ourworldindata.org/' },
  { title: 'Data Feminism', description: 'A framework for thinking critically about data and power.', type: 'Reading', format: 'Book', url: 'https://data-feminism.mitpress.mit.edu/' },
  { title: 'U.S. Census Data', description: 'Official demographic, economic, and geographic data.', type: 'Data', format: 'Dataset', url: 'https://data.census.gov/' },
  { title: 'Observable Plot', description: 'A concise, expressive library for exploratory charts.', type: 'Tool', format: 'Tool', url: 'https://observablehq.com/plot/' }
];

const filters = ['All', ...new Set(resources.map((resource) => resource.type))];
let activeFilter = 'All';
const filtersElement = document.querySelector('#filters');
const resultsElement = document.querySelector('#resource-results');
const emptyElement = document.querySelector('#resource-empty');
const searchElement = document.querySelector('#resource-search');

function drawFilters() {
  filtersElement.innerHTML = filters.map((filter) => `<button class="filter ${filter === activeFilter ? 'active' : ''}" data-filter="${filter}">${filter}</button>`).join('');
  filtersElement.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; drawFilters(); drawResources(); }));
}

function drawResources() {
  const query = searchElement.value.trim().toLowerCase();
  const matches = resources.filter((resource) => (activeFilter === 'All' || resource.type === activeFilter) && `${resource.title} ${resource.description} ${resource.type} ${resource.format}`.toLowerCase().includes(query));
  resultsElement.innerHTML = matches.map((resource, index) => `<a class="resource" href="${resource.url}" target="_blank" rel="noreferrer"><span class="resource-number">${String(index + 1).padStart(2, '0')}</span><div><h3>${resource.title}</h3><p>${resource.description}</p></div><span class="resource-format">${resource.type} · ${resource.format}</span><span class="resource-arrow">↗</span></a>`).join('');
  emptyElement.hidden = matches.length !== 0;
}

searchElement.addEventListener('input', drawResources);
document.querySelector('#year').textContent = new Date().getFullYear();
drawFilters();
drawResources();
