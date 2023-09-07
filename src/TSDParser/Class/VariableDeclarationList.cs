namespace TSDParser.Class;

internal class VariableDeclarationList : Node
{
    public SyntaxKind Kind => SyntaxKind.VariableDeclarationList;

    public List<VariableDeclaration> Declarations { get; set; }
}
