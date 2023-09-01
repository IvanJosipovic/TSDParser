namespace TSDParser.Class
{
    public class UnionType : Node
    {
        public SyntaxKind Kind => SyntaxKind.UnionType;

        public List<Node> Types { get; set; }
    }
}
