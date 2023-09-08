namespace TSDParser.Class;

public class TypeLiteral : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Node> Members { get; set; }
}
