namespace TSDParser.Class;

public class IndexSignature : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Parameter> Parameters { get; set; }

    public Node Type { get; set; }
}
