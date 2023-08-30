using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class.Keywords
{
    public class BooleanKeyword : Node
    {
        public SyntaxKind Kind => SyntaxKind.BooleanKeyword;
    }
}
