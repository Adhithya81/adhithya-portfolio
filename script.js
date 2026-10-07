'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
menu.hidden = false;
function closeMenu(){ menu.setAttribute('aria-expanded','false'); links.classList.remove('open'); }
menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open)); links.classList.toggle('open',open); });
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const filters=document.querySelector('.filters');
filters.hidden=false;
function filterProjects(category){
 let count=0;
 document.querySelectorAll('.project').forEach(card=>{card.hidden=category!=='All'&&card.dataset.category!==category;if(!card.hidden)count++;});
 filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
 document.querySelector('#filter-status').textContent=`Showing ${count} projects${category==='All'?'':` in ${category}`}.`;
}
filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>filterProjects(button.dataset.filter)));
document.querySelector('.hero-image').addEventListener('click',()=>filterProjects('All'));
function revealLinkedProject(){const target=document.getElementById(location.hash.slice(1));if(target?.classList.contains('project')&&target.hidden){filterProjects('All');target.scrollIntoView();}}
window.addEventListener('hashchange',revealLinkedProject);
revealLinkedProject();
document.querySelectorAll('.gallery').forEach(gallery=>{
 const slides=[...gallery.querySelectorAll('.slide')];let current=0;
 const controls=gallery.querySelector('.gallery-controls');controls.hidden=slides.length<2;
 function show(index){ current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==current);gallery.querySelector('.image-count').textContent=`${current+1} / ${slides.length}`; }
 controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>show(current+Number(button.dataset.direction))));
 gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));}});
});
const navAnchors=[...links.querySelectorAll('a[href^="#"]')];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navAnchors.forEach(a=>{if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -65% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
