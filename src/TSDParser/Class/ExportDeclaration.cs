namespace TSDParser.Class;

public class ExportDeclaration : Node
{
    public SyntaxKind Kind { get; set; }

    public NamedExports ExportClause { get; set; }
}
