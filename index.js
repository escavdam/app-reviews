const btnGood = document.getElementById('btnGood');
const btnRegular = document.getElementById('btnRegular');
const btnBad = document.getElementById('btnBad');

console.log(btnGood)

btnGood.addEventListener('click', () => {
    alert('You clicked Good!');
});

btnRegular.addEventListener('click', () => {
    alert('You clicked Regular!');
});

btnBad.addEventListener('click', () => {
    alert('You clicked Bad!');
});