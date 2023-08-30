using TSDParser.Enums;

namespace TSDParser.Class
{
    public class ImportClause : Node
    {
        public SyntaxKind Kind => SyntaxKind.ImportClause;

        public List<Node> NamedBindings { get; set; }
    }
}
