namespace TSDParser.Class
{
    public class Constructor : Node
    {
        public SyntaxKind Kind => SyntaxKind.Constructor;

        public List<Parameter>? Parameters { get; set; }
    }
}
