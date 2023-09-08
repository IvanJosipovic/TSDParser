namespace TSDParser.Class;

public class ImportDeclaration : Node
{
    public SyntaxKind Kind { get; set; }

    public ImportClause ImportClause { get; set; }

    public StringLiteral ModuleSpecifier { get; set; }
}
