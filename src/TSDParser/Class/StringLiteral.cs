namespace TSDParser.Class;

public class StringLiteral : Node
{
    public SyntaxKind Kind => SyntaxKind.StringLiteral;

    public string Text { get; set; }
}
