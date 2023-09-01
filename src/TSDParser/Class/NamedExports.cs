namespace TSDParser.Class;

public class NamedExports : Node
{
    public SyntaxKind Kind => SyntaxKind.NamedExports;

    public List<ExportSpecifier>? Elements { get; set; }
}
