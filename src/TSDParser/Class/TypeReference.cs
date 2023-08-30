using TSDParser.Enums;

namespace TSDParser.Class
{
    public class TypeReference : Node
    {
        public SyntaxKind Kind => SyntaxKind.TypeReference;

        public Identifier TypeName { get; set; }
    }
}
