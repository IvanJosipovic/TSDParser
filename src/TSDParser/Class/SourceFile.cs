using TSDParser.Enums;

namespace TSDParser.Class
{
    public class SourceFile : Node
    {
        public SyntaxKind Kind { get; } = SyntaxKind.SourceFile;

        public List<Node> Statements { get; set; }
    }
}
