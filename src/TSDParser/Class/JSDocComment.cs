namespace TSDParser.Class;

public class JSDocComment : Node
{
    public SyntaxKind Kind => SyntaxKind.JSDocComment;

    public string Comment { get; set; }
}
