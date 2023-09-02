namespace TSDParser.Class;

public class EnumDeclaration : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.EnumDeclaration;

    public Identifier Name { get; set; }

    public List<EnumMember> Members { get; set; }

    public List<Node>? Modifiers { get; set; }

    public JSDocComment JSDoc { get; set; }
}
