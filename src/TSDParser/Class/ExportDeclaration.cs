using TSDParser.Enums;

namespace TSDParser.Class
{
    public class ExportDeclaration : Node
    {
        public SyntaxKind Kind => SyntaxKind.ExportDeclaration;

        public NamedExports ExportClause { get; set; }
    }
}
