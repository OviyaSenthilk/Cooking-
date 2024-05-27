fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(response =>response.json())
.then(data=>{
  const randomId= Math.floor((Math.random()*data.meals.length))

  const randomMeal= document.getElementById('randomMeal')
  const mealpic = document.createElement('img')
  mealpic.id="randomMealImage"
  mealpic.src=data.meals[randomId].strMealThumb
  randomMeal.append(mealpic)
  const RandomMealName = document.getElementById('randomMealName')
  RandomMealName.textContent =data.meals[randomId].strMeal
  randomMeal.append(RandomMealName)

  document.getElementById('randomMeal').addEventListener('click', () => {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; 

    const modelMealName =document.createElement('h1');
    modelMealName.textContent =data.meals[randomId].strMeal
    modalContent.appendChild(modelMealName);

    const modelMelCategory = document.createElement('p');
    modelMelCategory.className="mealCategoryName"
    modelMelCategory.textContent="Category - "+ data.meals[randomId].strCategory
    modalContent.appendChild(modelMelCategory);

    const modelMealIngredient = document.createElement('h4')
    modelMealIngredient.textContent="Ingredients of "+data.meals[randomId].strMeal
    modalContent.appendChild(modelMealIngredient)

    const modelMealIngredientList = document.createElement('ul');
    modelMealIngredientList.style.listStyleType = 'none';
    modalContent.appendChild(modelMealIngredientList);
    for (let i = 1; i <= 20; i++) {
      const ingredient = data.meals[randomId][`strIngredient${i}`];
      const measure = data.meals[randomId][`strMeasure${i}`];
          const modelMealIngredientTerm = document.createElement('li');
          modelMealIngredientTerm.textContent = ingredient+"    "+measure;
          modelMealIngredientList.appendChild(modelMealIngredientTerm); 
  }

const modelMealins = document.createElement('h4')
    modelMealins.textContent="Instructions of "+data.meals[randomId].strMeal
    modalContent.appendChild(modelMealins)

  const modelMelaInstructions = document.createElement('p')
  modalContent.appendChild(modelMelaInstructions)
  modelMelaInstructions.textContent = data.meals[randomId].strInstructions
  
  const  modelmealVideo= document.createElement('p')
    document.getElementById('model-content').style.display = 'block';
  });
  
  document.getElementById('close').addEventListener('click', () => {
    document.getElementById('model-content').style.display = 'none';
  });
  
})
.catch(error =>{
  console.error(error)
});
  

function dropFunction(){
  document.getElementById('dropDown-Content').classList.toggle("show")
}

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const divele = document.getElementById('dropDown-Content');
  const element = divele.getElementsByTagName("a");

  input.addEventListener('input', function() {
      const filter = input.value.toUpperCase();

      for (let i = 0; i < element.length; i++) {
          const text = element[i].textContent || element[i].innerText;
          if (text.toUpperCase().indexOf(filter) > -1) {
              element[i].style.display = "";
          } else {
              element[i].style.display = "none";
          }
      }
  });

  divele.addEventListener('click', function(event) {
      const category = event.target;
      if (category.classList.contains('category')) {
          input.value = category.textContent;
          divele.classList.remove("show");
          fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input.value}`).then(response=>response.json())
          .then(data=>{
            const searchMealWrapper = document.getElementById('search-meal-wraper')
            data.meals.forEach((meal, index) => {
              const mealDiv = document.createElement('div');
              mealDiv.className = 'search-meal';
              mealDiv.id = `search-meal-${index + 1}`;

              const mealNameDiv = document.createElement('div');
              mealNameDiv.className = 'search-meal-name';
              mealNameDiv.textContent = meal.strMeal;

              const mealImage = document.createElement('img');
              mealImage.src = meal.strMealThumb;

              mealDiv.appendChild(mealImage);
              mealDiv.appendChild(mealNameDiv);

              searchMealWrapper.appendChild(mealDiv);
          });
    
          })
          .catch(error=>{
            console.log(error)
          })
      }
  });
});

