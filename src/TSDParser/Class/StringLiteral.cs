namespace TSDParser.Class;

public class StringLiteral : Node
{
    public SyntaxKind Kind { get; set; }

    public string Text { get; set; }
}
