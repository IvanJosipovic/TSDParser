namespace TSDParser.Class;

public class FirstLiteralToken : Node
{
    public SyntaxKind Kind => SyntaxKind.FirstLiteralToken;

    public string Text { get; set; }
}
