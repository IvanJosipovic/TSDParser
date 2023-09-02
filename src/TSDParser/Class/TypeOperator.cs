namespace TSDParser.Class;

public class TypeOperator : Node
{
    public SyntaxKind Kind => SyntaxKind.TypeOperator;

    public Node Type { get; set; }
}
