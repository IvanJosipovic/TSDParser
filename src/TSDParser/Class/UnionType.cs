namespace TSDParser.Class;

public class UnionType : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Node> Types { get; set; }
}
