namespace TSDParser.Class;

public class ConstructorType : Node
{
    public SyntaxKind Kind => SyntaxKind.ConstructorType;

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }
}
