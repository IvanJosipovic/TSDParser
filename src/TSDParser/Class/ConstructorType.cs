namespace TSDParser.Class;

public class ConstructorType : Node
{
    public SyntaxKind Kind { get; set; }

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }
}
