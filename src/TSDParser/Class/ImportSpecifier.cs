namespace TSDParser.Class;

public class ImportSpecifier : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public Identifier? PropertyName { get; set; }
}
