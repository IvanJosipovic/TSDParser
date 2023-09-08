namespace TSDParser.Class;

public class HeritageClause : Node
{
    public SyntaxKind Kind { get; set; }

    public List<ExpressionWithTypeArguments> Types { get; set; }
}
