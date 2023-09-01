namespace TSDParser.Class;

public class ArrayType : Node
{
    public SyntaxKind Kind => SyntaxKind.ArrayType;

    public Node ElementType { get; set; }
}
