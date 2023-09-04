namespace TSDParser.Class;

public class TupleType : Node
{
    public SyntaxKind Kind => SyntaxKind.TupleType;

    public List<Node> Elements { get; set; }
}
