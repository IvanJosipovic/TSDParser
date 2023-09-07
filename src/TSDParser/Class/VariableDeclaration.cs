namespace TSDParser.Class;

internal class VariableDeclaration : Node
{
    public SyntaxKind Kind => SyntaxKind.VariableDeclaration;

    public Identifier Name { get; set; }

    public Node Type { get; set; }
}
