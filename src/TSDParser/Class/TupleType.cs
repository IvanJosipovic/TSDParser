namespace TSDParser.Class;

public class TupleType : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Node> Elements { get; set; }
}
