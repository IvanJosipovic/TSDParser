namespace TSDParser.Class;

public class HeritageClause : Node
{
    public SyntaxKind Kind => SyntaxKind.HeritageClause;

    public List<ExpressionWithTypeArguments> Types { get; set; }
}
