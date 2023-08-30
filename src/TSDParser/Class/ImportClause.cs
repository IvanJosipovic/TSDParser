using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class ImportClause : Node
    {
        public SyntaxKind Kind => SyntaxKind.ImportClause;

        public List<Node> NamedBindings { get; set; }
    }
}
