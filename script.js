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

if (searchElement) {
  searchElement.addEventListener('input', drawResources);
  drawFilters();
  drawResources();
}
document.querySelectorAll('#year').forEach((year) => { year.textContent = new Date().getFullYear(); });
document.querySelectorAll('nav').forEach((nav) => {
  if (!nav.querySelector('a[href="index.html"]')) {
    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.textContent = 'Home';
    nav.insertBefore(homeLink, nav.firstChild);
  }
  const workLink = nav.querySelector('a[href="index.html#work"]');
  if (workLink) workLink.href = 'work.html';
  const blogLink = nav.querySelector('a[href="blog.html"]');
  if (blogLink) blogLink.textContent = 'Blog & Guides';
  const aboutLink = nav.querySelector('a[href="resume.html"]');
  if (aboutLink) aboutLink.textContent = 'About';
  if (!nav.querySelector('a[href="publications.html"]')) {
    const link = document.createElement('a');
    link.href = 'publications.html';
    link.textContent = 'Publications';
    nav.insertBefore(link, nav.querySelector('a[href="resume.html"]'));
  }
  const resourceLink = nav.querySelector('a[href="resources.html"]');
  if (resourceLink) nav.appendChild(resourceLink);
  const pageName = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach((link) => {
    const destination = link.getAttribute('href');
    link.classList.toggle('current', destination === pageName || (pageName === 'index.html' && destination === 'index.html'));
  });
});

document.querySelectorAll('.header-contact').forEach((link) => {
  link.href = 'mailto:mschappert@clarku.edu';
  link.innerHTML = 'Let’s connect <span>↗</span>';
});

const gallery = document.querySelector('#full-gallery');
if (gallery) {
  const importedImages = [
    'home-01.jpg','home-02.jpg','home-03.png','home-04.jpg','home-05.jpg','home-06.jpg','home-07.png','home-08.jpg','home-09.jpg','home-10.jpg','home-11.png','home-12.png','home-13.png',
    'about-01.jpg','about-02.jpg','about-03.png','about-04.jpg','about-05.jpg','about-06.png','about-07.jpg','about-08.jpg','about-09.png','about-10.png','about-11.png',
    'portfolio-01.jpg','portfolio-02.jpg','portfolio-03.jpg','portfolio-04.png','portfolio-05.jpg','portfolio-06.jpg','portfolio-07.jpg','portfolio-08.png','portfolio-09.png','portfolio-10.png','portfolio-11.png','portfolio-12.jpg'
  ];
  gallery.innerHTML = importedImages.map((image, index) => `<figure><img src="assets/google-sites/${image}" alt="Imported Google Site image ${index + 1}" loading="lazy"></figure>`).join('');
}

const researchGateLink = document.querySelector('.social-links a[aria-label="ResearchGate"]');
if (researchGateLink) {
  researchGateLink.innerHTML = '<svg class="researchgate-logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#00ccbb"/><path d="M7 17V7h4.1c2.6 0 4 1.2 4 3.2 0 1.3-.7 2.3-1.9 2.8L16 17h-2.5l-2.4-3.6H9.2V17H7Zm2.2-5.5h1.6c1.3 0 2-.5 2-1.4s-.7-1.3-2-1.3H9.2v2.7Z" fill="#fff"/></svg><span>ResearchGate</span>';
}
const scholarLink = document.querySelector('.social-links a[aria-label="Google Scholar"]');
if (scholarLink) {
  scholarLink.innerHTML = '<svg class="scholar-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="m2 9.5 10-5 10 5-10 5-10-5Z" fill="#4285f4"/><path d="M6.5 12.2v4.1c2.8 2 8.2 2 11 0v-4.1L12 15l-5.5-2.8Z" fill="#34a853"/><path d="M21 10v6" stroke="#fbbc04" stroke-width="1.8"/><circle cx="21" cy="17.2" r="1.2" fill="#ea4335"/></svg><span>Google Scholar</span>';
}

const volunteerList = document.querySelector('.volunteer-list');
if (volunteerList && !document.querySelector('.volunteer-gallery')) {
  volunteerList.insertAdjacentHTML('afterend', '<div class="volunteer-gallery"><img src="assets/volunteering-01.jpg" alt="Volunteering activity"><img src="assets/volunteering-02.jpg" alt="Over and Out Moto volunteering"></div>');
}

