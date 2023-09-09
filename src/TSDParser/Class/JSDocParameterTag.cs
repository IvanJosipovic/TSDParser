namespace TSDParser.Class
{
    public class JSDocParameterTag : Node
    {
        public Identifier TagName { get; set; }

        public string? Comment { get; set; }

        public Identifier Name { get; set; }

        public bool IsNameFirst { get; set; }

        public bool IsBracketed { get; set; }
    }
}
