let btn=document.querySelector("#s-btn");
let input=document.querySelector("#search-bar");
let container=document.querySelector(".recipe-container");
let closeBtn=document.querySelector("#close-icon");
let recipeContent=document.querySelector(".recipe-details-content");
let recipeDetails=document.querySelector(".recipe-details");

let def=(async()=>{
let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=a`;
    let response = await fetch(URL);
    let data = await response.json();
    data.meals.forEach((meal) => {
        let recipes = document.createElement("div");
        recipes.classList.add("styling");
        recipes.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} ${meal.strCategory}</P>
        `
        container.appendChild(recipes);
        recipes.addEventListener("click",()=>{
            showingRecipe(meal);
        });
    });
})();

btn.addEventListener("click",()=>{
    let ent = input.value.trim();//trimming removes all leading and ending spaces
    if(ent){
    searchRecip(ent);
    }
    else{
            container.innerHTML="<h2>Please Type the meal name is search Box.</h2>";
    }
});

let searchRecip= async (ent)=>{
    container.innerHTML="<h2>Fetching recipes...</h2>";
    try{
    let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${ent}`;
    let response = await fetch(URL);
    let data = await response.json();
    container.innerHTML="";
    data.meals.forEach((meal) => {
        let recipes = document.createElement("div");
        recipes.classList.add("styling");
        recipes.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} ${meal.strCategory}</P>
        `;
        container.appendChild(recipes);
        recipes.addEventListener("click",()=>{
            showingRecipe(meal);
        });
    });
}
catch(error){
    container.innerHTML="<h2>No such meals are present.</h2>";
}
};

let showingRecipe=(meal)=>{
    recipeDetails.classList.remove("hide");
    recipeContent.innerHTML=`
        <h1>${meal.strMeal}<h1>
        <h3>Ingredients:</h3>
        <ul>${fetchingmeal(meal)}</ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}
    `
};

let fetchingmeal = (meal)=>{
    let ingredientList="";//string
    for(let i=0;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            let ingredient=meal[`strIngredient${i}`];
            let measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure} - ${ingredient}</li>`;
        }
    }
    return ingredientList;
};

closeBtn.addEventListener("click",()=>{
    recipeDetails.classList.add("hide");
});

