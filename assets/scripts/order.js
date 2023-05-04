

const menu_items = document.querySelectorAll('.menu-grid-item');
const parsed_meals = [];
menu_items.forEach(item => {
    let meal = {};
    meal.name = item.querySelector('h4').textContent.trim();
    [meal.description, meal.price] = item.querySelector('p').textContent.split('$');
    meal.description = meal.description.trim();
    meal.price = meal.price.split('\n')[0].trim();
    meal.price = parseFloat(meal.price);
    parsed_meals.push(meal);
});

let recommended = document.createElement('div');
recommended.classList.add('recommended');
let recIndex = Math.floor(Math.random() * menu_items.length);
console.log(recIndex);
let recTitle = document.createElement('h3');
if (JSON.parse(localStorage.getItem('logged'))) {
    recTitle.textContent = getCurrentUser().first_name + ' ' + getCurrentUser().last_name + ', check this out! ';
} else {
    recTitle.textContent = 'Check this out! ';
}
recTitle.textContent += 'Our chef recommends:';
recommended.appendChild(recTitle);
let recMeal = document.createElement('h4');
let textMeal = document.createElement('p');
textMeal.textContent = parsed_meals[recIndex].description + '... at only ' + parsed_meals[recIndex].price + '$!';
recMeal.textContent = parsed_meals[recIndex].name;
recommended.appendChild(recMeal);
recommended.appendChild(textMeal);
const content = document.querySelector('.content');
content.insertBefore(recommended, content.firstChild);
console.log(content);
console.log(recommended)