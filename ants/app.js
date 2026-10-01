const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open)});
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');navigation.classList.remove('open')}
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();if(document.activeElement.closest('#navigation'))menuButton.focus()}});
const search=document.querySelector('#publication-search');
const filters=document.querySelectorAll('[data-filter]');
const papers=[...document.querySelectorAll('.publication')];
let selectedYear='all';
function filterPublications(){const query=search.value.trim().toLowerCase();let visible=0;papers.forEach(paper=>{const show=(selectedYear==='all'||paper.dataset.year===selectedYear)&&paper.textContent.toLowerCase().includes(query);paper.hidden=!show;if(show)visible++});document.querySelector('#results-status').textContent=visible+' selected publication'+(visible===1?'':'s');document.querySelector('#empty-results').hidden=visible>0}
filters.forEach(button=>button.addEventListener('click',()=>{selectedYear=button.dataset.filter;filters.forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button))});filterPublications()}));
search.addEventListener('input',filterPublications);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navigation.querySelectorAll('a').forEach(link=>link.classList.toggle('current',link.getAttribute('href')==='#'+entry.target.id))}}},{rootMargin:'-20% 0px -60% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section))}
