namespace TSDParser.Class;

public class JSDocComment : Node
{
    public SyntaxKind Kind => throw new NotImplementedException();

    public string Comment { get; set; }
}
