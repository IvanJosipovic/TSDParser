namespace TSDParser.Class;

public class ExpressionWithTypeArguments : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Expression { get; set; }

    public List<Node> TypeArguments { get; set; }
}
