namespace TSDParser.Class;

public class IntersectionType : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Node> Types { get; set; }
}
