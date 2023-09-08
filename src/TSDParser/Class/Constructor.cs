namespace TSDParser.Class;

public class Constructor : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Parameter>? Parameters { get; set; }
}
