namespace TSDParser.Class;

internal class NamespaceExportDeclaration : Node, jsDoc
{
    public SyntaxKind Kind => SyntaxKind.NamespaceExportDeclaration;

    public Identifier Name { get; set; }
    public JSDocComment? JSDoc { get; set; }
}
