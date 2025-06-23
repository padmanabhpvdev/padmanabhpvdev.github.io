//By Padmanabh PV
const sections = document.querySelectorAll('#scroll-contents section');
const navLinks = document.querySelectorAll('.floatbar a');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 200;
  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
      const id = section.id;
      const navLink = document.querySelector(`.floatbar a[href="#${id}"]`);
      navLinks.forEach((link) => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
});

function getDOB() {
  const dob = new Date('2004-05-20');
  const curDate = new Date();
  let age = curDate.getFullYear() - dob.getFullYear();
  const monthDiff = curDate.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && curDate.getDate() < dob.getDate())) {
    age--;
  }

  document.getElementById('myAge').innerText = age;
}

getDOB();
