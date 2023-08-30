using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class VoidKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.VoidKeyword;
    }
}
