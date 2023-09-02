namespace TSDParser.Class;

public class MethodSignature : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.MethodSignature;

    public Identifier Name { get; set; }

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public QuestionToken? QuestionToken { get; set; }

    public JSDocComment? JSDoc { get; set; }
}
