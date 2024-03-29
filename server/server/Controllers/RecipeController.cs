﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        public static List<Recipe> recipes = new List<Recipe>()
        {
            new Recipe() {Id ="1", Name = "candel Cake", CategoryCode = "1", PreparationTime = 9, Difficulty = 1, Ingredients= new List<string>(){ "קמח", "חמאה","סוכר"}, PreparationMethod=new List<string>(){ "put flour", "put sugar","put oil", "mix" }, DateAdded = DateTime.Now, UserCode = "1", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2021/04/%E2%80%8F%E2%80%8F20210404_165048-%D7%A2%D7%95%D7%AA%D7%A7.jpg" },
            new Recipe() {Id ="2", Name = "heart Cake", CategoryCode = "1", PreparationTime = 19, Difficulty =2, Ingredients= new List<string>(){"floor","sugar","oil"}, PreparationMethod=new List<string>(){ "put flour", "put sugar","put oil", "mix" }, DateAdded = DateTime.Now, UserCode = "4", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2019/01/%E2%80%8F%E2%80%8FDSC_0132-%D7%A2%D7%95%D7%AA%D7%A7.jpg" },
            new Recipe() {Id ="3", Name = "square Cake", CategoryCode = "1", PreparationTime = 29, Difficulty = 3, Ingredients= new List<string>(){ "flour", "sugar","oil"}, PreparationMethod=new List<string>(){ "put flour", "put sugar","put oil", "mix" }, DateAdded = DateTime.Now, UserCode = "1", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2018/10/DSC_0006.jpg" },
            new Recipe() {Id ="4", Name = "Salad", CategoryCode = "2", PreparationTime = 2, Difficulty = 1, Ingredients= new List<string>(){"tomato","cucamber", "pepper", "oil", "salt"}, PreparationMethod=new List<string>(){"cut all vegtables","put salt","put oil", "mix" }, DateAdded = DateTime.Now, UserCode = "1", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2019/10/%E2%80%8F%E2%80%8FDSC_0075-%D7%A2%D7%95%D7%AA%D7%A7-800x527.jpg" },
            new Recipe() {Id ="5", Name = "healthy", CategoryCode = "2", PreparationTime = 2, Difficulty = 1, Ingredients= new List<string>(){ "leaves", "shampinion","oil", "salt"}, PreparationMethod=new List<string>(){"cut the leaves","put salt and oil", "bake" }, DateAdded = DateTime.Now, UserCode = "4", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2021/10/%E2%80%8F%E2%80%8FDSC_0057-%D7%A2%D7%95%D7%AA%D7%A7-420x279.jpg" },
            new Recipe() {Id ="6", Name = "coockies", CategoryCode = "3", PreparationTime = 2, Difficulty = 1, Ingredients= new List<string>(){"floor","sugar","agg","oil"}, PreparationMethod=new List<string>(){ "put all ingredients", "mix", "bake" }, DateAdded = DateTime.Now, UserCode = "1", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2019/03/%E2%80%8F%E2%80%8FDSC_0199-%D7%A2%D7%95%D7%AA%D7%A7-800x532.jpg" },
            new Recipe() {Id ="7", Name = "Chocolate chips", CategoryCode = "3", PreparationTime = 2, Difficulty = 1, Ingredients= new List<string>(){"floor", "sugar", "egg", "oil", "choklateChips"}, PreparationMethod=new List<string>(){ "put all ingredients", "mix","bake" }, DateAdded = DateTime.Now, UserCode = "4", ImageRoute = "https://www.10dakot.co.il/wp-content/uploads/2018/05/%E2%80%8F%E2%80%8FDSC_0089-%D7%A2%D7%95%D7%AA%D7%A7-800x532.jpg" }

        };
        
        private readonly ILogger<RecipeController> _logger;

        public RecipeController(ILogger<RecipeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Recipe> Get()
        {
            return recipes;
        }

        [HttpGet("{name}")]
        public Recipe Get(string name)
        {
            var recipe = recipes.Find(x => x.Name == name);
            if (recipe != null)
                return recipe;
            return null;
        }

        [HttpPost]
        public void Post([FromBody] Recipe value)
        {
            recipes.Add(value);
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Recipe value)
        {
            var recipe = recipes.Find(x => x.Id == id);
            if (recipe != null)
            {
                recipe.Difficulty = value.Difficulty;
                recipe.PreparationMethod = value.PreparationMethod;
                recipe.UserCode = value.UserCode;
                recipe.ImageRoute = value.ImageRoute;
                recipe.CategoryCode = value.CategoryCode;
                recipe.DateAdded = value.DateAdded;
                recipe.Ingredients = value.Ingredients;
                recipe.Name = value.Name;
                recipe.PreparationTime = value.PreparationTime;
            }
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            var recipe = recipes.Find(x => x.Id == id);
            if (recipe != null)
                recipes.Remove(recipe);
        }

    }
}