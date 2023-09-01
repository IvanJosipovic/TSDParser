namespace TSDParser.Class
{
    public class ImportSpecifier : Node
    {
        public SyntaxKind Kind => SyntaxKind.ImportSpecifier;

        public Identifier Name { get; set; }

        public Identifier? PropertyName { get; set; }
    }
}
