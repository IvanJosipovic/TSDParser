namespace TSDParser.Class;

public class NamedImports : Node
{
    public SyntaxKind Kind { get; set; }

    public List<ImportSpecifier> Elements { get; set; }
}
