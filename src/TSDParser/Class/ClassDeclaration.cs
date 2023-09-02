namespace TSDParser.Class;

public class ClassDeclaration : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.ClassDeclaration;

    public Identifier Name { get; set; }

    public List<Node> Members { get; set; }

    public List<HeritageClause> HeritageClauses { get; set; }

    public List<Node> Modifiers { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public JSDocComment? JSDoc { get; set; }
}
