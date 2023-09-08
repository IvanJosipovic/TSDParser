namespace TSDParser.Class;

public class TypeReference : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier TypeName { get; set; }

    public List<Node> TypeArguments { get; set; }
}
