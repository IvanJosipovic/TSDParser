using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class.Keywords
{
    public class UndefinedKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.UndefinedKeyword;
    }
}
