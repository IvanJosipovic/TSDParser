using TSDParser.Enums;

namespace TSDParser.Class
{
    public class StringLiteral : Node
    {
        public SyntaxKind Kind => throw new NotImplementedException();

        public string Text { get; set; }
    }
}
