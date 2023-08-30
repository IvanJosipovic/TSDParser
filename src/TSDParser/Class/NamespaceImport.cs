using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class NamespaceImport : Node
    {
        public SyntaxKind Kind => SyntaxKind.NamespaceImport;

        public Identifier Name { get; set; }
    }
}