const gisCard = [...document.querySelectorAll('.work-cards article')].find((card) => card.querySelector('h3')?.textContent.includes('Secondary forest growth'));
if (gisCard && !gisCard.classList.contains('gis-project-detail')) {
  gisCard.classList.add('gis-project-detail');
  gisCard.innerHTML = '<img src="assets/secondary-forest-poster.png" alt="Poster: Identifying and analyzing growth patterns of mature secondary forests in the Atlantic Forest, Brazil"><div><p class="project-type">GIScience · Dec. 2023</p><h3>Identifying and analyzing growth patterns of mature secondary forests in the Atlantic Forest, Brazil</h3><p>A proof of concept for identifying tree height specifically to track secondary growth in the Atlantic Forest, Brazil. We will continue to develop methods and plan to publish early next year under Dr. Florencia Sangermano, Geography Department, Clark University.</p><p class="project-note">Completed for class work in Advanced Raster GIS in the Geography Department, Clark University.</p></div>';
}

const butterflyCard = [...document.querySelectorAll('.work-cards article')].find((card) => card.querySelector('h3')?.textContent.includes('Landscape heterogeneity effects on butterflies'));
if (butterflyCard && !butterflyCard.classList.contains('butterfly-project-detail')) {
  butterflyCard.classList.add('butterfly-project-detail');
  butterflyCard.innerHTML = '<div class="butterfly-copy"><p class="project-type">M.A. Geography thesis · Jun. 2023</p><h3>The effects of landscape heterogeneity on butterfly richness, abundance, and community composition across an agricultural to exurban gradient.</h3><p>Working with <a href="https://sites.google.com/site/sustlandcomlab/home?authuser=0" target="_blank" rel="noreferrer">Dr. Amelie Davis</a>, I examined the effects of fragmentation through landscape heterogeneity on butterfly community composition. With habitat area held constant, we looked at an exurban gradient across an agricultural background in southwestern Ohio, USA.</p><p class="project-note">Manuscript in preparation.</p></div><div class="butterfly-placeholders"><div>Image 01</div><div>Image 02</div><div>Image 03</div><div>Image 04</div></div>';
}

const morganCard = [...document.querySelectorAll('.work-cards article')].find((card) => card.querySelector('h3')?.textContent.includes('Morgan Township GIS Hub'));
if (morganCard && !morganCard.classList.contains('morgan-project-detail')) {
  morganCard.classList.add('morgan-project-detail');
  morganCard.innerHTML = '<div><p class="project-type">AGOL Applications · Nov. 2021</p><h3>AGOL Applications for Morgan Township, Ohio</h3><h4>Project statement</h4><p>Miami University’s Advanced GIS students created this Hub to assist Morgan Township and OKI with generating GIS web apps, data, and content to support the updated Comprehensive Plan and Land Use Plan. This site provides easy access to maps and information for various audiences, visualizations for zoning, and an interactive application encompassing the township’s rural character.</p><h4>Individual contribution</h4><p>Collected and created an interactive map to display all available GIS data for Morgan Township, addressed different audience needs through topic-specific tabs and appropriate layers, and provided the Hub’s structure and design.</p><a class="text-link" href="https://morgantownship-miamioh.hub.arcgis.com/" target="_blank" rel="noreferrer">Visit the Morgan Township Hub <span>↗</span></a></div>';
}

const cwiCard = [...document.querySelectorAll('.work-cards article')].find((card) => card.querySelector('h3')?.textContent.includes('Clean Water Institute'));
if (cwiCard && !cwiCard.classList.contains('cwi-project-detail')) {
  cwiCard.classList.add('cwi-project-detail');
  cwiCard.innerHTML = '<div class="cwi-images"><img src="assets/cwi-01.jpg" alt="Clean Water Institute fieldwork"><img src="assets/cwi-02.jpg" alt="Clean Water Institute fieldwork"></div><div><p class="project-type">Research Assistant &amp; Intern</p><h3>Clean Water Institute</h3><p>We completed lab and field analysis of basic water chemistry: dissolved oxygen, pH, total dissolved solids, conductivity, and alkalinity. In addition to biotic sampling for stream macroinvertebrates and electrofishing for stream fish, our team aided the Pennsylvania Fish and Boat Commission with data collection for the Unassessed Waters Initiative and assisted with educational outreach for middle and high school students.</p><a class="text-link" href="https://www.lycoming.edu/cwi/" target="_blank" rel="noreferrer">Learn more about CWI <span>↗</span></a></div>';
}

const educationList = document.querySelector('.resume-list');
if (educationList && educationList.querySelector('article') && !educationList.querySelector('.education-logo')) {
  const educationLogos = [
    ['assets/education-clark.png', 'Clark University logo'],
    ['assets/education-miami.png', 'Miami University logo'],
    ['assets/education-lycoming.png', 'Lycoming College logo']
  ];
  educationList.querySelectorAll('article').forEach((entry, index) => {
    const logo = educationLogos[index];
    if (logo) entry.insertAdjacentHTML('afterbegin', `<img class="education-logo" src="${logo[0]}" alt="${logo[1]}">`);
  });
}

const aboutSections = document.querySelectorAll('.resume-details');
if (aboutSections.length > 1) aboutSections[1].classList.add('experience-section');
