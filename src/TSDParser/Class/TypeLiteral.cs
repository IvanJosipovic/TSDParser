namespace TSDParser.Class
{
    public class TypeLiteral : Node
    {
        public SyntaxKind Kind => SyntaxKind.TypeLiteral;

        public List<Node> Members { get; set; }
    }
}
