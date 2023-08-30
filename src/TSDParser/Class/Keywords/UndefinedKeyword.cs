using TSDParser.Enums;

namespace TSDParser.Class.Keywords
{
    public class UndefinedKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.UndefinedKeyword;
    }
}
