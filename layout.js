fetch('navbar.html')
  .then(res => res.text())
  .then(html => { document.getElementById('navbar').innerHTML = html; });

fetch('footer.html')
  .then(res => res.text())
  .then(html => { document.getElementById('footer').innerHTML = html; });