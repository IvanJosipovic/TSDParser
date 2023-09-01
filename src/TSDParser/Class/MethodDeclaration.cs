namespace TSDParser.Class;

public class MethodDeclaration : Node
{
    public SyntaxKind Kind => SyntaxKind.MethodDeclaration;

    public Identifier Name { get; set; }

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public List<Node> Modifiers { get; set; }

    public QuestionToken? QuestionToken { get; set; }
}
