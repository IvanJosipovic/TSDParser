using TSDParser.Enums;

namespace TSDParser.Class.Keywords
{
    public class NullKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.NullKeyword;
    }
}
