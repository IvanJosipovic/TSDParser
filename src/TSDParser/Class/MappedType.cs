namespace TSDParser.Class;

public class MappedType : Node
{
    public SyntaxKind Kind { get; set; }

    public TypeParameter TypeParameter { get; set; }

    public Node Type { get; set; }
}
