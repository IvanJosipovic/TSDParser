using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class NamedImports : Node
    {
        public SyntaxKind Kind => SyntaxKind.NamedImports;

        public List<ImportSpecifier> Elements { get; set; }
    }
}
