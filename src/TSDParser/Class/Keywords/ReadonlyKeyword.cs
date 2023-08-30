using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class ReadonlyKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.ReadonlyKeyword;
    }
}
