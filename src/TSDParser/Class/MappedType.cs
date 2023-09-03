namespace TSDParser.Class;

public class MappedType : Node
{
    public SyntaxKind Kind => SyntaxKind.MappedType;

    public TypeParameter TypeParameter { get; set; }

    public Node Type { get; set; }
}
