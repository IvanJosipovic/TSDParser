namespace TSDParser.Class;

internal class FirstStatement : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.FirstStatement;

    public List<Node> Modifiers { get; set; }

    public VariableDeclarationList DeclarationList { get; set; }
    public JSDocComment JSDoc { get; set; }
}
