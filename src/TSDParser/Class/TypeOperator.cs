namespace TSDParser.Class;

public class TypeOperator : Node
{
    public SyntaxKind Kind { get; set; }

    public Node Type { get; set; }
}
