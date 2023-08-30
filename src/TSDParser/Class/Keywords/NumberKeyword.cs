using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class NumberKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.NumberKeyword;
    }
}
