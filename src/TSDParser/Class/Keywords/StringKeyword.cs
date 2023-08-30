using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class StringKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.StringKeyword;
    }
}
