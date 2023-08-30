using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class StringLiteral : Node
    {
        public SyntaxKind Kind => throw new NotImplementedException();

        public string Text { get; set; }
    }
}
