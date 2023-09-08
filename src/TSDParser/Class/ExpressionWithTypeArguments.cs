namespace TSDParser.Class;

public class ExpressionWithTypeArguments : Node
{
    public Identifier Expression { get; set; }

    public List<Node> TypeArguments { get; set; }
}
