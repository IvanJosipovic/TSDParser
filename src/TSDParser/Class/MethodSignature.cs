using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class MethodSignature : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public QuestionToken? QuestionToken { get; set; }

    public JSDoc[]? JSDoc { get; set; }
}
