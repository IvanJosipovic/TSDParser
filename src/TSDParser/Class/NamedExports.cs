namespace TSDParser.Class;

public class NamedExports : Node
{
    public SyntaxKind Kind { get; set; }

    public List<ExportSpecifier>? Elements { get; set; }
}
