namespace TSDParser.Class;

public class EnumDeclaration : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public List<EnumMember> Members { get; set; }

    public List<Node>? Modifiers { get; set; }

    public JSDoc? JSDoc { get; set; }
}
