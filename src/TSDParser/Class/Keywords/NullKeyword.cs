using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class.Keywords
{
    public class NullKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.NullKeyword;
    }
}
