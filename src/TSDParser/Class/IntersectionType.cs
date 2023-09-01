namespace TSDParser.Class
{
    public class IntersectionType : Node
    {
        public SyntaxKind Kind => SyntaxKind.IntersectionType;

        public List<Node> Types { get; set; }
    }
}
