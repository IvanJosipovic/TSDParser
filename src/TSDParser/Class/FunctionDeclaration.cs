namespace TSDParser.Class;

public class FunctionDeclaration : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public List<Node> Modifiers { get; set; }

    public JSDoc[]? JSDoc { get; set; }
}
