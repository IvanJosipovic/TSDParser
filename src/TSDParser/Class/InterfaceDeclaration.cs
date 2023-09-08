namespace TSDParser.Class;

public class InterfaceDeclaration : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public List<Node> Members { get; set; }

    public List<HeritageClause> HeritageClauses { get; set; }

    public List<Node> Modifiers { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public JSDoc[]? JSDoc { get; set; }
}
