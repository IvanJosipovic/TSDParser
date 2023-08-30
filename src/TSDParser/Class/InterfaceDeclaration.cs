using TSDParser.Enums;

namespace TSDParser.Class
{
    public class InterfaceDeclaration : Node
    {
        public SyntaxKind Kind => SyntaxKind.InterfaceDeclaration;

        public Identifier Name { get; set; }

        public List<Node> Statements { get; set; }
    }
}
