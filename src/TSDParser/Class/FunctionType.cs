using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class FunctionType : Node
    {
        public SyntaxKind Kind => SyntaxKind.FunctionType;

        public Node Type { get; set; }

        public List<Parameter>? Parameters { get; set; }
    }
}
