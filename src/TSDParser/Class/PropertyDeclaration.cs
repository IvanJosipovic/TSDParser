namespace TSDParser.Class;

public class PropertyDeclaration : Node
{
    public Identifier Name { get; set; }

    public Node Type { get; set; }

    public QuestionToken? QuestionToken { get; set; }

    public List<Node> Modifiers { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
