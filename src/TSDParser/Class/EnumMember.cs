namespace TSDParser.Class;

public class EnumMember : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public Node Initializer { get; set; }

    public JSDocComment[]? JSDoc { get; set; }
}
