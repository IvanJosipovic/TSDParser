namespace TSDParser.Class;

public class ClassDeclaration : Node
{
    public Identifier Name { get; set; }

    public List<Node> Members { get; set; }

    public List<HeritageClause> HeritageClauses { get; set; }

    public List<Node> Modifiers { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
