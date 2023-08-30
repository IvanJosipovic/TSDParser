using TSDParser.Enums;

namespace TSDParser.Class
{
    public class ExportSpecifier : Node
    {
        public SyntaxKind Kind => SyntaxKind.ExportSpecifier;

        public Identifier Name { get; set; }

        public Identifier PropertyName { get; set; }
    }
}
