let links = document.querySelectorAll('a')
let sections = document.querySelectorAll('section')
links[0].focus();

links.forEach((link, i) => {
  link.addEventListener('click', () => {
    sections.forEach((section) => {
      section.classList.add('hidden')
    })
    link.focus();
    sections[i].classList.remove('hidden');
  });
});
