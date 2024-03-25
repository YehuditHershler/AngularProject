namespace server
{
    public class Recipe
    {
        public string Id { get; set; }
        public string? Name { get; set; }
        public string? CategoryCode { get; set; }
        public int PreparationTime { get; set; }
        public int Difficulty { get; set; }
        public DateTime DateAdded { get; set; }
        public List<string>? Ingredients { get; set; }
        public List<string>? PreparationMethod { get; set; }
        public string? UserCode { get; set; }
        public string? ImageRoute {  get; set; }
    }
}
