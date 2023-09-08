namespace TSDParser.Class;

public class ExportSpecifier : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public Identifier PropertyName { get; set; }
}
