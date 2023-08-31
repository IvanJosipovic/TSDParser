using TSDParser.Enums;

namespace TSDParser.Class
{
    public class MethodSignature : Node
    {
        public SyntaxKind Kind => SyntaxKind.MethodSignature;

        public Identifier Name { get; set; }

        public Node Type { get; set; }

        public List<Parameter>? Parameters { get; set; }

        public List<TypeParameter>? TypeParameters { get; set; }
    }
}
