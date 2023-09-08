namespace TSDParser.Class;

internal class NamespaceExportDeclaration : Node
{
    public Identifier Name { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
