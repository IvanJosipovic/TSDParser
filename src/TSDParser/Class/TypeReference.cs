using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class TypeReference : Node
    {
        public SyntaxKind Kind => SyntaxKind.TypeReference;

        public Identifier TypeName { get; set; }
    }
}
