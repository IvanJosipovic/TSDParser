namespace TSDParser.Class;

public class MethodSignature : Node
{
    public Identifier Name { get; set; }

    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public QuestionToken? QuestionToken { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
