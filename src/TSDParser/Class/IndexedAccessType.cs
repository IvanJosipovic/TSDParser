namespace TSDParser.Class;

public class IndexedAccessType : Node
{
    public SyntaxKind Kind { get; set; }

    public Node IndexType { get; set; }

    public Node ObjectType { get; set; }
}
