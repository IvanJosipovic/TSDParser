namespace TSDParser.Class;

public class ImportClause : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Node> NamedBindings { get; set; }
}
