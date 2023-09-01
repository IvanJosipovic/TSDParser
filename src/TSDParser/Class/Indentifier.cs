namespace TSDParser.Class;

public class Identifier : Node
{
    public SyntaxKind Kind => SyntaxKind.Identifier;
    public string Text { get; set; }
    public string Comment { get; set; }
}
