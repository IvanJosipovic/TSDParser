namespace TSDParser.Class;

public class EnumMember : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.EnumMember;

    public Identifier Name { get; set; }

    public Node Initializer { get; set; }

    public JSDocComment? JSDoc { get; set; }
}
