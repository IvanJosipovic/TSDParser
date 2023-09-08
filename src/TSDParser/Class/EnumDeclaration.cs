namespace TSDParser.Class;

public class EnumDeclaration : Node
{
    public Identifier Name { get; set; }

    public List<EnumMember> Members { get; set; }

    public List<Node>? Modifiers { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
