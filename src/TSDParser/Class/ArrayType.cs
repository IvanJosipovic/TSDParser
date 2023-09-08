namespace TSDParser.Class;

public class ArrayType : Node
{
    public SyntaxKind Kind { get; set; }

    public Node ElementType { get; set; }
}
