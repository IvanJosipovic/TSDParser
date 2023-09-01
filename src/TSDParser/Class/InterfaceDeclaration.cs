namespace TSDParser.Class;

public class InterfaceDeclaration : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.InterfaceDeclaration;

    public Identifier Name { get; set; }

    public List<Node> Statements { get; set; }

    public List<HeritageClause> HeritageClauses { get; set; }

    public List<Node> Modifiers { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public JSDocComment JSDoc { get; set; }
}
