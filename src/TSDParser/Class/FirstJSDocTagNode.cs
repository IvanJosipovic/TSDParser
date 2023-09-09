namespace TSDParser.Class
{
    public class FirstJSDocTagNode : Node
    {
        public Identifier TagName { get; set; }

        public string? Comment { get; set; }
    }
}
