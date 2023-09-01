namespace TSDParser.Class;

public class Identifier : Node
{
    public SyntaxKind Kind => SyntaxKind.Identifier;
    public string Text { get; set; }
}
