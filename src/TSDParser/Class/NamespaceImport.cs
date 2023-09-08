namespace TSDParser.Class;

public class NamespaceImport : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }
}
