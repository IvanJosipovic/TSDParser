namespace TSDParser.Class;

internal class NamespaceExportDeclaration : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public JSDoc[]? JSDoc { get; set; }
}
