namespace TSDParser.Class;

public class ImportClause : Node
{
    public SyntaxKind Kind { get; set; }

    public Node NamedBindings { get; set; }
}
