using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category>()
        {
            new Category() { code = "1",name="cakes", iconRoute="https://www.10dakot.co.il/wp-content/uploads/2013/06/DSC_0237.jpg" },
            new Category() { code = "2",name="diet", iconRoute="https://www.10dakot.co.il/wp-content/uploads/2023/04/%E2%80%8F%E2%80%8F%D7%A9%D7%99%D7%99%D7%A7-%D7%AA%D7%95%D7%AA-%D7%91%D7%A0%D7%A0%D7%94-%D7%A2%D7%95%D7%AA%D7%A7-420x280.jpg" },
            new Category() { code = "3",name="forChildren", iconRoute="https://www.10dakot.co.il/wp-content/uploads/2019/03/%E2%80%8F%E2%80%8FDSC_0199-%D7%A2%D7%95%D7%AA%D7%A7-800x532.jpg" }
        };

        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ILogger<CategoryController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Category> Get()
        {
            return categories;
        }

        [HttpGet("{id}")]
        public Category Get(string id)
        {
            var category = categories.Find(x => x.code == id);
            if (category != null)
                return category;
            return null;
        }

        [HttpPost]
        public void Post([FromBody] Category value)
        {
            categories.Add(value);
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Category value)
        {
            var category = categories.Find(x => x.code == id);
            if (category != null)
            {
                category.code = value.code;
                category.name = value.name;
                category.iconRoute = value.iconRoute;
            }
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            var category = categories.Find(x => x.code == id);
            if (category != null)
                categories.Remove(category);
        }

    }
}